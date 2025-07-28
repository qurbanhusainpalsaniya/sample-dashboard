"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, DialogActions,  IconButton, InputAdornment, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import GoogleMaterialIcon from "components/google-icon";
import { RHFTextField } from "components/hook-form";
import FormProvider from "components/hook-form/form-provider";
import Scrollbar from "components/scrollbar";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { useForm } from "react-hook-form";
import { COLOR_MASTER } from "utils/constant";
import * as yup from "yup";


export default function AddColorModal({ open, onClose, referenceData = '' }) {
    const { t } = useTranslate();

    const { apiCalling } = useApi();

    const defaultValues = {
        title: referenceData?.title || "",
        value: referenceData?.value || "#000000",
    };
    const validationSchema = yup.object().shape({
        title: yup.string().required(`${t("title")} ${t("is_required")}`),
        value: yup.string().required(`${t("description")} ${t("is_required")}`),
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
        formState: { isSubmitting, isDirty, dirtyFields },
    } = methods;

    async function CreateItem(data) {
        try {
            await apiCalling({ url: COLOR_MASTER.create, data, method: 'post', });
            onClose({ status: false, update: true });
        } catch (error) {
            console.log(error);
        }
    }
    async function UpdateItem(data) {
        try {
            await apiCalling({ url: COLOR_MASTER.update + referenceData.color_id, data, method: 'put', })
            onClose({ status: false, update: true });
        } catch (error) {
            console.log(error);
        }
    }
    async function submit(values) {
        referenceData.color_id ? await UpdateItem(values) : await CreateItem(values);
    }



    return (
        <>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={() => onClose({ status: false, update: false })} sx={{ "& .MuiPaper-root": { width: "100%" } }}>
                <FormProvider methods={methods} autoComplete="off" onSubmit={(e) => { e.stopPropagation(); handleSubmit(submit)(e) }}>
                    <Box display={"flex"} flexDirection={"column"} minHeight={0}>
                        <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider", }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography variant="h6">{!referenceData.color_id ? `${t("add")} ${t('color')}` : `${t("edit")} ${t('color')}`}</Typography>
                                <IconButton aria-label="close modal" onClick={() => onClose({ status: false, update: false, })}>
                                    <GoogleMaterialIcon icon={'close'} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Scrollbar sx={{ maxHeight: "calc(100vh - 240px)", p: 3 }}>
                            <Grid container spacing={2} rowSpacing={3}>
                                <Grid  size={{xs:12}} >
                                    <RHFTextField
                                        name="title"
                                        label={t("title_")}
                                        InputProps={{ startAdornment: (<InputAdornment position="start"><GoogleMaterialIcon icon={'title'} fontSize="small" /></InputAdornment>), }}
                                    />
                                </Grid>
                                <Grid  size={{xs:12}} >
                                    <RHFTextField name="value" label={t("color")} type='color' />
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
