import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Dialog, DialogActions, IconButton, Typography } from "@mui/material/";
import Grid from '@mui/material/Grid2';
import GoogleMaterialIcon from "components/google-icon";
import { RHFTextField } from "components/hook-form";
import FormProvider from "components/hook-form/form-provider";
import { useTranslate } from "locales";
import { useForm } from "react-hook-form";
import * as yup from "yup";


export default function AddReferralSourceModal({ title, labelTitle, data, onClose, open, multiline = false, isRequire = true, type = 'text' }) {
    const { t } = useTranslate();

    const defaultValues = {
        name: data ? data : "",
    };
    const validationSchema = yup.object({
        name: isRequire && yup.string().required(`${labelTitle} ${t("is_required")}`),
    });
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
    });
    const {
        handleSubmit,
        formState: { isSubmitting, isDirty, dirtyFields },
    } = methods;
    async function submit(values) {
        await onClose({ data: values.name, status: false, update: true });
    }
    return (
        <>
            <Dialog scroll="body" fullWidth maxWidth="sm" open={open} onClose={() => onClose({ status: false, data: "", update: false })}>
                <FormProvider methods={methods} autoComplete="off" onSubmit={(e) => { e.stopPropagation(); handleSubmit(submit)(e) }}>
                    <Box display={'flex'} flexDirection='column' sx={{ bgcolor: 'background.dialog' }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 2, }}>
                            <Typography variant={"h6"}>{title} </Typography>
                            <IconButton aria-label="close modal" onClick={() => onClose({ status: false, data: "", update: false })}>
                                <GoogleMaterialIcon icon={'close'} />
                            </IconButton>
                        </Box>
                        <Grid container spacing={2} rowSpacing={3} sx={{ p: 2 }}>
                            <Grid size={{ xs: 12 }} >
                                <RHFTextField
                                    type={type}
                                    multiline={multiline}
                                    minRows={3}
                                    name="name"
                                    label={labelTitle}
                                />
                            </Grid>
                        </Grid>

                        <DialogActions>
                            <Box display={"flex"} alignItems="center" gap={1} justifyContent="flex-end">
                                <Button disabled={isSubmitting} variant="outlined" onClick={() => onClose({ status: false, data: '', update: false })} sx={{ minWidth: 100 }}>
                                    {t("cancel")}
                                </Button>
                                <LoadingButton disabled={!isDirty} loading={isSubmitting} type="submit" variant="contained" color="primary" sx={{ minWidth: 100 }}>
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
