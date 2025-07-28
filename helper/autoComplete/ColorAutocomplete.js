import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from "@mui/system";
import GoogleMaterialIcon from "components/google-icon";
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { AddColorModal } from "master";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { API_PAGE_LIMIT, COLOR_MASTER } from "utils/constant";
import { paper } from "theme/css";

export default function ColorAutocomplete({ label = '', isDisabled = false, changeItem, isRequired = true, sx = {} }) {
    const { t } = useTranslate();
    const theme = useTheme();
    const { getApiData } = useApi();
    const controller = new AbortController();
    const { signal } = controller;
    const [responseList, setResponseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [loadMore, setLoadMore] = useState(true);
    const [searchWord, setSearchWord] = useState("");
    const [totalItem, setTotalItem] = useState(0);
    const { control, } = useFormContext();

    async function GetList() {
        try {
            const params = {
                take: API_PAGE_LIMIT,
                skip: currentPage,
                search_keyword: searchWord
            };
            const response = await getApiData(COLOR_MASTER.get, params, signal);
            setTotalItem(response.data.count);
            setLoadMore(response.data.result.length + currentPage * API_PAGE_LIMIT < response.data.count);
            setResponseList((prev) => [...prev, ...response.data.result.filter((item) => !prev.some((prevItem) => prevItem.color_id === item.color_id))]);
            setLoading(false);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (open) {
            GetList();
        }
        return () => {
            controller.abort();
        };
    }, [currentPage, open, searchWord]);

    useEffect(() => {
        setCurrentPage(0)
    }, [searchWord])


    const handleListboxScroll = (event) => {
        const listboxNode = event.currentTarget;
        if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight && loadMore && !loading && totalItem !== responseList.length) {
            setCurrentPage(currentPage + API_PAGE_LIMIT);
        }
    };

    const [openModal, setOpenModal] = useState(false);
    function openModalClose(value) {
        setOpenModal(false);
        if (value.update) {
            setResponseList([])
            GetList()
        }
    }
    return (
        <>
            <Controller
                name={"color"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <RHFAutocomplete
                        openOnFocus
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                            setSearchWord('')
                        }}
                        onClose={() => {
                            setOpen(false);
                            setSearchWord('')
                        }}
                        noOptionsText={<Button startIcon={<GoogleMaterialIcon icon={'add'} />} color='primary' onClick={() => setOpenModal(true)} >{t('color')}</Button>}
                        disableClearable={isRequired}
                        name="color"
                        label={label || t('color_')}
                        options={responseList.map((item) => item)}
                        filterOptions={(options) => options}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        getOptionLabel={(option) => option.title || ""}
                        isOptionEqualToValue={(option, value) => option.color_id === value.color_id}
                        renderOption={(props, option) => (
                            <li {...props} key={option.color_id} style={{ display: "flex", gap: 8 }}>
                                <Box display={'flex'} alignItems='center' gap={2}>
                                    <Box sx={{ height: 16, width: 16, bgcolor: option.value, borderRadius: 0.5 }} />
                                    <Typography variant="body2">  {option.title}</Typography>
                                </Box>
                            </li>
                        )}
                        ListboxProps={{ onScroll: handleListboxScroll }}
                        onChange={(event, newValue) => {
                            changeItem(newValue);
                        }}
                        onInputChange={(event, newValue, reason) => {
                            setSearchWord(newValue)
                        }}
                        disabled={isDisabled}
                        sx={sx}
                        PaperComponent={({ props, children }) => (
                            <Paper onMouseDown={(event) => event.preventDefault()}
                                sx={{
                                    ...paper({ theme, dropdown: true }),
                                    borderRadius: 2,
                                }}
                            >
                                {children}
                                {!loading && (
                                    <Box sx={{ borderTop: "1px solid",borderColor: "divider",pt: 0.5,}}>
                                        <Button variant="text" startIcon={<GoogleMaterialIcon icon={'settings'} />} fullWidth color="primary" onClick={() => setOpenModal(true)}>
                                            <Typography variant="caption">{t("configure_item")}</Typography>
                                        </Button>
                                    </Box>
                                )}
                            </Paper>
                        )}
                    />
                )}
            />
            {openModal && <AddColorModal open={openModal} onClose={openModalClose} />}
        </>
    );
}