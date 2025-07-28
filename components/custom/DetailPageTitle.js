import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import { RHFUploadAvatar } from "components/hook-form";
import FormProvider from "components/hook-form/form-provider";
import { TableMoreMenu } from "components/table";
import { useTranslate } from "locales";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { avatarImageCompress, getFirstCharacter } from "utils/avatarUtil";

const ConfirmDialog = dynamic(() => import("master/ConfirmDialog"));


export default function DetailPageTitle({
    media_url = null, title = '', description = '', status = '', currentTab = '', punchInOut = '',
    showOptionMenu = true, handleChangeTab, tabs = [], onUploadImage, onRemovePhoto, onDelete, onUpdateStatus, onEdit, onClose, sx, ...other
}) {

    const { t } = useTranslate();

    const popover = usePopover();

    const [loadingImageUpload, setLoadingImageUpload] = useState(false)

    const defaultValues = {
        photoURL: media_url || null,
    }

    const methods = useForm({
        defaultValues,
    });

    const {
        watch,
        setValue,
    } = methods;

    useEffect(() => {
        setValue('photoURL', media_url);
    }, [media_url,]);

    async function handleDrop(acceptedFiles) {
        var file = acceptedFiles[0];
        const createFile = await avatarImageCompress(file)
        if (createFile) {
            setLoadingImageUpload(true)
            try {
                const response = await onUploadImage(createFile)
                setValue('photoURL', response.data.result);
            } catch (error) {
                console.log(error)
            }
            setLoadingImageUpload(false)
        }
    }

    async function removePhoto() {
        setLoadingImageUpload(true)
        try {
            await onRemovePhoto()
            setValue('photoURL', null);
        } catch (error) {
            console.log(error)
        }
        setLoadingImageUpload(false)
    }

    const [confirmation, setConfirmation] = useState({ status: false, title: '', description: "", icon: "", type: "" });
    async function confirmationClose(value) {
        if (value.confirmation) {
            if (confirmation.type == 'DELETE' && onDelete) {
                try {
                    await onDelete();
                } catch (err) {
                    console.log(err)
                }
            }
            else if (confirmation.type == 'UPDATE_STATUS' && onUpdateStatus) {
                try {
                    await onUpdateStatus();
                } catch (err) {
                    console.log(err)
                }
            }
        }
        setConfirmation({ status: value.status, title: "", description: "", icon: "", type: '' });
    }

    return (
        <>
            <Box sx={{ position: "sticky", top: 0, zIndex: 1, bgcolor: "background.paper", ...sx }} {...other} >
                <Box sx={{ p: 2, pb: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, }}>
                    <Box display={"flex"} alignItems="center" gap={2}>
                        {loadingImageUpload
                            ? <CircularProgress />
                            : status != "active"
                                ? <Avatar color="default" variant="rounded"><GoogleMaterialIcon icon={'block'} /></Avatar>
                                :
                                onUploadImage
                                    ? <FormProvider methods={methods} onSubmit={null}><RHFUploadAvatar name="photoURL" onDrop={handleDrop} sx={{ width: 56, height: 56, p: 0.2 }} /></FormProvider>
                                    : <Avatar alt={title} src={media_url} variant="rounded" >{getFirstCharacter(title)}</Avatar>
                        }

                        <Box display={"flex"} flexDirection="column">
                            <Typography variant="h6" sx={{ typography: { xs: 'subtitle2', lg: "subtitle1" } }}>{title}</Typography>
                            <Typography variant="caption" color={"text.disabled"} >{description}</Typography>
                        </Box>
                    </Box>
                    <Box display={"flex"} alignItems="center" gap={0.5}>
                        {punchInOut}

                        {showOptionMenu &&
                            <TableMoreMenu
                                open={popover.open}
                                onOpen={popover.onOpen}
                                onClose={popover.onClose}
                                actions={
                                    <>
                                        {onEdit &&
                                            <MenuItem onClick={() => { onEdit(); popover.onClose(); }}><GoogleMaterialIcon icon={'edit'} fontSize="small" filled /> {t("edit")}</MenuItem>
                                        }
                                        {onDelete &&
                                            <MenuItem
                                                onClick={() => {
                                                    setConfirmation({
                                                        status: true,
                                                        title: t("delete"),
                                                        description: t("msg_remove", { placeholder: title }),
                                                        icon: <GoogleMaterialIcon icon={'delete'} />,
                                                        type: "DELETE"
                                                    }),
                                                        popover.onClose();
                                                }}
                                                sx={{ color: 'error.main' }}
                                            >
                                                <GoogleMaterialIcon icon={'delete'} fontSize="small" filled />
                                                {t("delete")}
                                            </MenuItem>
                                        }

                                        {onUpdateStatus &&
                                            <MenuItem
                                                onClick={() => {
                                                    setConfirmation({
                                                        status: true,
                                                        title: t(status == "active" ? "inactive" : "active"),
                                                        description: t(status == "active" ? "msg_inactive" : "msg_active", { placeholder: title }),
                                                        icon: status == "active" ? <GoogleMaterialIcon icon={'toggle_off'} /> : <GoogleMaterialIcon icon={'toggle_on'} />,
                                                        type: "UPDATE_STATUS"
                                                    }),
                                                        popover.onClose();
                                                }}
                                            >
                                                {status == "active" ? <GoogleMaterialIcon icon={'toggle_off'} fontSize="small" filled /> : <GoogleMaterialIcon icon={'toggle_on'} fontSize='small' filled />}
                                                {status == "active" ? t("inactive") : t("active")}
                                            </MenuItem>
                                        }


                                        {(watch('photoURL') && onRemovePhoto) &&
                                            < MenuItem onClick={() => { removePhoto(), popover.onClose(); }}>
                                                <GoogleMaterialIcon icon={'do_not_disturb_on'} fontSize="small" filled />
                                                {t("remove_photo")}
                                            </MenuItem>
                                        }
                                    </>
                                }
                            />
                        }
                        {onClose &&
                            <IconButton onClick={onClose} ><GoogleMaterialIcon icon={'close'} /></IconButton>
                        }
                    </Box>
                </Box>

                {tabs.length > 0 &&
                    <Tabs value={currentTab} onChange={handleChangeTab} sx={{ px: 2 }}  >
                        {tabs.map((tab, _i) => (
                            <Tab key={_i} value={tab.value} icon={tab.icon} label={tab.label} disabled={tab?.disable} />
                        ))}
                    </Tabs>
                }
                <Divider />
            </Box>

            {
                confirmation.status &&
                <ConfirmDialog
                    icon={confirmation.icon}
                    title={confirmation.title}
                    description={confirmation.description}
                    open={confirmation.status}
                    onClose={confirmationClose}
                />
            }

        </>
    );
}

DetailPageTitle.propTypes = {
    media_url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    status: PropTypes.string,
    currentTab: PropTypes.string,
    showOptionMenu: PropTypes.bool,
    handleChangeTab: PropTypes.func,
    tabs: PropTypes.array,
    onUploadImage: PropTypes.func,
    onRemovePhoto: PropTypes.func,
    onDelete: PropTypes.func,
    onUpdateStatus: PropTypes.func,
    onEdit: PropTypes.func,
    sx: PropTypes.object,
};