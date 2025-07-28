import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, IconButton, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Typography from "@mui/material/Typography";
import { fileData, fileFormat } from "components/file-thumbnail";
import FileThumbnail from "components/file-thumbnail/file-thumbnail";
import GoogleMaterialIcon from "components/google-icon";
import { RHFUploadBox } from "components/hook-form";
import Label from "components/label/label";
import { useLightBox } from "components/lightbox";
import Lightbox from "components/lightbox/lightbox";
import fileDownload from "js-file-download";
import { useTranslate } from "locales";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { fData } from "utils/format-number";


export default function MediaUploadRemove({ title = 'attachments', uploadLength = 100, onDelete, onUpload, imageList = [], loading = false, sx, ...other }) {

    const [loadingImageUpload, setLoadingImageUpload] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslate()

    const handleDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles) {
            const uploadLimitExceeded = (acceptedFiles.length + imageList.length) > uploadLength;
            if (uploadLimitExceeded) {
                enqueueSnackbar(t('maximum_image_upload', { placeholder: uploadLength }), { variant: 'error' });
                return;
            }
            setLoadingImageUpload(true);
            for (const file of acceptedFiles) {
                // const fileSizeMB = Math.round(file.size / 1048576);
                // if (fileSizeMB > 5) {
                //     enqueueSnackbar('Not allowed more than 5 MB', { variant: 'error' });
                //     continue;
                // }
                try {
                    await onUpload(file);
                } catch (error) {
                    console.log(error)
                }
            }
            setLoadingImageUpload(false);
        }
    },
        [imageList]
    );


    const handleRemoveFile = useCallback(async (inputFile) => {
        try {
            await onDelete(inputFile)
        } catch (error) {
            console.log(error)
        }
    }, [imageList]);


    const slides = imageList?.map((item) => ({ src: (item?.media_url || item) }))
    const lightbox = useLightBox(slides);

    return (
        <>
            <Box display={'flex'} flexDirection='row' flexWrap={'wrap'} gap={2}>
                {loading ?
                    [...Array(5)].map((_, index) => (
                        <Skeleton key={index} variant="rounded" height={100} width={100} />
                    ))
                    :
                    <>
                        <Paper sx={{ p: 2, border: "1px solid", borderColor: 'divider', borderStyle: "dashed", ...sx }} {...other}>
                            <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', display: "flex", alignItems: 'flex-end', justifyContent: 'space-between', }}>
                                <Box sx={{ borderBottom: "2px solid", borderColor: 'primary.main', py: 1 }} display='flex' alignItems={'center'} gap={0.5}>
                                    <Typography variant="subtitle1"  >{t(title)}</Typography>
                                    {imageList.length > 0 && <Label color='primary' variant='filled' >{imageList.length}</Label>}
                                </Box>
                                <RHFUploadBox
                                    accept={{
                                        'image/jpeg': [],
                                        'image/png': [],
                                        'image/heic': [],
                                        'image/jfif': [],
                                        'video/*': [],
                                        'audio/*': [],
                                        'application/pdf': []
                                    }}
                                    name="media"
                                    onDrop={handleDrop}
                                    placeholder={
                                        <LoadingButton
                                            loading={loadingImageUpload}
                                            color="primary"
                                            variant="text"
                                            startIcon={<GoogleMaterialIcon icon={'attach_file_add'} />}
                                        >
                                            {t(title)}
                                        </LoadingButton>
                                    }
                                    sx={{ height: 'auto', width: "auto", bgcolor: "transparent" }}
                                />
                            </Box>
                            {imageList.length > 0 &&
                                <TableContainer sx={{ position: "relative", overflow: "unset" }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ '& .MuiTableCell-root': { px: 0, py: 1 } }}>
                                                <TableCell sx={{ typography: "body2", width: '50%' }} >{t('file_name')}</TableCell>
                                                <TableCell sx={{ typography: "body2", width: '12.5%' }} >{t('type')}</TableCell>
                                                <TableCell sx={{ typography: "body2", width: '12.5%' }}  >{t('duration')}</TableCell>
                                                <TableCell sx={{ typography: "body2", width: '12.5%' }}  >{t('file_size')}</TableCell>
                                                <TableCell sx={{ typography: "body2", width: '12.5%', textAlign: 'right' }}  ></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {imageList?.map((row, index) => {
                                                return (
                                                    <MediaRow
                                                        key={index}
                                                        row={row}
                                                        onDelete={() => handleRemoveFile(row)}
                                                        onView={() => lightbox.onOpen(row.media_url || row)}
                                                    />
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer >
                            }

                        </Paper>
                    </>
                }
            </Box>

            <Lightbox
                index={lightbox.selected}
                slides={slides}
                open={lightbox.open}
                close={lightbox.onClose}
                onGetCurrentIndex={(index) => lightbox.setSelected(index)}
            />
        </>
    );
}



function MediaRow({ row, onDelete, onView }) {
    const { media_url = "", media_type = '', media_size = '', duration = '', is_for_record_type = 'no' } = row;

    const { name = "", type = '' } = fileData(media_url);
    const format = fileFormat(media_url);
    const { t } = useTranslate()

    const [loading, setLoading] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)

    async function deleteImage() {
        setLoading(true)
        await onDelete()
        setLoading(false)
    }

    async function urlToFile() {
        const response = await fetch(media_url);
        const blob = await response.blob();
        const file = new File([blob], name, { type: type });
        return { file, blob, name, type }
    }

    async function downloadFile() {
        try {
            setDownloadLoading(true)
            const { blob, name, type } = await urlToFile();
            fileDownload(blob, name)
        } catch (error) {
            console.log(error)
        }
        setDownloadLoading(false)
    }


    return (
        <TableRow sx={{ '& .MuiTableCell-root': { px: 0, } }}>
            <TableCell>
                <Box display={'flex'} alignItems='center' gap={1} onClick={onView} flexWrap='wrap'  >
                    <FileThumbnail imageView file={media_url} imgSx={{ width: 36, height: 36, borderRadius: 1 }} />
                    <Box display={'flex'} flexDirection='column'>
                        <Box display={'flex'} alignItems='center' gap={0.5}>
                            <Typography variant="caption" sx={{ wordBreak: "break-word" }} >{name}</Typography>
                            {is_for_record_type == 'yes' &&
                                <Typography variant="body2" display={'flex'}>
                                    <GoogleMaterialIcon icon={'check_circle'} filled fontSize="inherit" color='primary' />
                                </Typography>
                            }
                        </Box>
                        {is_for_record_type == 'yes' && <Typography variant="caption" color={'text.secondary'} >{t('record_condition')}</Typography>}
                    </Box>
                </Box>
            </TableCell>

            <TableCell >
                <Typography variant="caption" textTransform={'capitalize'} >{media_type || format}</Typography>
            </TableCell>
            <TableCell >
                <Typography variant="caption" >{duration}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="caption">{fData(media_size)}</Typography>
            </TableCell>
            <TableCell align="right" >
                <Box display={'flex'} alignItems='center' justifyContent='flex-end'>
                    {
                        downloadLoading
                            ? <CircularProgress size={24} />
                            : <IconButton onClick={() => downloadFile()} size='small'><GoogleMaterialIcon icon={'download'} /></IconButton>
                    }
                    {loading
                        ? <CircularProgress size={24} />
                        : <IconButton color="error" onClick={() => deleteImage()} size='small' ><GoogleMaterialIcon icon={'delete'} /></IconButton>
                    }
                </Box>
            </TableCell>
        </TableRow>
    )
}