import { Box, LinearProgress, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from "@mui/system";
import { RHFAutocomplete } from "components/hook-form";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CUSTOMER_ADDRESS_API } from "utils/constant";


export default function CustomerAddressMasterAutocomplete({ name = 'supplier_address', customer = {}, label = '', isDisabled = false, changeItem, isRequired = true, sx = {} }) {
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
            const params = { customer_id: customer?.customer_id }
            const resCountry = await getApiData(CUSTOMER_ADDRESS_API.get, params, signal);
            const data = resCountry.data.result;
            setResponseList(data);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (open && !responseList.length) {
            GetList();
        }
        return () => {
            controller.abort();
        };
    }, [open, customer?.customer_id, responseList.length]);

    useEffect(() => {
        setResponseList([])
    }, [customer?.customer_id])

    // const [unitTypeModal, setUnitTypeModal] = useState(false);
    // function unitTypeModalClose(value) {
    //     if (value.update) {
    //         GetList();
    //     }
    //     setUnitTypeModal(false);
    // }
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
                        disableClearable={isRequired}
                        name={name}
                        label={label || t('select_an_address_')}
                        options={responseList}
                        loading={loading}
                        loadingText={<LinearProgress />}
                        getOptionLabel={(option) => `${option.address_line1 || ""} ${option.address_line2 || ""}` || ""}
                        isOptionEqualToValue={(option, value) => option.customer_address_id == value.customer_address_id}
                        renderOption={(props, option) => {
                            const FULL_ADDRESS = `${option?.address_line1}  ${option?.address_line2}`;
                            const SHOW_ADDRESS = [option?.city, option?.state_name, option?.country?.name, option?.zip_code].filter(Boolean).join(" • ");
                            return (
                                <li {...props} key={option.customer_address_id} style={{ display: "flex", gap: 8 }}>
                                    <Box display={'flex'} flexDirection='column'>
                                        <Typography variant="body2">{FULL_ADDRESS}</Typography>
                                        <Typography variant="caption" color={'text.secondary'}>{SHOW_ADDRESS}</Typography>
                                    </Box>
                                </li>
                            )
                        }}
                        onChange={(event, newValue) => {
                            changeItem(newValue);
                        }}
                        // PaperComponent={({ props, children }) => (
                        //     <Paper
                        //         onMouseDown={(event) => event.preventDefault()}
                        //         sx={{
                        //             ...paper({ theme, dropdown: true }),
                        //             borderRadius: 2,
                        //         }}
                        //     >
                        //         {children}
                        //         {!loading && (
                        //             <Box
                        //                 sx={{
                        //                     borderTop: "1px solid",
                        //                     borderColor: "divider",
                        //                     pt: 0.5,
                        //                 }}
                        //             >
                        //                 <Button variant="text" startIcon={<GoogleMaterialIcon icon={'settings'} />} fullWidth color="primary" onClick={() => setUnitTypeModal(true)}>
                        //                     {t("configure_item")}
                        //                 </Button>
                        //             </Box>
                        //         )}
                        //     </Paper>
                        // )}
                        disabled={isDisabled}
                        sx={sx}
                    />
                )}
            />
            {/* {unitTypeModal && <UnitTypeMaster open={unitTypeModal} onClose={unitTypeModalClose} />} */}
        </>
    );
}
