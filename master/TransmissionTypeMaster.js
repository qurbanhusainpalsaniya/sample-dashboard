import { Box, Button, Dialog, IconButton, List, ListItem, ListItemButton, ListItemText, MenuItem, TablePagination, Typography } from "@mui/material/";
import { useAuthContext } from "auth/hooks";
import { SearchBar } from "components/custom";
import { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import Scrollbar from "components/scrollbar";
import useApi from "hooks/useApi";
import useConfirmation from "hooks/useConfirmation";
import { useTranslate } from "locales";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { API_PAGE_LIMIT, SMALL_MODAL, TRANSMISSION_TYPE } from "utils/constant";

const AddReferralSourceModal = dynamic(() => import("./AddReferralSourceModal"));
const ConfirmDialog = dynamic(() => import("./ConfirmDialog"));
const MasterItemEmpty = dynamic(() => import("components/skeleton/MasterItemEmpty"));
const MasterItemSkeleton = dynamic(() => import("components/skeleton/MasterItemSkeleton"));
const CustomPopover = dynamic(() => import("components/custom-popover/custom-popover"));

export default function TransmissionTypeMaster({ open, onClose, NeedtoSelect = false, selectedItem = [] }) {
    const { t } = useTranslate()

    const { getApiData, apiCalling, } = useApi();
    const controller = new AbortController();
    const { signal } = controller;
    const [curentPage, setCurentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [responseList, setResponseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState("");
    const { user } = useAuthContext();
    async function GetList() {
        try {
            setLoading(true);
            const params = {
                take: API_PAGE_LIMIT,
                skip: curentPage,
                search_keyword: search,
            };
            const response = await getApiData(TRANSMISSION_TYPE.get, params, signal);
            setTotalPage(~~response.data.count);
            setResponseList(response.data.result);
            setLoading(false);
        } catch (error) {
            console.error(error);
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
    const handleChangePage = (event, newPage) => {
        setPage(~~newPage);
        setCurentPage(~~newPage * ~~API_PAGE_LIMIT);
    };
    async function AddItem(data) {
        try {
            const response = await apiCalling({ url: TRANSMISSION_TYPE.create, data, method: 'post', });
            setResponseList(responseList => [...responseList, response.data.result]);
            setUpdate(true);
        } catch (error) {
            console.error(error);
        }
    }
    async function UpdateItem(data) {
        try {

            const response = await apiCalling({ url: TRANSMISSION_TYPE.update + addModal.data?.transmission_type_id, data, method: 'put', })
            setResponseList(responseList.map(item => item.transmission_type_id === addModal.data?.transmission_type_id ? response.data.result : item));
            setUpdate(true);
        } catch (error) {
            console.error(error);
        }
    }
    async function deleteItem(data) {
        try {
            await apiCalling({ url: TRANSMISSION_TYPE.delete + data?.transmission_type_id, method: 'delete', });
            setResponseList(responseList.filter(item => item.transmission_type_id != data?.transmission_type_id));
            setUpdate(true);
        } catch (error) {
            console.error(error);
        }
    }
    const [addModal, setAddModal] = useState({ status: false, data: "" });
    async function addModalClose(value) {
        if (value.data) {
            addModal.data ? await UpdateItem({ title: value.data }) : await AddItem({ title: value.data });
        }
        setAddModal({ status: false, data: "" });
    }
    return (
        <>
            <Dialog
                fullWidth
                maxWidth={SMALL_MODAL}
                open={open}
                onClose={() => onClose({ status: false, data: "", update: update })}
                sx={{ "& .MuiPaper-root": { width: "100%", height: { xs: "90%", md: "100%" }, }, }}
            >
                <Box display={"flex"} flexDirection={"column"} minHeight={0} flex={1}>
                    <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider", }}>
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} pb={1}>
                            <Typography variant={"h6"} textTransform='capitalize'>{t("transmission_type")} </Typography>
                            <Box columnGap={2} display={"flex"} alignItems="center">
                                <Button color="primary" variant="contained" startIcon={<GoogleMaterialIcon icon='add' />} onClick={() => setAddModal({ status: true, data: "" })}>
                                    {t("add")}
                                </Button>
                                <IconButton aria-label="close modal" onClick={() => onClose({ status: false, data: "", update: update, })}>
                                    <GoogleMaterialIcon icon='close' />
                                </IconButton>
                            </Box>
                        </Box>
                        <SearchBar searchWord={search} setSearchWord={setSearch} fullWidth />

                    </Box>
                    <Box sx={{ overflow: "hidden", flex: 1 }}>
                        <Scrollbar>
                            <List sx={{ py: 0 }}>
                                {loading ? (
                                    <MasterItemSkeleton />
                                ) : responseList.length > 0 ? (
                                    responseList.map((row, index) => (
                                        <TransmissionTypeMasterRow
                                            key={index}
                                            selected={selectedItem?.includes(row.transmission_type_id)}
                                            selectedItem={selectedItem}
                                            row={row}
                                            onEdit={() => setAddModal({ status: true, data: row, })}
                                            onDelete={() => deleteItem(row)}
                                            onView={() => NeedtoSelect && onClose({ status: false, data: row, })
                                            }
                                        />
                                    ))
                                ) : (
                                    <MasterItemEmpty isNotFound={true} />
                                )}
                            </List>
                        </Scrollbar>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                        }}
                    >
                        <TablePagination rowsPerPageOptions={[~~API_PAGE_LIMIT]} component="div" count={totalPage} page={page} onPageChange={handleChangePage} rowsPerPage={~~API_PAGE_LIMIT} showFirstButton showLastButton />
                    </Box>
                </Box>
            </Dialog>
            {addModal.status &&
                <AddReferralSourceModal
                    title={addModal.data ? t("edit") : t("add")}
                    labelTitle={t("title_")}
                    data={addModal.data?.title}
                    open={addModal.status}
                    onClose={addModalClose} />
            }
        </>
    );
}


function TransmissionTypeMasterRow({ row, selected, onDelete, onView, onEdit, }) {
    const { title } = row;
    const { t } = useTranslate()
    const popover = usePopover();

    const [confirmation, setConfirmation, confirmationClose] = useConfirmation(onDelete);
    return (
        <>
            <ListItem disablePadding>
                <ListItemButton selected={selected} onClick={onView}>
                    {selected && <GoogleMaterialIcon icon='check' color="primary" sx={{ mr: 1 }} />}
                    <ListItemText
                        primaryTypographyProps={{ typography: "body2", mb: 0.25, }}
                        secondaryTypographyProps={{ typography: "caption" }}
                        primary={title}
                    />
                    <IconButton color={popover.open ? "inherit" : "default"} onClick={(e) => { e.stopPropagation(); popover.onOpen(e); }}>
                        <GoogleMaterialIcon icon='more_vert' />
                    </IconButton>
                </ListItemButton>
            </ListItem>
            <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top">
                <MenuItem onClick={() => { onEdit(); popover.onClose(); }}><GoogleMaterialIcon icon='edit' />{t("edit")}</MenuItem>
                <MenuItem onClick={() => { setConfirmation(true); popover.onClose(); }} sx={{ color: 'error.main' }}><GoogleMaterialIcon icon='delete' />{t("delete")}</MenuItem>
            </CustomPopover>

            {confirmation &&
                <ConfirmDialog title={`${t("delete")}`}
                    description={t("msg_remove_from_order", { placeholder: title, placeholder2: t('transmission_type') })}
                    open={confirmation}
                    onClose={confirmationClose}
                />
            }
        </>
    );
}
