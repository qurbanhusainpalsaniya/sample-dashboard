import { Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { alpha, lighten } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "auth/hooks";
import { varHover } from "components/animate";
import CustomPopover, { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import { useSnackbar } from "components/snackbar";
import { m } from "framer-motion";
import { useTranslate } from "locales";
// import AccessTokenModal from "master/AccessTokenModal";
import { useState } from "react";
import { useRouter } from "routes/hooks";
import { employeeFullName } from "utils/format-string";

export default function AccountPopover() {
    const { t } = useTranslate();

    const router = useRouter();
    const { logout, user } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();

    const popover = usePopover();
    const [openModal, setOpenModal] = useState({ status: false, data: "" });
    async function openModalClose(value) {
        setOpenModal({ status: value.status, data: "" });
    }
    const handleLogout = async () => {
        try {
            await logout();
            popover.onClose();
            router.replace("/");
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Unable to logout!", { variant: "error" });
        }
    };

    return (
        <>
            <IconButton
                component={m.button}
                whileTap="tap"
                whileHover="hover"
                variants={varHover(1.05)}
                onClick={popover.onOpen}
                sx={{
                    width: 36,
                    height: 36,
                }}
            >
                <Avatar
                    src={user?.media_url}
                    alt={user?.first_name}
                    sx={{
                        width: 32,
                        height: 32,
                    }}
                >
                    {user?.first_name?.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>


            <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 320, p: 0, }} hiddenArrow>
                <Box sx={{ position: 'relative', height: 60, bgcolor: (theme) => lighten(theme.palette.primary.main, 0.8), borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                    <Box
                        sx={{
                            right: 0, left: 0,
                            position: "absolute",
                            display: "flex",
                            justifyContent: 'center',
                            bottom: '-28px',
                        }}
                    >
                        <Avatar
                            src={user?.media_url}
                            alt={user?.first_name}
                            sx={{ width: 56, height: 56, border: (theme) => `solid 2px ${theme.palette.background.default}`, }}
                        >
                            {user?.first_name?.charAt(0).toUpperCase()}
                        </Avatar>
                    </Box>

                </Box>
                <Box sx={{ my: 2, mt: 5, mx: 2, display: "flex", justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="subtitle1" noWrap width={1} textAlign='center' >{employeeFullName(user)}</Typography>
                    <Typography variant="body2" width={1} sx={{ color: "text.secondary", textAlign: 'center' }} noWrap>{user?.email}</Typography>
                </Box>

                <Divider />



                <Stack sx={{ p: 1, py: 2 }} direction='row' gap={1}>
                    <Button
                        startIcon={<GoogleMaterialIcon icon={'token'} />}
                        fullWidth
                        variant="soft"
                        color="success"
                        onClick={() => { popover.onClose(); setOpenModal({ status: true, data: "" }); }}
                    >
                        {t("access_token")}
                    </Button>


                    <Button
                        startIcon={<GoogleMaterialIcon icon={'logout'} />}
                        fullWidth
                        variant="soft"
                        color="error"
                        onClick={handleLogout}
                    >
                        {t("logout")}
                    </Button>
                </Stack>
            </CustomPopover>
            {openModal.status && <AccessTokenModal open={openModal.status} onClose={openModalClose} referenceData={openModal.data} />}
        </>
    );
}
