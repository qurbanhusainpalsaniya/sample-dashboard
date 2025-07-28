import { alpha } from "@mui/material/styles";
import { listClasses } from "@mui/material/List";
import { paperClasses } from "@mui/material/Paper";
import { buttonClasses } from "@mui/material/Button";
import { listItemIconClasses } from "@mui/material/ListItemIcon";
import { tablePaginationClasses } from "@mui/material/TablePagination";

import { paper } from "../../css";
import { gridClasses } from "@mui/x-data-grid";

// ----------------------------------------------------------------------

export function dataGrid(theme) {
    const paperStyles = paper({ theme, dropdown: true });

    return {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    borderWidth: 0,
                    [`& .${tablePaginationClasses.root}, & .${gridClasses.filler} div`]: {
                        borderTop: 0,
                    },
                    [`& .${tablePaginationClasses.toolbar}`]: {
                        height: "auto",
                    },
                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                    {
                      outline: 'none',
                    },
                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                    {
                      outline: 'none',
                    },
                },
                row: {
                    "&:last-of-type": {
                        [`& .${gridClasses.cell}`]: {
                            border: "none",
                        },
                    },
                },
                cell: {
                    display:"flex",
                    alignItems:'center',
                    borderTop: 'none',
                    borderBottom: `1px dashed ${theme.palette.divider}`,
                },
                selectedRowCount: {
                    whiteSpace: "nowrap",
                },
                columnSeparator: {
                    color: theme.palette.divider,
                },
                toolbarContainer: {
                    padding: theme.spacing(2),
                    borderBottom: `1px dashed ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.neutral,
                },
                paper: {
                    ...paperStyles,
                    padding: 0,
                },
                menu: {
                    [`& .${paperClasses.root}`]: {
                        ...paperStyles,
                    },
                    [`& .${listClasses.root}`]: {
                        padding: 0,
                        [`& .${listItemIconClasses.root}`]: {
                            minWidth: 0,
                            marginRight: theme.spacing(2),
                        },
                    },
                },
                columnHeaders: {
                    borderRadius: 0,
                    backgroundColor: theme.palette.background.paper,
                    textTransform: "UpperCase",
                    color: theme.palette.text.secondary,
                },
                panelHeader: {
                    padding: theme.spacing(2),
                },
                panelFooter: {
                    padding: theme.spacing(2),
                    justifyContent: "flex-end",
                    borderTop: `dashed 1px ${theme.palette.divider}`,
                    [`& .${buttonClasses.root}`]: {
                        "&:first-of-type": {
                            border: `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
                        },
                        "&:last-of-type": {
                            marginLeft: theme.spacing(1.5),
                            color: theme.palette.background.paper,
                            backgroundColor: theme.palette.text.primary,
                        },
                    },
                },
                filterForm: {
                    padding: theme.spacing(2),
                },
                filterFormValueInput: {
                    marginLeft: theme.spacing(2),
                },
                filterFormColumnInput: {
                    marginLeft: theme.spacing(2),
                },
                filterFormOperatorInput: {
                    marginLeft: theme.spacing(2),
                },
            },
        },
    };
}
