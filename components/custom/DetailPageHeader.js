import LoadingButton from "@mui/lab/LoadingButton";
import { Button, IconButton, MenuItem, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Box from "@mui/material/Box";
import { usePopover } from "components/custom-popover";
import CustomPopover from "components/custom-popover/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import { useTranslate } from "locales";
import PropTypes from "prop-types";
import { useState } from "react";

export default function DetailPageHeader({ filterList = [], title = '', filter = {}, setFilter, onClose, onExport, onDelete, onDefaultSet, defaultSet = false, sx, ...other }) {
    const { t } = useTranslate();

    const [loadingBtn, setLoadingBtn] = useState(false);
    async function onDefaultChange() {
        setLoadingBtn(true);
        await onDefaultSet();
        setLoadingBtn(false);
    }
    const popover = usePopover();

    return (
        <>
            <Box p={1} px={2} sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "background.paper", ...sx }} {...other}>
                <Box display="flex" alignItems={"center"} justifyContent="space-between" >

                    {filterList.length > 0 ?
                        <Button endIcon={<GoogleMaterialIcon icon={'keyboard_arrow_down'} fontSize='medium' />} onClick={(e) => popover.onOpen(e)}>
                            <Typography variant="subtitle1">{filterList.find((item) => item.value == filter?.status)?.label || `${t('all')} ${title}`}</Typography>
                        </Button>
                        :
                        <Typography variant="h6">{title}</Typography>
                    }

                    <Box display="flex" gap={1} alignItems="center">

                        {onExport && <Button variant="contained" color="primary">{t("export")}</Button>}

                        {onDefaultSet &&
                            <LoadingButton loading={loadingBtn} onClick={() => onDefaultChange()} variant="outlined" color={defaultSet ? "error" : "primary"} startIcon={defaultSet ? <GoogleMaterialIcon icon={'star'} filled /> : <GoogleMaterialIcon icon={'star'} />}>
                                {defaultSet ? t("remove_as_default") : t("set_as_default")}
                            </LoadingButton>
                        }
                        {onDelete && <IconButton variant="soft" color="error" onClick={onDelete}><GoogleMaterialIcon icon={'delete'} fontSize="small" /></IconButton>}


                        <IconButton onClick={onClose} variant='soft' color="inherit"><GoogleMaterialIcon icon={'close'} fontSize='small' /></IconButton>

                    </Box>
                </Box>
            </Box>
            <CustomPopover open={popover.open} onClose={popover.onClose} hiddenArrow sx={{ minWidth: 200 }}>
                {filterList.map((item, _i) => (
                    <MenuItem selected={item.value == filter?.status} key={_i} onClick={() => { popover.onClose(); setFilter('status', item.value); }}>
                        {item.label}
                    </MenuItem>
                ))}
            </CustomPopover>
        </>
    );
}

DetailPageHeader.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    sx: PropTypes.object,
    defaultSet: PropTypes.bool,
};
