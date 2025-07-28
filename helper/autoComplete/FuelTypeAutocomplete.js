import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from "@mui/system";
import GoogleMaterialIcon from "components/google-icon";
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { FuelTypeMaster } from "master";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { paper } from "theme/css";
import { FUEL_TYPE } from "utils/constant";


export default function FuelTypeAutocomplete({ label = '', isDisabled = false, changeItem, isRequired = true, sx = {} }) {
    const theme = useTheme();
    const { t } = useTranslate();
    const { getApiData } = useApi();
    const controller = new AbortController();
    const { signal } = controller;
    const [responseList, setResponseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const { control, setValue, watch } = useFormContext();
    async function GetList() {
        try {
            const resCountry = await getApiData(FUEL_TYPE.get, "", signal);
            const data = resCountry.data.result;
            setResponseList(data);
            setLoading(false);
        } catch (error) { }
    }
    useEffect(() => {
        if (!responseList.length && open) {
            GetList();
        }
        return () => {
            controller.abort();
        };
    }, [responseList.length, open]);
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
                name={"fuel_type"}
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
                        disableClearable={isRequired}
                        name="fuel_type"
                        label={label || t('fuel_type')}
                        options={responseList}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        getOptionLabel={(option) => option.title || ""}
                        isOptionEqualToValue={(option, value) => option.fuel_type_id === value.fuel_type_id}
                        renderOption={(props, option) => (
                            <li {...props} key={option.fuel_type_id} style={{ display: "flex", gap: 8 }}>
                                {option.title}
                            </li>
                        )}
                        onChange={(event, newValue) => {
                            changeItem(newValue);
                        }}
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
                                    <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 0.5,}}>
                                        <Button variant="text" startIcon={<GoogleMaterialIcon icon={'settings'} />} fullWidth color="primary" onClick={() => setVehicleTypeModal(true)}>
                                            <Typography variant="caption">{t("configure_item")}</Typography>
                                        </Button>
                                    </Box>
                                )}
                            </Paper>
                        )}
                        disabled={isDisabled}
                        sx={sx}
                    />
                )}
            />
            {vehicleTypeModal && <FuelTypeMaster open={vehicleTypeModal} onClose={vehicleTypeModalClose} />}
        </>
    );
}
