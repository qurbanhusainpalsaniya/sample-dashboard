import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { lighten } from "@mui/system";

// ----------------------------------------------------------------------

export default function AuthModernCompactLayout({ children }) {
    return (
        <>
            <Box
                component="main"
                sx={{
                    py: 12,
                    display: "flex",
                    minHeight: "100vh",
                    textAlign: "center",
                    px: { xs: 2, md: 0 },
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:before": {
                        bgcolor: 'background.dialog',
                        width: 1,
                        height: 1,
                        zIndex: -1,
                        content: "''",
                        opacity: 1,
                        position: "absolute",
                        backgroundSize: "auto",
                        backgroundRepeat: "repeat",
                        backgroundPosition: "center center",
                        // backgroundImage: "url(/assets/floating-cogs.svg)",
                    },
                }}
            >
                <Box
                    sx={{
                        maxWidth: { xs: '100%', md: 936 },
                    }}
                >
                    {children}
                </Box>
            </Box>
        </>
    );
}

AuthModernCompactLayout.propTypes = {
    children: PropTypes.node,
};
