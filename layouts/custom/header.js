import { Divider, MenuItem } from "@mui/material";
import Grid from '@mui/material/Grid2';
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import Logo from "components/logo";
import { useSettingsContext } from "components/settings";
import SvgColor from "components/svg-color";
import { useOffSetTop } from "hooks/use-off-set-top";
import { useResponsive } from "hooks/use-responsive";
import NotificationsPopover from "layouts/common/notifications-popover";
import { useTranslate } from "locales";
import dynamic from "next/dynamic";
import Link from "next/link";
import PropTypes from "prop-types";
import { useState } from "react";
import { paths } from "routes/paths";
import { bgBlur } from "theme/css";
import AccountPopover from "../common/account-popover";
import LanguagePopover from "../common/language-popover";
import Searchbar from "../common/searchbar";
import SettingsButton from "../common/settings-button";
import { HEADER, NAV } from "../config-layout";

// const CustomPopover = dynamic(() => import("components/custom-popover/custom-popover"));
// const CreateWorkOrderModal = dynamic(() => import("sections/workflow/workorder/modal/CreateWorkOrderModal"));
// const CreateAppointmentModal = dynamic(() => import("sections/calendar/appointment/model/CreateAppointmentModal"));
// const CreateEstimateModal = dynamic(() => import("sections/workflow/estimate/modal/CreateEstimateModal"));
// const CreateBillModal = dynamic(() => import("sections/purchase/bill/modal/CreateBillModal"));
// const CreateInvoiceModal = dynamic(() => import("sections/workflow/invoice/modal/CreateInvoiceModal"));
// const CreateExpenseModal = dynamic(() => import("sections/purchase/expense/modal/CreateExpenseModal"));

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
    const theme = useTheme();
    const { t } = useTranslate();


    const settings = useSettingsContext();

    const isNavHorizontal = settings.themeLayout === "horizontal";

    const isNavMini = settings.themeLayout === "mini";

    const lgUp = useResponsive("up", "lg");

    const offset = useOffSetTop(HEADER.H_DESKTOP);

    const offsetTop = offset && !isNavHorizontal;

    const popover = usePopover();

    const [openModal, setOpenModal] = useState({ status: false, type: '' })
    function openModalClose(value) {
        setOpenModal({ status: false, type: '' });
    }


    const renderContent = (
        <>
            {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

            {!lgUp ? (
                <IconButton onClick={onOpenNav}>
                    <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
                </IconButton>
            ) : (
                <IconButton onClick={() => settings.onUpdate("themeLayout", settings.themeLayout === "vertical" ? "mini" : "vertical")}>
                    <GoogleMaterialIcon icon='menu' filled />
                </IconButton>
            )}

            <Searchbar />

            <Stack flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end" spacing={{ xs: 0.5, sm: 1 }}>

                <SettingsButton />

                <IconButton aria-label="add" variant='soft' color="inherit" onClick={popover.onOpen}>
                    <GoogleMaterialIcon icon={'add_circle'} filled fontSize="small" sx={{ color: "primary.main" }} />
                </IconButton>


                <NotificationsPopover />
                <LanguagePopover />
                {/* <ContactsPopover /> */}

                <Link href={paths.setting.profile} >
                    <IconButton aria-label="add" variant='soft' color="inherit" >
                        <GoogleMaterialIcon icon={'settings'} filled />
                    </IconButton>
                </Link>
                <AccountPopover />
            </Stack>

            {/* <CustomPopover open={popover.open} onClose={popover.onClose} arrow="top-center" sx={{ mt: 1 }}>
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
            </CustomPopover> */}
        </>
    );

    return (
        <>
            <AppBar
                sx={{
                    borderRadius: 0,
                    height: HEADER.H_MOBILE,
                    zIndex: theme.zIndex.appBar + 1,
                    ...bgBlur({
                        color: theme.palette.background.default,
                    }),
                    transition: theme.transitions.create(["height"], {
                        duration: theme.transitions.duration.shorter,
                    }),
                    ...(lgUp && {
                        width: `calc(100% - ${NAV.W_VERTICAL + NAV.W_MINI + 1}px)`,
                        height: HEADER.H_DESKTOP,
                        borderBottom: `solid 1px ${theme.palette.divider}`,
                        // ...(isNavHorizontal && {
                        //   width: 1,
                        //   bgcolor: 'background.default',
                        //   height: HEADER.H_DESKTOP_OFFSET,
                        //   borderBottom: `dashed 1px ${theme.palette.divider}`,
                        // }),
                        ...(isNavMini && {
                            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
                        }),
                    }),
                }}
            >
                <Toolbar sx={{ height: 1, px: { lg: 1 } }}>
                    {renderContent}
                </Toolbar>
            </AppBar>

            {(openModal.status && openModal.type == 'ESTIMATE') && <CreateEstimateModal open={openModal.status} onClose={openModalClose} />}
            {(openModal.status && openModal.type == 'WORKORDER') && <CreateWorkOrderModal open={openModal.status} onClose={openModalClose} />}
            {(openModal.status && openModal.type == 'APPOINTMENT') && <CreateAppointmentModal open={openModal.status} onClose={openModalClose} />}
            {(openModal.status && openModal.type == 'BILL') && <CreateBillModal open={openModal.status} onClose={openModalClose} />}
            {(openModal.status && openModal.type == 'INVOICE') && <CreateInvoiceModal open={openModal.status} onClose={openModalClose} />}
            {(openModal.status && openModal.type == 'EXPENSE') && <CreateExpenseModal open={openModal.status} onClose={openModalClose} />}

        </>
    );
}

Header.propTypes = {
    onOpenNav: PropTypes.func,
};
