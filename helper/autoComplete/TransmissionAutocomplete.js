import { Box, Button, Chip, LinearProgress, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from "@mui/system";
import GoogleMaterialIcon from "components/google-icon";
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import TransmissionTypeMaster from "master/TransmissionTypeMaster";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { paper } from "theme/css";
import { TRANSMISSION_TYPE } from "utils/constant";


export default function TransmissionAutocomplete({ label = '', isDisabled = false, changeItem, multiple = false, isRequired = true, sx = {} }) {
    const { t } = useTranslate();

    const theme = useTheme();
    const { getApiData } = useApi();
    const controller = new AbortController();
    const { signal } = controller;
    const [responseList, setResponseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const { control, setValue, watch } = useFormContext();
    async function GetList() {
        try {
            const resCountry = await getApiData(TRANSMISSION_TYPE.get, "", signal);
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
                name={"transmission"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <RHFAutocomplete
                        multiple={multiple}
                        limitTags={2}
                        openOnFocus
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        disableClearable={isRequired}
                        name="transmission"
                        label={label || t('transmission_')}
                        options={responseList}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        getOptionLabel={(option) => option.title || ""}
                        isOptionEqualToValue={(option, value) => option.transmission_type_id === value.transmission_type_id}
                        renderOption={(props, option) => (
                            <li {...props} key={option.transmission_type_id} style={{ display: "flex", gap: 8 }}>
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
                                    <Box
                                        sx={{
                                            borderTop: "1px solid",
                                            borderColor: "divider",
                                            pt: 0.5,
                                        }}
                                    >
                                        <Button variant="text" startIcon={<GoogleMaterialIcon icon={'settings'} />} fullWidth color="primary" onClick={() => setVehicleTypeModal(true)}>
                                            <Typography variant="caption">{t("configure_item")}</Typography>
                                        </Button>
                                    </Box>
                                )}
                            </Paper>
                        )}
                        disabled={isDisabled}
                        renderTags={(selected, getTagProps) =>
                            selected.map((option, index) => (
                                <Chip
                                    {...getTagProps({ index })}
                                    key={option.transmission_type_id}
                                    label={option.title}
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
            {vehicleTypeModal && <TransmissionTypeMaster open={vehicleTypeModal} onClose={vehicleTypeModalClose} />}
        </>
    );
}
