

"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, DialogActions, IconButton, InputAdornment, Skeleton, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import GoogleMaterialIcon from "components/google-icon";
import { RHFTextField } from "components/hook-form";
import FormProvider from "components/hook-form/form-provider";
import Scrollbar from "components/scrollbar";
import { WorkshopTypeAutocomplete } from "helper/autoComplete";
import useApi from "hooks/useApi";
import useDefaultValue from "hooks/useDefaultValue";
import { useTranslate } from "locales";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VEHICLE_CLASSIFICATION_TYPE } from "utils/constant";
import * as yup from "yup";


export default function AddVehicleClassificationType({ open, onClose, referenceData }) {
    const { t } = useTranslate();

    const { apiCalling, } = useApi();
    const [loading, setLoading] = useState(false);

    const defaultValues = {
        workshop_type: referenceData?.workshop_type || null,
        classification_type: referenceData?.classification_type || '',
    };
    const validationSchema = yup.object().shape({
        classification_type: yup.string().required(`${t("title")} ${t("is_required")}`),
        workshop_type: yup.object().required(`${t("workshop_type")} ${t("is_required")}`),
    });
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
    });
    const {
        watch,
        reset,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isDirty, },
    } = methods;

    const { defaultValue, loadingDefault } = useDefaultValue({ referenceData, workshop_type: "yes", })
    useEffect(() => {
        if (!referenceData) {
            setLoading(loadingDefault)
            setValue("workshop_type", defaultValue?.workshop_type || null);
        }
    }, [defaultValue])



    async function CreateItem(data) {
        try {
            await apiCalling({ url: VEHICLE_CLASSIFICATION_TYPE.create, data, method: 'post', });
            onClose({ status: false, update: true });
        } catch (error) {
            console.log(error);
        }
    }
    async function UpdateItem(data) {
        try {
            await apiCalling({ url: VEHICLE_CLASSIFICATION_TYPE.update + referenceData.vehicle_classification_type_id, data, method: 'put', })
            onClose({ status: false, update: true });
        } catch (error) {
            console.log(error);
        }
    }
    async function onSubmit(values) {
        const data = {
            classification_type: values.classification_type,
            workshop_type_id: values?.workshop_type?.workshop_type_id || '',
        };
        referenceData.vehicle_classification_type_id ? await UpdateItem(data) : await CreateItem(data);
    }

    function changeWorkshopType(workshopType) {
        setValue("workshop_type", workshopType, { shouldDirty: true });
    }

    return (
        <>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={() => onClose({ status: false, update: false })} sx={{ "& .MuiPaper-root": { width: "100%" } }}>
                <FormProvider methods={methods} autoComplete="off" onSubmit={(e) => { e.stopPropagation(); handleSubmit(onSubmit)(e) }}>
                    <Box display={"flex"} flexDirection={"column"} minHeight={0}>
                        <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider", }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography variant="h6">{!referenceData.department_id ? t("add_vehicle_classification_type") : t("edit_vehicle_classification_type")}</Typography>
                                <IconButton aria-label="close modal" onClick={() => onClose({ status: false, update: false, })}>
                                    <GoogleMaterialIcon icon={'close'} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Scrollbar sx={{ maxHeight: "calc(100vh - 240px)", p: 3 }}>
                            <Grid container spacing={2} rowSpacing={3}>
                                <Grid size={{ xs: 12 }} >
                                    {loading
                                        ? <Skeleton variant="text" sx={{ width: "100%", transform: "scale(1,1)", }} height={56} />
                                        : <WorkshopTypeAutocomplete changeItem={changeWorkshopType} />
                                    }
                                </Grid>
                                <Grid size={{ xs: 12 }} >
                                    {loading
                                        ? <Skeleton variant="text" sx={{ width: "100%", transform: "scale(1,1)", }} height={56} />
                                        : <RHFTextField name="classification_type" label={t("title_")} InputProps={{ startAdornment: (<InputAdornment position="start"><GoogleMaterialIcon icon={'title'} fontSize="small" /></InputAdornment>) }} />
                                    }
                                </Grid>
                            </Grid>
                        </Scrollbar>
                        <DialogActions sx={{ borderTop: "1px solid", borderColor: "divider", }}>
                            <Box display={"flex"} alignItems="center" gap={1} sx={{ width: "100%" }}>
                                <Button disabled={isSubmitting} fullWidth variant="text" onClick={() => onClose({ status: false, update: false, })}>
                                    {t("cancel")}
                                </Button>
                                <LoadingButton disabled={!isDirty} loading={isSubmitting} fullWidth type="submit" variant="contained" color="primary">
                                    {t("save")}
                                </LoadingButton>
                            </Box>
                        </DialogActions>
                    </Box>
                </FormProvider>
            </Dialog>
        </>
    );
}