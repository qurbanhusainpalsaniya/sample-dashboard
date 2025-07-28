import { alpha } from "@mui/material/styles";
// ----------------------------------------------------------------------
const COLORS = ["primary", "secondary", "info", "success", "warning", "error"];
export function IconButton(theme) {
    const isLight = theme.palette.mode === "light";
    const rootStyle = (ownerState) => {
        const inheritColor = ownerState.color === "inherit";
        const containedVariant = ownerState.variant === "contained";
        const outlinedVariant = ownerState.variant === "outlined";
        const textVariant = ownerState.variant === "text";
        const softVariant = ownerState.variant === "soft";
        const smallSize = ownerState.size === "small";
        const largeSize = ownerState.size === "large";
        const defaultStyle = {
            borderRadius: theme.shape.borderRadius * 3,
            ...(inheritColor && {
                // CONTAINED
                ...(containedVariant && {
                    color: theme.palette.grey[800],
                    "&:hover": {
                        backgroundColor: theme.palette.grey[400],
                    },
                }),
                // OUTLINED
                ...(outlinedVariant && {
                    border: "1px solid",
                    borderColor: alpha(theme.palette.grey[500], 0.32),
                    "&:hover": {
                        borderColor: alpha(theme.palette.grey[700], 0.32),
                        backgroundColor: theme.palette.action.hover,
                    },
                }),
                // TEXT
                ...(textVariant && {
                    "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                    },
                }),
                // SOFT
                ...(softVariant && {
                    color: theme.palette.text.secondary,
                    backgroundColor: alpha(theme.palette.grey[500], 0.08),
                    "&:hover": {
                        backgroundColor: alpha(theme.palette.grey[500], 0.24),
                    },
                }),
            }),
        };
        const colorStyle = COLORS.map((color) => ({
            ...(ownerState.color === color && {
                // CONTAINED
                ...(containedVariant && {
                    border: "1px solid",
                    backgroundColor: theme.palette[color].main,
                    color: theme.palette.common.white,
                    "&:hover": {
                        backgroundColor: theme.palette[color].dark,
                    },
                }),
                // OUTLINED
                ...(outlinedVariant && {
                    border: "1px solid",
                    borderColor: theme.palette[color][isLight ? "main" : "light"],
                    "&:hover": {
                        borderColor: theme.palette[color][isLight ? "dark" : "light"]
                    },
                }),
                // SOFT
                ...(softVariant && {
                    color: theme.palette[color][isLight ? "dark" : "light"],
                    backgroundColor: alpha(theme.palette[color].main, 0.16),
                    "&:hover": {
                        backgroundColor: alpha(theme.palette[color].main, 0.32),
                    },
                }),
            }),
        }));
        const disabledState = {
            "&.Mui-disabled": {
                // SOFT
                ...(softVariant && {
                    backgroundColor: theme.palette.action.disabledBackground,
                }),
            },
        };
        return [...colorStyle, defaultStyle, disabledState];
    };
    return {
        MuiIconButton: {
            styleOverrides: {
                root: ({ ownerState }) => rootStyle(ownerState),
            },
        },
    };
}
