import { darken, Divider, IconButton, lighten, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useAuthContext } from "auth/hooks";
import { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import { useSettingsContext } from "components/settings";
import AccountPopover from "layouts/common/account-popover";
import NotificationsPopover from "layouts/common/notifications-popover";
import { useTranslate } from "locales";
import dynamic from "next/dynamic";
import { useState } from "react";
import { hideScroll } from "theme/css";
import { NAV } from "../config-layout";
import { useMainNavData } from "./config-navigation";

// const CustomPopover = dynamic(() => import("components/custom-popover/custom-popover"));
// const CreateWorkOrderModal = dynamic(() => import("sections/workflow/workorder/modal/CreateWorkOrderModal"));
// const CreateAppointmentModal = dynamic(() => import("sections/calendar/appointment/model/CreateAppointmentModal"));
// const CreateEstimateModal = dynamic(() => import("sections/workflow/estimate/modal/CreateEstimateModal"));
// const CreateBillModal = dynamic(() => import("sections/purchase/bill/modal/CreateBillModal"));
// const CreateInvoiceModal = dynamic(() => import("sections/workflow/invoice/modal/CreateInvoiceModal"));
// const CreateExpenseModal = dynamic(() => import("sections/purchase/expense/modal/CreateExpenseModal"));


export default function NavMini() {
    const { t } = useTranslate();


    const { user } = useAuthContext();
    const navData = useMainNavData();
    const settings = useSettingsContext();

    const toggleThemeMode = () => {
        const newMode = settings.themeMode === 'light' ? 'dark' : 'light';
        settings.onUpdate('themeMode', newMode);
    };

    const popover = usePopover();
    const [openModal, setOpenModal] = useState({ status: false, type: '' })
    function openModalClose(value) {
        setOpenModal({ status: false, type: '' });
    }

    return (
        <>
            <Box sx={{ flexShrink: { lg: 0 }, width: { lg: NAV.W_MINI } }}>
                <Stack
                    sx={{
                        alignItems: 'center',
                        py: 2,
                        height: 1,
                        position: "fixed",
                        width: NAV.W_MINI,
                        borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
                        ...hideScroll.x,
                        bgcolor: (theme) => theme.palette?.mode === 'light' ? lighten(theme.palette.primary.main, 0.93) : darken(theme.palette.primary.dark, 0.8),
                        gap: 2
                    }}
                >
                    <AccountPopover />
                    <NotificationsPopover />
                    <IconButton><GoogleMaterialIcon icon={'contact_support'} /></IconButton>
                    <IconButton  color="primary" onClick={popover.onOpen} >
                        <GoogleMaterialIcon icon={'add_circle'} filled />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }} />

                    <IconButton color="inherit" onClick={toggleThemeMode}>
                        <GoogleMaterialIcon filled icon={settings.themeMode === 'light' ? 'dark_mode' : 'light_mode'} />
                    </IconButton>

                </Stack>
            </Box>

            {/* <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-center" sx={{ ml: -1 }}>
                <MenuItem onClick={() => { setOpenModal({ status: true, type: "ESTIMATE" }), popover.onClose(); }}>
                    <GoogleMaterialIcon icon={'calculate'} sx={{ color: "text.secondary" }} />
                    {t("estimate")}
                </MenuItem>

                <MenuItem onClick={() => { setOpenModal({ status: true, type: "WORKORDER" }), popover.onClose(); }} >
                    <GoogleMaterialIcon icon={'assignment'} sx={{ color: "text.secondary" }} />
                    {t("workorder")}
                </MenuItem>

                <MenuItem onClick={() => { setOpenModal({ status: true, type: "INVOICE" }), popover.onClose(); }} >
                    <GoogleMaterialIcon icon={'receipt'} sx={{ color: "text.secondary" }} />
                    {t("invoice")}
                </MenuItem>

                <Divider />

                <MenuItem onClick={() => { popover.onClose(); }} >
                    <GoogleMaterialIcon icon={'reset_wrench'} sx={{ color: "text.secondary" }} />
                    {t("parts_requisition")}
                </MenuItem>

                <MenuItem onClick={() => { popover.onClose(); }} >
                    <GoogleMaterialIcon icon={'shopping_cart'} sx={{ color: "text.secondary" }} />
                    {t("purchase_order")}
                </MenuItem>

                <MenuItem onClick={() => { setOpenModal({ status: true, type: "BILL" }), popover.onClose(); }} >
                    <GoogleMaterialIcon icon={'receipt_long'} sx={{ color: "text.secondary" }} />
                    {t("bill")}
                </MenuItem>

                <Divider />

                <MenuItem onClick={() => { setOpenModal({ status: true, type: "EXPENSE" }), popover.onClose(); }} >
                    <GoogleMaterialIcon icon={'account_balance_wallet'} sx={{ color: "text.secondary" }} />
                    {t("expense")}
                </MenuItem>

                <Divider />

                <MenuItem onClick={() => { setOpenModal({ status: true, type: "APPOINTMENT" }), popover.onClose(); }} >
                    <GoogleMaterialIcon icon={'event'} sx={{ color: "text.secondary" }} />
                    {t("appointment")}
                </MenuItem>
            </CustomPopover>
            {(openModal.status && openModal.type == 'ESTIMATE') && <CreateEstimateModal open={openModal.status} onClose={openModalClose} />}
            {(openModal.status && openModal.type == 'WORKORDER') && <CreateWorkOrderModal open={openModal.status} onClose={openModalClose} />}
            {(openModal.status && openModal.type == 'APPOINTMENT') && <CreateAppointmentModal open={openModal.status} onClose={openModalClose} />}
            {(openModal.status && openModal.type == 'BILL') && <CreateBillModal open={openModal.status} onClose={openModalClose} />}
            {(openModal.status && openModal.type == 'INVOICE') && <CreateInvoiceModal open={openModal.status} onClose={openModalClose} />}
            {(openModal.status && openModal.type == 'EXPENSE') && <CreateExpenseModal open={openModal.status} onClose={openModalClose} />} */}
        </>
    );
}
