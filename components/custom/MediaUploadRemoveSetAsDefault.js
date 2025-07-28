import { Box, CircularProgress, Skeleton, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Typography from "@mui/material/Typography";
import GoogleMaterialIcon from "components/google-icon";
import { RHFUploadBox } from "components/hook-form";
import FormProvider from "components/hook-form/form-provider";
import { CustomPreviewMultiFile } from "components/upload";
import { useTranslate } from "locales";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";



export default function MediaUploadRemoveSetAsDefault({ uploadLength = 5, onDelete, onUpload, onDefault, imageList = [], loading = false, sx, ...other }) {

    const [loadingImageUpload, setLoadingImageUpload] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslate()

    const defaultValues = {
        media_url: [],
    }

    useEffect(() => {
        setValue('media_url', imageList)
    }, [imageList])

    const methods = useForm({
        defaultValues,
    });
    const {
        watch,
        setValue,
    } = methods;

    const handleDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles) {
            const uploadLimitExceeded = (acceptedFiles.length + imageList.length) > uploadLength;
            if (uploadLimitExceeded) {
                enqueueSnackbar(t('maximum_image_upload', { placeholder: uploadLength }), { variant: 'error' });
                return;
            }
            setLoadingImageUpload(true);
            for (const file of acceptedFiles) {
                const fileSizeMB = Math.round(file.size / 1048576);
                if (fileSizeMB > 5) {
                    enqueueSnackbar('Not allowed more than 5 MB', { variant: 'error' });
                    continue;
                }
                try {
                    await onUpload(file);
                } catch (error) {
                    setLoadingImageUpload(false);
                    return error;
                }
            }
            setLoadingImageUpload(false);
        }
    },
        [setValue, watch('media_url')]
    );


    const handleRemoveFile = useCallback(async (inputFile) => {
        try {
            await onDelete(inputFile)
        } catch (error) {
            console.log(error)
        }
    }, [setValue, watch('media_url')]);



    return (
        <>
            <FormProvider methods={methods} autoComplete="off">
                <Box display={'flex'} flexDirection='row' flexWrap={'wrap'} gap={2}>
                    {loading ?
                        [...Array(5)].map((_, index) => (
                            <Skeleton key={index} variant="rounded" height={100} width={100} />
                        ))
                        :
                        <>
                            <CustomPreviewMultiFile
                                thumbnail
                                files={watch('media_url')}
                                onDefaultSet={(file) => onDefault(file)}
                                onRemove={(file) => handleRemoveFile(file)}
                                sx={{ width: 100, height: 100, m: 0 }}
                            />
                            {uploadLength != imageList.length &&
                                <RHFUploadBox
                                    accept={{ 'image/jpeg': [], 'image/png': [], 'image/webp': [], 'image/heic': [], 'image/jfif': [], }}
                                    name="media_url"
                                    onDrop={handleDrop}
                                    placeholder={
                                        <Stack spacing={0.5} alignItems="center">
                                            {loadingImageUpload
                                                ? <CircularProgress size={24} />
                                                : <GoogleMaterialIcon icon={'upload'} fontSize='medium' />
                                            }
                                            <Typography variant="caption">{t('attachment')}</Typography>
                                        </Stack>
                                    }
                                    sx={{ height: 'auto', width: 100, m: 0, height: 100 }}
                                />}
                        </>
                    }
                </Box>
            </FormProvider>
        </>
    );
}