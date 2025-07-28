import { LinearProgress } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { VEHICLE_MAKE_MODEL } from "utils/constant";
export default function YearAutocomplete({ changeItem, label = '', sx = {} }) {
    const { t } = useTranslate();

    const { getApiData } = useApi();
    const controller = new AbortController();
    const { signal } = controller;
    const [responseList, setResponseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { control, setValue, watch } = useFormContext();
    useEffect(() => {
        async function GetList() {
            setLoading(true);
            try {
                const params = {
                    workshop_type_id: watch("workshop_type")?.workshop_type_id,
                    make: watch("make"),
                    model: watch("model"),
                };
                const resCountry = await getApiData(VEHICLE_MAKE_MODEL.getYear, params, signal);
                const data = resCountry.data.result;
                setResponseList(data.map((item) => item.year));
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
        if (watch("workshop_type") && watch("make") && watch("model") && open && !responseList.length) {
            GetList();
        }
        return () => {
            controller.abort();
        };
    }, [watch("workshop_type"), watch("make"), watch("model"), open, responseList.length]);

    useEffect(() => {
        setResponseList([])
    }, [watch('workshop_type'), watch('make'), watch("model")])

    return (
        <>
            <Controller
                name={"year"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <RHFAutocomplete
                        type='number'
                        freeSolo
                        openOnFocus
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        disableClearable
                        name="year"
                        label={label || t('year_')}
                        options={responseList}
                        getOptionLabel={(option) => option || ""}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        renderOption={(props, option) => (
                            <li {...props} key={option} style={{ display: "flex", gap: 8 }}>
                                {option}
                            </li>
                        )}
                        onInputChange={(event, newValue) => { changeItem(newValue); }}
                        sx={sx}
                    />
                )}
            />
        </>
    );
}
