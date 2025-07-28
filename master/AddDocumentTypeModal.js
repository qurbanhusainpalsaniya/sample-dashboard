"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, DialogActions, Divider, IconButton, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useAuthContext } from "auth/hooks";
import GoogleMaterialIcon from "components/google-icon";
import { RHFCheckbox, RHFSwitch, RHFTextField } from "components/hook-form";
import FormProvider from "components/hook-form/form-provider";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { useForm } from "react-hook-form";
import { DOCUMENT_TYPE_API } from "utils/constant";
import * as yup from "yup";


export default function AddDocumentTypeModal({ open, onClose, referenceData }) {
    const { t } = useTranslate();
    const { apiCalling } = useApi();
    const { user } = useAuthContext()

    let maxAttachmentQty = user?.currentWorkshop?.media_upload_max_file_qty || 5


    const defaultValues = {
        title: referenceData?.title || "",
        enter_number: referenceData?.enter_number == 'yes' ? true : false,
        document_number_min_length: referenceData?.document_number_min_length ?? null,
        document_number_max_length: referenceData?.document_number_max_length ?? null,
        document_number_is_mandatory: referenceData?.document_number_is_mandatory == 'yes' || false,
        has_expiry: referenceData?.has_expiry == 'yes' ? true : false,
        expiry_date_is_mandatory: referenceData?.expiry_date_is_mandatory == 'yes' ? true : false,
        has_attachment: referenceData?.has_attachment == 'yes' ? true : false,
        document_attachment_min_qty: referenceData?.document_attachment_min_qty ?? null,
        document_attachment_max_qty: referenceData?.document_attachment_max_qty ?? null,
    };


    const validationSchema = yup.object().shape({
        title: yup.string().required(`${t("document_name")} ${t("is_required")}`),
        document_number_min_length: yup.number().when("enter_number", {
            is: true,
            then: () => yup.number()
                .required(`${t("min_characters")} ${t("is_required")}`)
                .typeError(`${t("min_characters")} ${t("is_required")}`)
                .min(1, `${t("min_characters")} ${t("is_required")}`),
            otherwise: () => yup.number().notRequired()
        }),
        document_number_max_length: yup.number().when("enter_number", {
            is: true,
            then: () => yup.number()
                .required(`${t("max_characters")} ${t("is_required")}`)
                .typeError(`${t("max_characters")} ${t("is_required")}`)
                .min(1, `${t("max_characters")} ${t("is_required")}`),
            otherwise: () => yup.number().notRequired()
        }),
        document_attachment_min_qty: yup.number().when("has_attachment", {
            is: true,
            then: () => yup.number()
                .required(`${t("min_files")} ${t("is_required")}`)
                .typeError(`${t("min_files")} ${t("is_required")}`)
                .min(1, `${t("min_files")} ${t("is_required")}`),
            otherwise: () => yup.number().notRequired()
        }),
        document_attachment_max_qty: yup.number().when("has_attachment", {
            is: true,
            then: () => yup.number()
                .required(`${t("max_files")} ${t("is_required")}`)
                .typeError(`${t("max_files")} ${t("is_required")}`)
                .min(yup.ref('document_attachment_min_qty'), `${t("max_files_must_be_greater_than_min_files")}`)
                .max(maxAttachmentQty, t("max_files_is", { placeholder: maxAttachmentQty })),
            otherwise: () => yup.number().notRequired()
        }),
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
        formState: { isSubmitting, isDirty, dirtyFields, errors },
    } = methods;



    async function CreateItem(data) {
        try {
            await apiCalling({ url: DOCUMENT_TYPE_API.create, data, method: 'post', });
            onClose({ status: false, update: true });
        } catch (error) {
            console.log(error);
        }
    }
    async function UpdateItem(data) {
        try {
            await apiCalling({ url: DOCUMENT_TYPE_API.update + referenceData.document_type_id, data, method: 'put', })
            onClose({ status: false, update: true });
        } catch (error) {
            console.log(error);
        }
    }

    function updateYesNo(value) {
        return value ? 'yes' : "no"
    }

    async function onSubmit(values) {
        const data = {
            title: values.title,
            enter_number: updateYesNo(values.enter_number),
            document_number_min_length: values?.document_number_min_length ? Number(values?.document_number_min_length) : '',
            document_number_max_length: values?.document_number_max_length ? Number(values?.document_number_max_length) : '',
            document_number_is_mandatory: updateYesNo(values.document_number_is_mandatory),
            has_expiry: updateYesNo(values.has_expiry),
            expiry_date_is_mandatory: updateYesNo(values.expiry_date_is_mandatory),
            has_attachment: updateYesNo(values.has_attachment),
            document_attachment_min_qty: values?.document_attachment_min_qty ? Number(values?.document_attachment_min_qty) : '',
            document_attachment_max_qty: values?.document_attachment_max_qty ? Number(values?.document_attachment_max_qty) : '',
        };
        referenceData?.document_type_id ? await UpdateItem(data) : await CreateItem(data);
    }

    const requireFeildCss = {
        '& .MuiInputBase-root': { bgcolor: "background.paper" }
    }

    return (
        <>
            <Dialog scroll="body" fullWidth maxWidth="sm" open={open} onClose={() => onClose({ status: false, update: false })} sx={{ "& .MuiPaper-root": { width: "100%" } }}>
                <FormProvider methods={methods} autoComplete="off" onSubmit={(e) => { e.stopPropagation(); handleSubmit(onSubmit)(e) }}>
                    <Box display={"flex"} flexDirection={"column"} minHeight={0} sx={{ bgcolor: 'background.dialog' }}>
                        <Box sx={{ p: 2, pb: 0 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography variant="h6">{!referenceData?.document_type_id ? t("add_document_type") : t("edit_document_type")}</Typography>
                                <IconButton aria-label="close modal" onClick={() => onClose({ status: false, update: false, })}>
                                    <GoogleMaterialIcon icon={'close'} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={{ p: 2, pt: 3 }}>
                            <Grid container spacing={2} rowSpacing={2} alignItems='center'>
                                <Grid size={{ xs: 6 }} >
                                    <RHFTextField
                                        sx={{ ...requireFeildCss }}
                                        name="title"
                                        label={`${t("document_name")} *`}
                                    />
                                </Grid>
                                <Grid size={{ xs: 6 }} />
                                <Grid size={{ xs: 12 }}  ><Divider /></Grid>
                                <Grid size={{ xs: 12 }} >
                                    <RHFSwitch
                                        name="enter_number"
                                        label={t("has_document_number")}
                                        labelPlacement="start"
                                        sx={{ mx: 0, justifyContent: "space-between", }}
                                    />
                                </Grid>

                                {watch('enter_number') &&
                                    <>
                                        <Grid size={{ xs: 3 }} >
                                            <RHFTextField
                                                sx={{ ...requireFeildCss }}
                                                type={'number'}
                                                name="document_number_min_length"
                                                label={`${t("min_characters")} *`}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 3 }} >
                                            <RHFTextField
                                                sx={{ ...requireFeildCss }}
                                                type={'number'}
                                                name="document_number_max_length"
                                                label={`${t("max_characters")} *`}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 6 }} >
                                            <Typography variant="caption" display={'flex'} color={'text.secondary'} >{t('user_will_have_to_enter_a_document_number_within_the_specified_character_limits')}</Typography>

                                        </Grid>
                                        <Grid size={{ xs: 12 }} >
                                            <RHFCheckbox
                                                name="document_number_is_mandatory"
                                                label={t("mark_it_mandatory")}
                                                labelPlacement="end"
                                                sx={{ mx: 0, justifyContent: "space-between", }}
                                            />
                                        </Grid>
                                    </>
                                }
                                <Grid size={{ xs: 12 }}  ><Divider /></Grid>

                                <Grid size={{ xs: 12 }} >
                                    <RHFSwitch
                                        name="has_expiry"
                                        label={t("has_document_expiry")}
                                        labelPlacement="start"
                                        sx={{ mx: 0, justifyContent: "space-between", }}
                                    />
                                </Grid>

                                {watch('has_expiry') &&
                                    <>
                                        <Grid size={{ xs: 4 }} >
                                            <RHFCheckbox
                                                name="expiry_date_is_mandatory"
                                                label={t("mark_it_mandatory")}
                                                labelPlacement="end"
                                                sx={{ mx: 0, justifyContent: "space-between", }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 8 }} >
                                            <Typography variant="caption" display={'flex'} color={'text.secondary'} >{t('if_marked_as_mandatory_users_must_select_a_document_expiry_date_during_the_document_attachment')}</Typography>
                                        </Grid>
                                    </>
                                }
                                <Grid size={{ xs: 12 }}  ><Divider /></Grid>

                                <Grid size={{ xs: 12 }} >
                                    <RHFSwitch
                                        name="has_attachment"
                                        label={t("has_files_to_upload")}
                                        labelPlacement="start"
                                        sx={{ mx: 0, justifyContent: "space-between", }}
                                    />
                                </Grid>

                                {watch('has_attachment') &&
                                    <>
                                        <Grid size={{ xs: 3 }} >
                                            <RHFTextField
                                                sx={{ ...requireFeildCss }}
                                                type={'number'}
                                                name="document_attachment_min_qty"
                                                label={`${t("min_files")} *`}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 3 }} >
                                            <RHFTextField
                                                sx={{ ...requireFeildCss }}
                                                type={'number'}
                                                name="document_attachment_max_qty"
                                                label={`${t("max_files")} *`}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 6 }} >
                                            <Typography variant="caption" display={'flex'} color={'text.secondary'} >{t('users_must_upload_files_within_the_min_and_max_files_limits')}</Typography>
                                        </Grid>

                                        <Typography variant="caption" color={'text.secondary'} >{t('for_max_files', { placeholder: maxAttachmentQty })}</Typography>
                                    </>
                                }
                            </Grid>
                        </Box>
                        <DialogActions>
                            <Box display={"flex"} alignItems="center" gap={1} justifyContent='flex-end'>
                                <Button disabled={isSubmitting} rounded='true' variant="outlined" sx={{ minWidth: 120 }} onClick={() => onClose({ status: false, update: false, })}>
                                    {t("cancel")}
                                </Button>
                                <LoadingButton disabled={!isDirty} rounded='true' loading={isSubmitting} sx={{ minWidth: 120 }} type="submit" variant="contained" color="primary">
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