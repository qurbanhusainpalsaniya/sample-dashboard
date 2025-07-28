import { LinearProgress } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TIMEZONE_API } from "utils/constant";

export default function TimezoneAutocomplete({ isDisabled = false, changeTimezone }) {
    const { control } = useFormContext();
    const { t } = useTranslate();
    
    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData } = useApi();
    const [responseList, setResponseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function GetTimezone() {
            try {
                setLoading(true);
                const response = await getApiData(TIMEZONE_API, "", signal);
                setResponseList(response.data.result);
                setLoading(false);
            } catch (error) {}
        }
        if (open && !responseList.length) {
            GetTimezone();
        }
        return () => {
            controller.abort();
        };
    }, [open, responseList.length]);

    return (
        <>
            <Controller
                name={"timezone"}
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
                        name="timezone"
                        label={t("timezone_")}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        options={responseList.map((item) => item.timezone)}
                        getOptionLabel={(option) => option}
                        renderOption={(props, option) => (
                            <li {...props} key={option}>
                                {option}
                            </li>
                        )}
                        onChange={(event, newValue) => {
                            changeTimezone(newValue);
                        }}
                        disabled={isDisabled}
                    />
                )}
            />
        </>
    );
}
