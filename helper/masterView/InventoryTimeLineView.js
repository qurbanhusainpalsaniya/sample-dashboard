"use client";
import { Avatar, Box, Button, Container, Divider, Paper, Stack, TablePagination, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useAuthContext } from "auth/hooks";
import GoogleMaterialIcon from "components/google-icon";
import { MasterItemEmpty, MasterItemSkeleton } from "components/skeleton";
import useApi from "hooks/useApi";
import { useCustomPagination } from "hooks/useCustomPagination";
import { useTranslate } from "locales";
import Link from "next/link";
import { useEffect, useState } from "react";
import { paths } from "routes/paths";
import { API_PAGE_LIMIT, INVENTORY_ITEM_TRANSACTION } from "utils/constant";
import { timemiliesToSpecificFormat } from "utils/format-time";
import { itemTransactionStatusHelper } from "utils/statusUtil";

export default function InventoryTimeLineView({ referenceID = null, eventFor = '' }) {
    const { DATE_FORMAT, CURRENCY_SYMBOL, DECIMAL_VALUE } = useAuthContext();
    const { t } = useTranslate();
    const { pagination } = useCustomPagination()


    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData, } = useApi();
    const [loading, setLoading] = useState(true)
    const [itemList, setItemList] = useState([]);
    const [curentPage, setCurentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");

    async function GetItemList() {
        try {
            setLoading(true);
            const params = {
                search_keyword: "",
                order_by_column: "created_date",
                order_by: "desc",
                skip: curentPage,
                take: API_PAGE_LIMIT,
                inventory_id: eventFor == 'inventory' ? referenceID : null,
                bill_id: eventFor == 'bill' ? referenceID : null,
                invoice_id: eventFor == 'invoice' ? referenceID : null,
                transaction_type: null,
            };
            const response = await getApiData(INVENTORY_ITEM_TRANSACTION.get, params, signal);
            setTotalPage(~~response.data.count);
            setItemList(response.data.result);
            setLoading(false);
        } catch (error) {
            controller.abort();
            console.log(error);
        }
    }
    useEffect(() => {
        GetItemList();
        return () => {
            controller.abort();
        };
    }, [curentPage, search]);

    useEffect(() => {
        setCurentPage(0);
        setItemList([]);
        setLoading(true);
    }, [search]);

    const handleChangePage = (_event, newPage) => {
        setPage(~~newPage);
        setCurentPage(~~newPage * ~~API_PAGE_LIMIT);
    };


    function TimelineRow({ row, index }) {
        const { statusIcon, statusText, title, color } = itemTransactionStatusHelper(row, DATE_FORMAT);
        const { transaction_type, rate_per_unit, created_date, quantity, bill, invoice, } = row;


        return (
            <Box display={'flex'} alignItems='center' justifyContent={'space-between'} sx={{ p: 1 }}>
                <Box display={'flex'} alignItems='center' gap={1}>
                    <Avatar sx={{ bgcolor: 'transparent', }}>
                        {statusIcon}
                    </Avatar>
                    <Box display={'flex'} flexDirection='column' flex={1}>
                        <Typography variant="body2" textTransform={'capitalize'}>{`${t(transaction_type)} ${title ? `- ${title}` : ""}`}</Typography>
                        <Typography variant='caption' color={'text.secondary'}  >
                            {`${timemiliesToSpecificFormat(created_date, `${DATE_FORMAT} hh:mm A`)}`}
                        </Typography>
                    </Box>
                </Box>
                <Box display={'flex'} alignItems='center' justifyContent={'space-between'} flex={1}>
                    <Box display={'flex'} flexDirection='column' flex={1} alignItems='flex-end'>
                        <Typography variant="caption" color={'text.secondary'} textTransform={'capitalize'}>{statusText}</Typography>
                        <Typography variant='body2'   >{Number(quantity).toFixed(DECIMAL_VALUE)}</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection='column' flex={1} alignItems='flex-end'>
                        <Typography variant="caption" color={'text.secondary'} textTransform={'capitalize'}>{t('rate')}</Typography>
                        <Typography variant='body2'   >{`${CURRENCY_SYMBOL} ${Number(rate_per_unit).toFixed(DECIMAL_VALUE)}`}</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection='column' flex={1} alignItems='flex-end'>
                        {!!bill &&
                            <Button
                                size="small"
                                startIcon={<GoogleMaterialIcon icon={'link'} />}
                                component={Link}
                                href={`${paths.purchase.bill}/${btoa(bill?.bill_id)}?page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`}
                                style={{ textDecoration: 'none' }}
                            >
                                {bill?.bill_number}
                            </Button>
                        }
                        {!!invoice &&
                            <Button
                                size="small"
                                startIcon={<GoogleMaterialIcon icon={'link'} />}
                                component={Link}
                                href={`${paths.workflow.invoice}/${btoa(invoice?.invoice_id)}?page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`}
                                style={{ textDecoration: 'none' }}
                            >
                                {invoice?.invoice_number}
                            </Button>
                        }
                    </Box>

                </Box>
            </Box>
        );
    }

    return (
        <>
            <Container maxWidth='md' disableGutters sx={{ m: 0 }}>
                <Box sx={{ p: 2 }} display='flex' flexDirection={'column'} gap={2}>
                    <Paper variant="outlined" >
                        {loading ?
                            <MasterItemSkeleton loadTime={API_PAGE_LIMIT} />
                            : itemList.length > 0
                                ?
                                <Stack divider={<Divider orientation="horizontal" flexItem />}>
                                    {itemList.map((item, _i,) => {
                                        return (
                                            <TimelineRow key={_i} row={item} index={_i} />
                                        );
                                    })}
                                </Stack>
                                :
                                <MasterItemEmpty isNotFound={true} />
                        }

                        <Box sx={{ width: "100%", borderTop: (theme) => `solid 1px ${theme.palette.divider}`, }}>
                            <TablePagination
                                rowsPerPageOptions={[API_PAGE_LIMIT]}
                                component="div"
                                count={totalPage}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={~~API_PAGE_LIMIT}
                                showFirstButton
                                showLastButton
                            />
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    );
}


