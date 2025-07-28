import { Box, Button, LinearProgress, Paper } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from "@mui/system";
import GoogleMaterialIcon from "components/google-icon";
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { WorkshopTypeMaster } from "master";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { paper } from "theme/css";
import { WORKSHOP_TYPE } from "utils/constant";

export default function WorkshopTypeAutocomplete({ isDisabled = false, changeItem, label = '', sx = {} }) {
    const { t } = useTranslate();
    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData } = useApi();
    const theme = useTheme();
    const [responseList, setResponseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    async function GetList() {
        try {
            const resWorkshopType = await getApiData(WORKSHOP_TYPE.get, "", signal);
            setResponseList(resWorkshopType.data.result);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (open && !responseList.length) {
            GetList();
        }
        return () => {
            controller.abort();
        };
    }, [open, responseList.length]);

    const { control } = useFormContext();
    const [openModal, setOpenModal] = useState(false);
    function openModalClose(value) {
        value.update && GetList();
        value.data && changeItem(value.data)
        setOpenModal(false);
    }

    return (
        <>
            <Controller
                name={"workshop_type"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <RHFAutocomplete
                        openOnFocus
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        disableClearable
                        name="workshop_type"
                        label={label || t('shop_type_')}
                        options={responseList}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        getOptionLabel={(option) => option.title || ""}
                        isOptionEqualToValue={(option, value) => option.workshop_type_id === value.workshop_type_id}
                        renderOption={(props, option) => (
                            <li {...props} key={option.workshop_type_id} style={{ display: "flex", gap: 8 }}>
                                {option.title}
                            </li>
                        )}
                        onChange={(event, newValue) => {
                            changeItem(newValue);
                        }}
                        disabled={isDisabled}
                        PaperComponent={({ props, children }) => (
                            <Paper
                                onMouseDown={(event) => event.preventDefault()}
                                sx={{
                                    ...paper({ theme, dropdown: true }),
                                    borderRadius: 2,
                                }}
                            >
                                {children}
                                {!loading && (
                                    <Box
                                        sx={{
                                            borderTop: "1px solid",
                                            borderColor: "divider",
                                            pt: 0.5,
                                        }}
                                    >
                                        <Button variant="text" startIcon={<GoogleMaterialIcon icon={'settings'} />} fullWidth color="primary" onClick={() => setOpenModal(true)}>
                                            {t("configure_item")}
                                        </Button>
                                    </Box>
                                )}
                            </Paper>
                        )}

                        sx={sx}
                    />
                )}
            />
            {openModal && <WorkshopTypeMaster open={openModal} onClose={openModalClose} NeedtoSelect />}
        </>
    );
}
