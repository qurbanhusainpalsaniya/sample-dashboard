import { LinearProgress } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { STATE_API } from "utils/constant";

export default function StateMasterAutocomplete({ name = 'state_name', isDisabled = false, changeItem, currentCountry, sx = {} }) {
    const { control, } = useFormContext();
    const { t } = useTranslate();


    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData } = useApi();
    const [responseList, setResponseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setResponseList([]);
    }, [currentCountry]);

    useEffect(() => {
        async function GetStatelist() {
            try {
                setLoading(true);
                const params = { country_id: currentCountry?.country_id };
                const resCountry = await getApiData(STATE_API, params, signal);
                setResponseList(resCountry.data.result);
                setLoading(false);
            } catch (error) { }
        }
        if (open && !responseList.length) {
            GetStatelist();
        }
        return () => {
            controller.abort();
        };
    }, [open, currentCountry, responseList.length]);

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
                        label={t("state_")}
                        options={responseList}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        getOptionLabel={(option) => option.name || ""}
                        isOptionEqualToValue={(option, value) => (option.state_id === value.state_id || option.name == value.name)}
                        renderOption={(props, option) => (
                            <li {...props} key={option.state_id}>
                                {option.name}
                            </li>
                        )}
                        onChange={(event, newValue) => {
                            changeItem(newValue);
                        }}
                        disabled={isDisabled}
                        sx={sx}
                    />
                )}
            />
        </>
    );
}
