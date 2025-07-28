import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { darken, lighten, useTheme } from "@mui/system";
import Image from "components/image/image";
import { NavSectionVertical } from "components/nav-section";
import Scrollbar from "components/scrollbar";
import { APP_NAME } from "config-global";
import { useResponsive } from "hooks/use-responsive";
import ChangeWorkshop from "layouts/common/change-workshop";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { usePathname } from "routes/hooks";
import { NAV } from "../config-layout";
import { useMainNavData } from "./config-navigation";
import { Typography } from "@mui/material";
import NavUpgrade from "layouts/common/nav-upgrade";

export default function NavVertical({ openNav, onCloseNav }) {
    const pathname = usePathname();
    const lgUp = useResponsive("up", "lg");
    const navData = useMainNavData();
    const theme = useTheme()


    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const imageSrc = theme.palette.mode === 'dark' ? '/assets/images/reownx-dark.svg' : '/assets/images/reownx-light.svg';

    const renderContent = (
        <>
            <Scrollbar
                sx={{
                    height: 1,
                    bgcolor: (theme) => theme.palette?.mode === 'light' ? lighten(theme.palette.primary.main, 0.98) : darken(theme.palette.primary.dark, 0.8),
                    "& .simplebar-content": { height: 1, display: "flex", flexDirection: "column", },
                }}
            >
                <Box px={1} pt={1.5} mx={2}>
                    <Box display={'flex'} justifyContent={'start'}>
                        {/* <Image src={imageSrc} alt={APP_NAME} sx={{ height: 32 }} /> */}
                        <Typography variant="h3">Dashbaord</Typography>
                    </Box>
                </Box>
                {/* Multiple Companies */}
                {/* <Box sx={{ borderBottom: "1px solid", borderTop: "1px solid", borderColor: "divider", }}>
                    <ChangeWorkshop />
                </Box> */}
                <NavSectionVertical data={navData} sx={{ m: 2, }} />
                <Box sx={{ flexGrow: 1 }} />
                <NavUpgrade />
            </Scrollbar>
        </>
    );

    return (
        <Box
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_VERTICAL },
            }}
        >
            {lgUp ? (
                <Stack
                    sx={{
                        height: 1,
                        position: "fixed",
                        width: NAV.W_VERTICAL,
                        borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                >
                    {renderContent}
                </Stack>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    PaperProps={{
                        sx: {
                            width: NAV.W_VERTICAL,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    );
}

NavVertical.propTypes = {
    openNav: PropTypes.bool,
    onCloseNav: PropTypes.func,
};
