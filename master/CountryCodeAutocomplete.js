import { LinearProgress, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";


import { COUNTRY_API } from "utils/constant";
CountryMasterAutocomplete.propTypes = {};

export default function CountryMasterAutocomplete({ name = 'country_id', isDisabled = false, changeCountry, sx = {} }) {
    const { t } = useTranslate();
    const controller = new AbortController();
    const { signal } = controller;
    const { apiCalling } = useApi();
    const [countryList, setCountryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function GetCountry() {
            try { 
                const resCountry = await apiCalling({ url: COUNTRY_API, method: 'get', showToast: false })
                setCountryList(resCountry.data.result);
                setLoading(false);
                if (resCountry.data.result.length > 0) {
                    setValue("country_id", resCountry.data.result[0]); // Set first country as default
                    changeCountry(resCountry.data.result[0]); // Trigger change handler with the default country
                }
            } catch (error) {
                console.error(error)
            }
        }
        if (open && !countryList.length) {
            GetCountry();
        }
        return () => {
            controller.abort();
        };
    }, [open, countryList.length]);

    const { control, watch } = useFormContext();
    return (
        <>
            <Controller
                name={name}
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
                        name={name}
                        label={t("country")}
                        options={countryList}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        getOptionLabel={(option) => option.emoji+ ' ' + option.phonecode || ""}
                        isOptionEqualToValue={(option, value) => option.country_id === value.country_id}
                        renderOption={(props, option) => (
                            <li {...props} key={option.country_id} style={{ display: "flex", gap: 8 }}>
                                <Typography key={option.country_id}> {option.emoji}</Typography>
                                {option.phonecode}
                            </li>
                        )}
                        onChange={(event, newValue) => {
                            changeCountry(newValue);
                        }}
                        disabled={isDisabled}
                        sx={sx}
                    />
                )}
            />
        </>
    );
}
