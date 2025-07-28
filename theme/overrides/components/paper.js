import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export function paper(theme) {
    return {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    borderRadius: theme.shape.borderRadius * 1,
                },
                outlined: {
                    borderColor: alpha(theme.palette.grey[500], 0.16),
                },
            },
        },
    };
}
