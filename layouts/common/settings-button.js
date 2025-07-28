import Badge, { badgeClasses } from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { varHover } from "components/animate";
import GoogleMaterialIcon from "components/google-icon";
import { useSettingsContext } from "components/settings";
import { m } from "framer-motion";
import PropTypes from "prop-types";

export default function SettingsButton({ sx }) {
    const settings = useSettingsContext();

    return (
        <Badge
            color="error"
            variant="dot"
            invisible={!settings.canReset}
            sx={{
                [`& .${badgeClasses.badge}`]: {
                    top: 8,
                    right: 8,
                },
                ...sx,
            }}
        >
            <Box
                component={m.div}
                animate={{
                    rotate: [0, settings.open ? 0 : 360],
                }}
                transition={{
                    duration: 12,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                <IconButton
                    component={m.button}
                    whileTap="tap"
                    whileHover="hover"
                    variants={varHover(1.05)}
                    aria-label="settings"
                    onClick={settings.onToggle}
                    sx={{
                        width: 40,
                        height: 40,
                    }}
                >
                    <GoogleMaterialIcon icon={'settings'} filled/>
                </IconButton>
            </Box>
        </Badge>
    );
}

SettingsButton.propTypes = {
    sx: PropTypes.object,
};
