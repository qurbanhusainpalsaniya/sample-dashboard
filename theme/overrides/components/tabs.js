import { tabClasses } from "@mui/material/Tab";

// ----------------------------------------------------------------------

export function tabs(theme) {
    return {
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: theme.palette.primary.main,
                },
                scrollButtons: {
                    width: 48,
                    borderRadius: "50%",
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    padding: 0,
                    opacity: 1,
                    minWidth: 48,
                    minHeight: 48,
                    fontWeight: theme.typography.fontWeightSemiBold,
                    "&.Mui-selected": {
                        color: theme.palette.primary.main,
                    },
                    "&:not(:last-of-type)": {
                        marginRight: theme.spacing(2),
                        [theme.breakpoints.up("sm")]: {
                            marginRight: theme.spacing(3),
                        },
                    },
                    [`&:not(.${tabClasses.selected})`]: {
                        color: theme.palette.text.secondary,
                    },
                },
            },
        },
    };
}
