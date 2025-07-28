import { Box, Dialog, IconButton, Typography } from "@mui/material/";
import GoogleMaterialIcon from "components/google-icon";
import { useTranslate } from "locales";
import { useBarcode } from "next-barcode";
import fileDownload from "js-file-download";
import dataURLtoFile from "utils/dataURLtoFile";


export default function BarcodeViewModal({ open, onClose, code }) {
    const { t } = useTranslate()

    function ViewBarcode() {
        const { inputRef } = useBarcode({ value: code, options: { height: 40, background: "transparent" } });
        return <img ref={inputRef} className='barcode_img' />
    };


    function downloadFile() {
        const imgElement = document.querySelector('.barcode_img')?.src;
        var file = dataURLtoFile(imgElement, code);
        file && fileDownload(file, `${code}.png`);
    }

    return (
        <>
            <Dialog scroll="body" fullWidth maxWidth="xs" open={open} onClose={() => onClose({ status: false, remove: false })}>
                <Box sx={{ p: 2, bgcolor: "background.dialog" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                        <Typography variant="h6">{t("view_barcode")}</Typography>
                        <Box display={"flex"} alignItems="center" gap={0.5} >
                            <IconButton variant='text' color="error" onClick={() => onClose({ status: false, remove: true, })} ><GoogleMaterialIcon icon={'delete'} /></IconButton>
                            <IconButton variant='text' color="success" onClick={() => downloadFile()}><GoogleMaterialIcon icon={'download'} /></IconButton>
                            <IconButton variant='text' color="inherit" aria-label="close modal" onClick={() => onClose({ status: false, remove: false, })}>
                                <GoogleMaterialIcon icon={'close'} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box display={'flex'} alignItems='center' justifyContent={'center'} py={4}>
                        <ViewBarcode />
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
