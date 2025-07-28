"use client";
import { Box, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DataGrid } from '@mui/x-data-grid';
import { useAuthContext } from "auth/hooks";
import { useTranslate } from "locales";
import dynamic from "next/dynamic";
import { ROW_PER_PAGE_OPTION } from "utils/constant";
import { timemiliesToSpecificFormat } from "utils/format-time";

const MasterItemEmpty = dynamic(() => import("components/skeleton/MasterItemEmpty"));


export default function InventoryBatchView({ referenceData = [] }) {
    const { DATE_FORMAT } = useAuthContext();
    const { t } = useTranslate();

    const defaultColumn = {
        disableColumnMenu: true,
        sortable: false,
        minWidth: 140,
        flex: 0.3
    }

    const columns = [
        {
            field: 'reference',
            ...defaultColumn,
            sortable: true,
            flex: 0.15,
            minWidth: 120,
            headerName: <Typography variant="caption" fontWeight={'medium'}>#</Typography>,
            renderCell: ({ row }) => <Typography variant="body2"   >{row?.bill?.bill_number || "-"}</Typography>

        },
        {
            field: 'batch_reference',
            ...defaultColumn,
            sortable: true,
            headerName: <Typography variant="caption" fontWeight={'medium'}>{t('batch_reference')}</Typography>,
        },
        {
            field: 'manufacturer_batch',
            ...defaultColumn,
            headerName: <Typography variant="caption" fontWeight={'medium'}>{t('manufacture_batch')}</Typography>,
        },
        {
            field: 'manufactured_date',
            ...defaultColumn,
            headerName: <Typography variant="caption" fontWeight={'medium'}>{t('manufacture_date')}</Typography>,
            renderCell: ({ row }) => <Typography variant="body2"   >{row?.manufactured_date ? timemiliesToSpecificFormat(row.manufactured_date, DATE_FORMAT) : ""}</Typography>
        },
        {
            field: 'expiry_date',
            ...defaultColumn,
            headerName: <Typography variant="caption" fontWeight={'medium'}>{t('expiry_date')}</Typography>,
            renderCell: ({ row }) => <Typography variant="body2"   >{row?.expiry_date ? timemiliesToSpecificFormat(row.expiry_date, DATE_FORMAT) : ""}</Typography>
        },
        {
            field: 'quantity_in',
            ...defaultColumn,
            sortable: true,
            headerName: <Typography variant="caption" fontWeight={'medium'}>{t('quantity_in')}</Typography>,
        },
        {
            field: 'current_stock',
            ...defaultColumn,
            sortable: true,
            headerName: <Typography variant="caption" fontWeight={'medium'}>{t('current_stock')}</Typography>,
        },

    ];


    return (
        <Box sx={{ p: 2 }} >
            <Paper variant="outlined">
                <DataGrid
                    columnHeaderHeight={40}
                    getRowId={(referenceData) => referenceData.batch_id}
                    rows={referenceData}
                    columns={columns}
                    rowCount={referenceData.length}
                    paginationMode='server'
                    sortingOrder={['asc', 'desc']}
                    pageSizeOptions={ROW_PER_PAGE_OPTION}
                    disableRowSelectionOnClick
                    slots={{
                        noRowsOverlay: () => <MasterItemEmpty isNotFound={true} />
                    }}
                    hideFooter
                />
            </Paper>
        </Box>
    );
}