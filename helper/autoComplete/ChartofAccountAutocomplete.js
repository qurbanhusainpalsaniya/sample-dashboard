import { Box, LinearProgress, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CHART_OF_ACCOUNT_API } from "utils/constant";

export default function ChartofAccountAutocomplete({ name, label = '', isDisabled = false, changeChartofAccount, filter = [], isFrom = null, hiddenLabel = false, variant, isRequired = true, sx = {}, ...other }) {
    const { t } = useTranslate();
    const { control } = useFormContext();
    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData } = useApi();
    const [responseList, setResponseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        async function GetChartofAccount() {
            try {
                setLoading(true);
                const params = { account_type: filter, isFrom }
                const result = await getApiData(CHART_OF_ACCOUNT_API.list, params, signal);
                setResponseList(result.data.result?.chart_of_accounts_list
                    .sort((a, b) => a.account_name.localeCompare(b.account_name))
                    .sort((a, b) => a.chart_of_account_type?.account_type.localeCompare(b.chart_of_account_type?.account_type))
                    || []);
                setLoading(false);
            } catch (error) {
                console.error(error)
            }
        }
        if (open && !responseList.length) {
            GetChartofAccount();
        }
        return () => {
            controller.abort();
        };
    }, [open, responseList.length,]);

    






    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <RHFAutocomplete
                        variant={variant}
                        openOnFocus
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        disableClearable={isRequired}
                        name={name}
                        label={!hiddenLabel ? label || t('chart_of_account_') : ""}
                        groupBy={(option) => option?.chart_of_account_type?.account_type} // Convert to uppercase
                        // options={filter.length > 0 ? responseList.filter((item) => filter.includes(item?.chart_of_account_type?.account_type)) : responseList}
                        options={responseList}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        getOptionLabel={(option) => option.account_name || ""}
                        isOptionEqualToValue={(option, value) => option.chart_of_account_id == value.chart_of_account_id}
                        renderOption={(props, option) => (
                            <li {...props} key={option.chart_of_account_id}>
                                <Box display='flex' alignItems={'center'} justifyContent='space-between' flex={1} gap={1}>
                                    <Typography variant="body2"> {option.account_name}</Typography>
                                    {/* <Typography variant="caption" color={'text.secondary'} fontStyle="italic" textAlign={'right'}>{option.chart_of_account_type?.account_type}</Typography> */}
                                </Box>
                            </li>
                        )}
                        onChange={(event, newValue) => {
                            changeChartofAccount(newValue);
                        }}
                        disabled={isDisabled}
                        {...other}
                        sx={sx}
                    />
                )}
            />
        </>
    );
}
