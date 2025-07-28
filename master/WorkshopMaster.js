import { Avatar, Box, Button, Dialog, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, TablePagination, Typography } from "@mui/material/";
import CustomerError from "app/error/CustomerError";
import { useAuthContext } from "auth/hooks";
import { SearchBar } from "components/custom";
import CustomPopover, { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import Scrollbar from "components/scrollbar";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import encryptLocalStorage from "localstorage-slim";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getFirstCharacter } from "utils/avatarUtil";
import { API_PAGE_LIMIT, COMPANY_API, SMALL_MODAL, STORAGE_KEY_PASSCODE, STORAGE_KEY_USER } from "utils/constant";


const ConfirmDialog = dynamic(() => import("./ConfirmDialog"));
const ConnectWorkshopDialog = dynamic(() => import("./ConnectWorkshopDialog"));
const CreateWorkshopDialog = dynamic(() => import("./CreateWorkshopDialog"));
const MasterItemEmpty = dynamic(() => import("components/skeleton/MasterItemEmpty"));
const MasterItemSkeleton = dynamic(() => import("components/skeleton/MasterItemSkeleton"));



export default function WorkshopMaster({ open, onClose }) {
    const { t } = useTranslate()
    const { getApiData, apiCalling, } = useApi();
    const controller = new AbortController();
    const { signal } = controller;
    const [curentPage, setCurentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [responseList, setResponseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const { user, initialize } = useAuthContext();
    const popover = usePopover();
    const [connectWorkShop, setConnectWorkshop] = useState(false);
    const [createWorkShop, setCreateWorkshop] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);
    const [showError, setShowError] = useState({ status: false, data: '' });


    const { enqueueSnackbar } = useSnackbar();

    async function connectWorkShopClose(value) {
        if (value.confirmation) {
            GetList();
        }
        setConnectWorkshop(value.status);
    }

    async function createtWorkShopClose(value) {
        if (value.confirmation) {
            GetList();
        }
        setCreateWorkshop(value.status);
    }
    async function GetList() {
        try {
            setLoading(true);
            const params = { skip: curentPage, take: API_PAGE_LIMIT, search_keyword: search };
            const response = await getApiData(COMPANY_API.connectedWorkshopList + user?.company_id, params, signal, "");
            setTotalPage(~~response.data.count);
            setResponseList(response.data.result);
            setShowAddButton(true);
            setShowError({ status: false, data: '' })
        } catch (error) {
            console.error(error);
            error.message != "canceled" && setShowError({ status: true, data: error })
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        GetList();
        return () => {
            controller.abort();
        };
    }, [open, curentPage, search]);
    useEffect(() => {
        setCurentPage(0);
        setPage(0);
        setResponseList([]);
        setLoading(true);
    }, [search]);
    async function changeWorkshop(row) {
        if (row.company_info == "yes" && row.company_tax_info == "yes") {
            encryptLocalStorage.set(STORAGE_KEY_USER, { ...user, currentWorkshop: row }, { encrypt: true, secret: STORAGE_KEY_PASSCODE });
            await initialize();
            onClose({ status: false });
        } else {
            enqueueSnackbar(t('please_complete_company_and_tax_details'), { variant: "error" });
        }
    }
    const handleChangePage = (event, newPage) => {
        setPage(~~newPage);
        setCurentPage(~~newPage * ~~API_PAGE_LIMIT);
    };
    async function DisconnectWorkshop(row) {
        try {
            await apiCalling({ url: COMPANY_API.disconnectWorkshop + row.company_id, method: 'put', })
            GetList();
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <>
            <Dialog
                fullWidth
                maxWidth={SMALL_MODAL}
                open={open}
                onClose={() => onClose({ status: false })}
                sx={{ "& .MuiPaper-root": { width: "100%", height: { xs: "90%", md: "100%" }, }, }}
            >
                <Box display={"flex"} flexDirection={"column"} minHeight={0} flex={1}>
                    <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider", }}>
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} pb={1}>
                            <Typography variant={"h6"}>{t("workshop")} </Typography>
                            <Box columnGap={2} display={"flex"} alignItems="center">
                                {showAddButton && (
                                    <Button color="primary" variant="contained" startIcon={<GoogleMaterialIcon icon='add' />} onClick={popover.onOpen}>{t("workshop")}</Button>
                                )}
                                <IconButton aria-label="close modal" onClick={() => onClose({ status: false })}><GoogleMaterialIcon icon='close' /></IconButton>
                            </Box>
                        </Box>

                        <SearchBar searchWord={search} setSearchWord={setSearch} fullWidth />

                    </Box>
                    <Box sx={{ overflow: "hidden", flex: 1 }}>
                        <Scrollbar>
                            <List sx={{ py: 0 }}>
                                {loading ? (
                                    <MasterItemSkeleton />
                                ) :
                                    showError.status ?
                                        <CustomerError error={showError.data} />
                                        :
                                        responseList.length > 0 ? (
                                            responseList.map((row, index) => {
                                                return (
                                                    <WorkshopMasterRow
                                                        key={index}
                                                        selected={user?.currentWorkshop?.email == row.email} r
                                                        row={row}
                                                        onView={() => changeWorkshop(row)}
                                                        onDisconnect={() => DisconnectWorkshop(row)} />
                                                );
                                            })) : <MasterItemEmpty isNotFound={true} />}

                            </List>
                        </Scrollbar>
                    </Box>
                    <Box sx={{ width: "100%", borderTop: (theme) => `solid 1px ${theme.palette.divider}` }}>
                        <TablePagination rowsPerPageOptions={[~~API_PAGE_LIMIT]} component="div" count={totalPage} page={page} onPageChange={handleChangePage} rowsPerPage={~~API_PAGE_LIMIT} showFirstButton showLastButton />
                    </Box>
                </Box>
            </Dialog>
            <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top">
                <MenuItem onClick={() => { setCreateWorkshop(true); popover.onClose() }}><GoogleMaterialIcon icon='add' />{t("new_workshop")}</MenuItem>
                <MenuItem onClick={() => { setConnectWorkshop(true); popover.onClose(); }}><GoogleMaterialIcon icon='link' />{t("connect_workshop")}</MenuItem>
            </CustomPopover>

            {connectWorkShop && <ConnectWorkshopDialog open={connectWorkShop} onClose={connectWorkShopClose} />}

            {createWorkShop && <CreateWorkshopDialog open={createWorkShop} onClose={createtWorkShopClose} />}
        </>
    );
}

function WorkshopMasterRow({ row, selected, onView, onDisconnect }) {
    const { media_url, name, email, current_workshop = '', address_line1, address_line2, selected_workshop = '' } = row;

    const popover = usePopover();
    const { t } = useTranslate()

    const [confirmation, setConfirmation] = useState({
        status: false,
        type: "",
    });
    async function confirmationClose(value) {
        if (value.confirmation) {
            if (confirmation.type == "DISCONNECT") {
                await onDisconnect();
            } else if (confirmation.type == "CHANGE_WORKSHOP") {
                await onView();
            }
        }
        setConfirmation({ status: value.status, type: "" });
    }


    return (
        <>
            <ListItem disablePadding>
                <ListItemButton selected={selected} onClick={() => !selected && setConfirmation({ status: true, type: "CHANGE_WORKSHOP", })}>
                    <ListItemIcon>
                        {selected
                            ? <Box sx={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", }}><GoogleMaterialIcon icon='check' /></Box>
                            : <Avatar alt={name} src={media_url}>{getFirstCharacter(name)}</Avatar>
                        }
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ typography: "subtitle2", color: name ? "text.primary" : "text.disabled", }}
                        secondaryTypographyProps={{ typography: "caption", color: 'text.secondary' }}
                        primary={name || t("workshop_name")}
                        secondary={
                            <Box component={'span'} display='flex' flexDirection={'column'}>
                                <Typography variant="caption"> {email}</Typography>
                                <Typography variant="caption" color={'text.disabled'} > {`${address_line1} ${address_line2}`}</Typography>
                            </Box>
                        }
                    />

                    {
                        (current_workshop != 'yes' && selected_workshop != 'yes') &&
                        <IconButton color={popover.open ? "inherit" : "default"} onClick={(e) => { e.stopPropagation(); popover.onOpen(e); }}>
                            <GoogleMaterialIcon icon='more_vert' />
                        </IconButton>
                    }
                </ListItemButton>
            </ListItem>

            <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top">
                <MenuItem onClick={(e) => { setConfirmation({ status: true, type: "DISCONNECT" }); popover.onClose(); }}>
                    <GoogleMaterialIcon icon='link_off' />{t("disconnect")}
                </MenuItem>
            </CustomPopover>

            {confirmation.status && (
                <ConfirmDialog
                    icon={confirmation.type == "DISCONNECT" ? <GoogleMaterialIcon icon='link_off' /> : <GoogleMaterialIcon icon='redo' />}
                    title={confirmation.type == "DISCONNECT" ? t("disconnect_workshop") : t("switch_to_workshop", { placeholder: name })}
                    description={confirmation.type == "DISCONNECT" ? t("disconnect_workshop_message") : t("switch_to_workshop_description", { placeholder: name })}
                    open={confirmation.status}
                    onClose={confirmationClose}
                />
            )}
        </>
    );
}