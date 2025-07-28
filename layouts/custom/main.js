import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import { useResponsive } from "hooks/use-responsive";

import { useSettingsContext } from "components/settings";

import { NAV, HEADER } from "../config-layout";

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }) {
    const settings = useSettingsContext();

    const lgUp = useResponsive("up", "lg");

    const isNavMini = settings.themeLayout === "mini";

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                minHeight: 1,
                display: "flex",
                flexDirection: "column",
                pt: `${HEADER.H_MOBILE}px`,
                ...(lgUp && {
                    pt: 0,//`${HEADER.H_DESKTOP}px`,
                    width: `calc(100% - ${NAV.W_VERTICAL + NAV.W_MINI + 1}px)`,
                    ...(isNavMini && {
                        width: `calc(100% - ${NAV.W_MINI + 1}px)`,
                    }),
                }),
                ...sx,
            }}
            {...other}
        >
            {children}
        </Box>
    );
}

Main.propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object,
};
