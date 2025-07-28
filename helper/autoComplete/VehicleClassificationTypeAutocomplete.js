import { Box, Button, Chip, LinearProgress, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from "@mui/system";
import GoogleMaterialIcon from "components/google-icon";
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { VehicleClassificationTypeMaster } from "master";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { paper } from "theme/css";
import { API_PAGE_LIMIT, VEHICLE_CLASSIFICATION_TYPE } from "utils/constant";

export default function VehicleClassificationTypeAutocomplete({ label = '', isDisabled = false, changeItem, isRequired = true, multiple = false, sx = {} }) {
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

    const { control, setValue, watch } = useFormContext();
    async function GetList() {
        try {
            setLoading(true)
            const params = { take: API_PAGE_LIMIT, skip: currentPage, };
            const response = await getApiData(VEHICLE_CLASSIFICATION_TYPE.get, params, signal);
            const data = response.data.result;
            setLoadMore(data.length == API_PAGE_LIMIT)
            setResponseList(responseList => [...responseList, ...data]);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (open && loadMore) {
            GetList();
        }
        return () => {
            controller.abort();
        };
    }, [currentPage, open]);


    const [vehicleTypeModal, setVehicleTypeModal] = useState(false);
    function vehicleTypeModalClose(value) {
        if (value.update) {
            GetList();
        }
        setVehicleTypeModal(false);
    }

    return (
        <>
            <Controller
                name={"vehicle_classification_type"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <RHFAutocomplete
                        multiple={multiple}
                        limitTags={2}
                        openOnFocus
                        open={open}
                        onOpen={() => { setOpen(true) }}
                        onClose={() => { setOpen(false) }}
                        disableClearable={isRequired}
                        name="vehicle_classification_type"
                        label={label || t('type_')}
                        options={responseList}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        getOptionLabel={(option) => option.classification_type || ""}
                        isOptionEqualToValue={(option, value) => option.vehicle_classification_type_id === value.vehicle_classification_type_id}
                        renderOption={(props, option) => (
                            <li {...props} key={option.vehicle_classification_type_id} style={{ display: "flex", gap: 8 }}>
                                {option.classification_type}
                            </li>
                        )}
                        onChange={(event, newValue) => {
                            changeItem(newValue);
                        }}
                        ListboxProps={{
                            onScroll: (event) => {
                                const listboxNode = event.currentTarget;
                                if ((listboxNode.scrollTop + listboxNode.clientHeight) == listboxNode.scrollHeight && loadMore && !loading) {
                                    setCurrentPage(currentPage + API_PAGE_LIMIT);
                                }
                            }
                        }}

                        PaperComponent={({ props, children }) => (
                            <Paper
                                onMouseDown={(event) => event.preventDefault()}
                                sx={{ ...paper({ theme, dropdown: true }), borderRadius: 2 }}
                            >
                                {children}
                                <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 0.5, }}>
                                    <Button variant="text" startIcon={<GoogleMaterialIcon icon={'settings'} />} fullWidth color="primary" onClick={() => setVehicleTypeModal(true)}>
                                        <Typography variant="caption">{t("configure_item")}</Typography>
                                    </Button>
                                </Box>
                            </Paper>
                        )}
                        disabled={isDisabled}
                        renderTags={(selected, getTagProps) =>
                            selected.map((option, index) => (
                                <Chip
                                    {...getTagProps({ index })}
                                    key={option.vehicle_classification_type_id}
                                    label={option.classification_type}
                                    size="small"
                                    color="info"
                                    variant="soft"
                                />
                            ))
                        }
                        sx={sx}
                    />
                )}
            />
            {vehicleTypeModal && <VehicleClassificationTypeMaster open={vehicleTypeModal} onClose={vehicleTypeModalClose} />}
        </>
    );
}
