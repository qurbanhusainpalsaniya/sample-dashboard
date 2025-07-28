import { Chip, LinearProgress } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { VEHICLE_MAKE_MODEL } from "utils/constant";

export default function MakeAutocomplete({ changeItem, multiple = false, label = '', sx = {} }) {
    const { t } = useTranslate();
    const { getApiData } = useApi();
    const controller = new AbortController();
    const { signal } = controller;
    const [responseList, setResponseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { control, setValue, watch } = useFormContext();
    async function GetList() {
        setLoading(true);
        try {
            const params = {
                workshop_type_id: watch("workshop_type")?.workshop_type_id,
            };
            const resCountry = await getApiData(VEHICLE_MAKE_MODEL.getMake, params, signal);
            const data = resCountry.data.result;
            setResponseList(data.map((item) => item.make));
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }
    useEffect(() => {
        if (watch("workshop_type") && open) {
            GetList();
        }
        return () => {
            controller.abort();
        };
    }, [watch("workshop_type"), open,]);
    return (
        <>
            <Controller
                name={"make"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <RHFAutocomplete
                        multiple={multiple}
                        limitTags={2}
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
                        name="make"
                        label={label || t('make_')}
                        options={responseList}
                        getOptionLabel={(option) => option}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        renderOption={(props, option) => (
                            <li {...props} key={option} style={{ display: "flex", gap: 8 }}>
                                {option}
                            </li>
                        )}
                        onInputChange={(event, newValue) => { changeItem(newValue); }}
                        renderTags={(selected, getTagProps) =>
                            selected.map((option, index) => (
                                <Chip
                                    {...getTagProps({ index })}
                                    key={option}
                                    label={option}
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
        </>
    );
}
