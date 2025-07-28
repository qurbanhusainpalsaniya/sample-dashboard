import { LinearProgress } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { VEHICLE_MAKE_MODEL } from "utils/constant";


export default function EngineSizeAutocomplete({ }) {
    const { t } = useTranslate();
    const { getApiData } = useApi();
    const controller = new AbortController();
    const { signal } = controller;
    const [responseList, setResponseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const { control, setValue, watch } = useFormContext();
    async function GetList() {
        setLoading(false);
        try {
            const params = {
                workshop_type_id: watch("workshop_type")?.workshop_type_id,
                make: watch("make"),
                model: watch("model"),
                year: watch("year"),
                sub_model: watch("sub_model"),
            };
            const resCountry = await getApiData(VEHICLE_MAKE_MODEL.getAllEngineSize, params, signal);
            const data = resCountry.data.result;
            setResponseList(data.map((item) => item.engine_size));
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }
    useEffect(() => {
        if (watch("workshop_type") && watch("make") && watch("model") && watch("year") && watch("sub_model") && open && !responseList.length) {
            GetList();
        }
        return () => {
            controller.abort();
        };
    }, [watch("workshop_type"), watch("make"), watch("model"), watch("year"), watch("sub_model"), open, responseList.length]);
    return (
        <>
            <Controller
                name={"engine_size"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <RHFAutocomplete
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
                        name="engine_size"
                        label={t("engine_size")}
                        options={responseList}
                        getOptionLabel={(option) => option || ""}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        renderOption={(props, option) => (
                            <li {...props} key={option} style={{ display: "flex", gap: 8 }}>
                                {option}
                            </li>
                        )}
                        onInputChange={(event, newValue) => {
                            setValue("engine_size", newValue, {
                                shouldDirty: true,
                                shouldValidate: true,
                            });
                        }}
                    />
                )}
            />
        </>
    );
}
