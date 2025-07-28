import { alpha, lighten } from "@mui/material/styles";
import { tableRowClasses } from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material/TableCell";
import { grey } from "@mui/material/colors";
// ----------------------------------------------------------------------
export function table(theme) {
    return {
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    position: "relative",
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    [`&.${tableRowClasses.selected}`]: {
                        backgroundColor: alpha(theme.palette.primary.dark, 0.04),
                        "&:hover": {
                            backgroundColor: alpha(theme.palette.primary.dark, 0.08),
                        },
                    },
                    "&:last-of-type": {
                        [`& .${tableCellClasses.body}`]: {
                            border: "none",
                        },
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottomStyle: "dashed",
                },
                head: {
                    fontSize: 14,
                    color: theme.palette.text.secondary,
                    fontWeight: theme.typography.fontWeightSemiBold,
                },
                stickyHeader: {
                    // backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
                    backgroundColor: theme.palette.mode === "light" ? lighten(theme.palette.primary.main, 0.9) : alpha(grey[500], 0.12),
                    color: theme.palette.mode === "light" ? theme.palette.text.secondary : theme.palette.text.secondary,


                    // borderBottom: `1px solid ${theme.palette.divider}`,
                    // backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
                    // backgroundColor: lighten(theme.palette.background.neutral, 0.3),
                },
                body: {
                    padding: theme.spacing(1, 2),
                },
                paddingCheckbox: {
                    paddingLeft: theme.spacing(1),
                },
            },
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    width: "100%",
                },
                toolbar: {
                    height: 64,
                },
                actions: {
                    marginRight: 8,
                },
                select: {
                    paddingLeft: 8,
                    "&:focus": {
                        borderRadius: theme.shape.borderRadius,
                    },
                },
                selectIcon: {
                    right: 4,
                    width: 16,
                    height: 16,
                    top: "calc(50% - 8px)",
                },
            },
        },
    };
}
