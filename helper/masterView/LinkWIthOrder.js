"use client";
import { Box, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useAuthContext } from "auth/hooks";
import { useCustomPagination } from "hooks/useCustomPagination";
import { useTranslate } from "locales";
import moment from "moment";
import Link from "next/link";
import { memo, useCallback, useState } from "react";
import { paths } from "routes/paths";
import { timemiliesToSpecificFormat } from "utils/format-time";
import { invoiceStatusHelper, purchaseStatusHelper, workOrderStatusHelper } from "utils/statusUtil";



function LinkWIthOrder({ purchaseOrder = null, workorder = null, customer = null, vehicle = null, invoice = null }) {
    const { t } = useTranslate()


    const TABS = [
        !!customer && { value: "customer", label: t("customer") },
        !!vehicle && { value: "vehicle", label: t("vehicle") },
        !!workorder && { value: "work_order", label: t("work_order") },
        !!purchaseOrder && { value: "purchase_order", label: t("purchase_order") },
        !!invoice && { value: "invoice", label: t("invoice") },
    ].filter(Boolean);


    const [currentTab, setCurrentTab] = useState(TABS?.[0]?.value || '')
    const handleChangeTab = useCallback((event, newValue) => {
        setCurrentTab(newValue)
    }, []);

    if (!TABS?.length) {
        return null
    }

    return (
        <>
            <Paper sx={{ p: 2, py: 1, mx: 2, }} variant='outlined' >
                <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', }}>
                    <Tabs value={currentTab} onChange={handleChangeTab} >
                        {TABS.map((tab) => (
                            <Tab key={tab.value}
                                value={tab.value}
                                label={<Typography color={currentTab == tab?.value ? 'text.primary' : 'text.secondary'} variant={'subtitle2'} textTransform='capitalize' >{tab?.label}</Typography>}
                            />
                        ))}
                    </Tabs>
                </Box>
                {currentTab == 'purchase_order' && <LinkPurchase purchaseOrder={purchaseOrder} />}
                {currentTab == 'customer' && <LinkCustomer customer={customer} />}
                {currentTab == 'vehicle' && <LinkVehicle vehicle={vehicle} />}
                {currentTab == 'work_order' && <LinkWorkorder workorder={workorder} />}
                {currentTab == 'invoice' && <LinkInvoice invoice={invoice} />}

            </Paper>
        </>
    );
}

const LinkVehicle = memo(({ vehicle = {} }) => {
    const { license_plate = '', year, make, model, sub_model, vehicle_classification_type, fuel_type } = vehicle || {};
    const { t } = useTranslate()
    const { pagination } = useCustomPagination()

    return (
        <>
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ '& .MuiTableCell-root': { px: 0, py: 1 } }}>
                            <TableCell>{t('license_plate')}</TableCell>
                            <TableCell>{t('year')}</TableCell>
                            <TableCell>{t('make')}</TableCell>
                            <TableCell>{t('model')}</TableCell>
                            <TableCell>{t('sub_model')}</TableCell>
                            <TableCell>{t('body_type')}</TableCell>
                            <TableCell>{t('fuel_type')}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow sx={{ '& .MuiTableCell-root': { px: 0, py: 1 } }}>
                            <TableCell >{license_plate}</TableCell>
                            <TableCell >{year}</TableCell>
                            <TableCell>{make}</TableCell>
                            <TableCell>{model}</TableCell>
                            <TableCell>{sub_model}</TableCell>
                            <TableCell>{vehicle_classification_type?.classification_type || '-'}</TableCell>
                            <TableCell>{fuel_type?.title || '-'}</TableCell>
                            <TableCell align="right">
                                {/* <IconButton  ><GoogleMaterialIcon icon={'link_off'} /></IconButton> */}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    )
})

LinkVehicle.displayName = 'LinkVehicle';


const LinkCustomer = memo(({ customer = {} }) => {
    const { first_name, last_name, company_name, email, phone, customer_type, customer_id } = customer || {};
    const { t } = useTranslate()
    const { pagination } = useCustomPagination()

    return (
        <>
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ '& .MuiTableCell-root': { px: 0, py: 1 } }}>
                            <TableCell>{t('name')}</TableCell>
                            {customer_type != 'individual' && <TableCell>{t('company_name')}</TableCell>}
                            <TableCell>{t('email')}</TableCell>
                            <TableCell>{t('phone')}</TableCell>
                            <TableCell>{t('type')}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow sx={{ '& .MuiTableCell-root': { px: 0, py: 1 } }}>
                            <TableCell>
                                {customer_id ?
                                    <Typography
                                        variant='body2'
                                        color={'primary'}
                                        sx={{ flex: 1, textAlign: 'right', fontWeight: "medium" }}
                                        component={Link}
                                        href={`${paths.workflow.customers}/${btoa(customer_id)}?page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`} style={{ textDecoration: 'none' }}
                                    >
                                        {`${first_name} ${last_name}`}
                                    </Typography> : ''
                                }
                            </TableCell>
                            {customer_type != 'individual' && <TableCell >{company_name}</TableCell>}
                            <TableCell >{email}</TableCell>
                            <TableCell >{phone}</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize' }}>{customer_type}</TableCell>
                            <TableCell align="right">
                                {/* <IconButton  ><GoogleMaterialIcon icon={'link_off'} /></IconButton> */}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    )
})
LinkCustomer.displayName = 'LinkCustomer';


const LinkWorkorder = memo(({ workorder = {} }) => {
    const { workorder_number = '', workorder_id, workorder_date, workorder_status } = workorder || {};
    const { t } = useTranslate()
    const { pagination } = useCustomPagination()
    const { DATE_FORMAT, } = useAuthContext();

    const { iconColor, statusText } = workOrderStatusHelper(workorder_status);

    return (
        <>
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ '& .MuiTableCell-root': { px: 0, py: 1 } }}>
                            <TableCell  >{t('date')}</TableCell>
                            <TableCell  >{t('workorder_number')}</TableCell>
                            <TableCell  >{t('status')}</TableCell>
                            <TableCell  ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow sx={{ '& .MuiTableCell-root': { px: 0, py: 1 } }}>
                            <TableCell>{timemiliesToSpecificFormat(workorder_date, DATE_FORMAT)}</TableCell>
                            <TableCell >
                                {workorder_id ?
                                    <Typography
                                        variant='body2'
                                        color={'primary'}
                                        sx={{ flex: 1, textAlign: 'right', fontWeight: "medium" }}
                                        component={Link}
                                        href={`${paths.workflow.workorder}/${btoa(workorder_id)}?page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`} style={{ textDecoration: 'none' }}
                                    >
                                        {workorder_number}
                                    </Typography> : ''
                                }
                            </TableCell>
                            <TableCell sx={{ textTransform: 'uppercase', color: iconColor[800] }} >{statusText}</TableCell>
                            <TableCell align="right">
                                {/* <IconButton  ><GoogleMaterialIcon icon={'link_off'} /></IconButton> */}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    )
})
LinkWorkorder.displayName = 'LinkWorkorder';


const LinkPurchase = memo(({ purchaseOrder = {} }) => {
    const { purchase_order_number, purchase_order_id, purchase_order_date, workorder, purchase_order_status, } = purchaseOrder || {};
    const { workorder_id, workorder_number } = workorder || {}

    const { t } = useTranslate()
    const { DATE_FORMAT, } = useAuthContext();
    const { statusText } = purchaseStatusHelper(purchase_order_status);
    const { pagination } = useCustomPagination()

    return (
        <>
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ '& .MuiTableCell-root': { px: 0, py: 1 } }}>
                            <TableCell>{t('date')}</TableCell>
                            <TableCell>{t('purchase_order')}</TableCell>
                            <TableCell>{t('work_order')}</TableCell>
                            <TableCell>{t('status')}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow sx={{ '& .MuiTableCell-root': { px: 0, py: 1 } }}>
                            <TableCell>{timemiliesToSpecificFormat(purchase_order_date, DATE_FORMAT)}</TableCell>
                            <TableCell >
                                {purchase_order_id ?
                                    <Typography
                                        variant='body2'
                                        color={'primary'}
                                        sx={{ flex: 1, textAlign: 'right', fontWeight: "medium" }}
                                        component={Link}
                                        href={`${paths.purchase.purchaseOrder}/${btoa(purchase_order_id)}?page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`} style={{ textDecoration: 'none' }}
                                    >
                                        {purchase_order_number}
                                    </Typography> : ''
                                }
                            </TableCell>
                            <TableCell >
                                {workorder_id ?
                                    <Typography
                                        variant='body2'
                                        color={'primary'}
                                        sx={{ flex: 1, textAlign: 'right', fontWeight: "medium" }}
                                        component={Link}
                                        href={`${paths.workflow.workorder}/${btoa(workorder_id)}?page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`} style={{ textDecoration: 'none' }}
                                    >
                                        {workorder_number}
                                    </Typography> : ''
                                }</TableCell>

                            <TableCell>{statusText}</TableCell>
                            <TableCell align="right">
                                {/* <IconButton  ><GoogleMaterialIcon icon={'link_off'} /></IconButton> */}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    )
})
LinkPurchase.displayName = 'LinkPurchase';

const LinkInvoice = memo(({ invoice = {} }) => {
    const { invoice_id, invoice_number, invoice_date, invoice_status, due_date, final_total, final_total_paid, due_amount } = invoice || {};
    const { t } = useTranslate()
    const { pagination } = useCustomPagination()
    const { DATE_FORMAT, DECIMAL_VALUE, CURRENCY_SYMBOL } = useAuthContext();

    let showDue = (moment(due_date).isBefore(moment(), 'day') && Number(due_amount) > 0)
    let overDueDate = `${t('overdue_by')} ${Math.abs(moment(due_date).diff(moment(), 'days'))} ${t('days')}`;
    const { statusText, iconColor } = invoiceStatusHelper(invoice_status)

    return (
        <>
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ '& .MuiTableCell-root': { px: 0, py: 1 } }}>
                            <TableCell>{t('date')}</TableCell>
                            <TableCell>{t('invoice_number')}</TableCell>
                            <TableCell>{t('status')}</TableCell>
                            <TableCell>{t('due_date')}</TableCell>
                            <TableCell>{t('amount')}</TableCell>
                            <TableCell>{t('balance_due')}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow sx={{ '& .MuiTableCell-root': { px: 0, py: 1 } }}>
                            <TableCell>{timemiliesToSpecificFormat(invoice_date, DATE_FORMAT)}</TableCell>
                            <TableCell>
                                {invoice_id ?
                                    <Typography
                                        variant='body2'
                                        color={'primary'}
                                        sx={{ flex: 1, textAlign: 'right', fontWeight: "medium" }}
                                        component={Link}
                                        href={`${paths.workflow.invoice}/${btoa(invoice_id)}?page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`} style={{ textDecoration: 'none' }}
                                    >
                                        {invoice_number}
                                    </Typography> : ''
                                }
                            </TableCell>
                            <TableCell sx={{ textTransform: 'uppercase', color: showDue ? 'error.main' : iconColor[800] }} >{showDue ? overDueDate : statusText}</TableCell>
                            <TableCell>{timemiliesToSpecificFormat(due_date, DATE_FORMAT)}</TableCell>

                            <TableCell>{`${CURRENCY_SYMBOL} ${Number(final_total).toFixed(DECIMAL_VALUE)}`}</TableCell>

                            <TableCell sx={{ color: due_amount > 0 ? 'error.main' : 'default' }}>{`${CURRENCY_SYMBOL} ${Number(due_amount).toFixed(DECIMAL_VALUE)}`}</TableCell>

                            <TableCell align="right">
                                {/* <IconButton  ><GoogleMaterialIcon icon={'link_off'} /></IconButton> */}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    )
})
LinkInvoice.displayName = 'LinkInvoice';



export default memo(LinkWIthOrder);
