import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import { useBoolean } from "hooks/use-boolean";
import { useResponsive } from "hooks/use-responsive";

import { useSettingsContext } from "components/settings";
import Header from "./header";
import Main from "./main";
import NavVertical from "./nav-vertical";
import NavMini from "./nav-mini";

// ----------------------------------------------------------------------

export default function CustomLayout({ children }) {
    const settings = useSettingsContext();

    const lgUp = useResponsive("up", "lg");

    const nav = useBoolean();

    const renderNavMini = <NavMini />;

    const renderNavVertical = <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />;

    return (
        <>
            {!lgUp && <Header onOpenNav={nav.onTrue} />}
            <Box
                sx={{
                    minHeight: 1,
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    bgcolor: 'lightgrey'
                }}
            >
                {settings.themeLayout === "vertical" && renderNavVertical}
                <Main>{children}</Main>
                {/* {lgUp && renderNavMini} */}
            </Box>
        </>
    );
}

CustomLayout.propTypes = {
    children: PropTypes.node,
};
