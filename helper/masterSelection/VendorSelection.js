"use client";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import { SharingPopover } from "components/sharing";
import { TableMoreMenu } from "components/table";
import { useBoolean } from "hooks/use-boolean";
import { useTranslate } from "locales";
import { VendorMaster } from "master";
import { useCallback, useState } from "react";


export default function VendorSelection({ referenceData = {}, isEditable = true, updateItem, addButton = '', isRequire = false, buttonType = 'text' }) {
    const { first_name, last_name, salutation, email, supplier_id, phone, company_name } = referenceData || {}

    const { t } = useTranslate();

    const modal = useBoolean();
    const popover = usePopover();
    const [loading, setLoading] = useState(false)

    const vendorModalClose = useCallback(async (value) => {
        modal.onFalse();
        if (value.data) {
            try {
                setLoading(true);
                await updateItem(value.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    }, [modal, updateItem]);


    const vendorName = first_name ? ` ${salutation} ${first_name} ${last_name}` : "-"

    const removeItem = useCallback(async () => {
        try {
            setLoading(true);
            await updateItem('');
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }, [updateItem]);

    return (
        <>
            {supplier_id ?
                <Paper sx={{ border: isRequire ? "1px solid" : 0, borderColor: "primary.main" }}>
                    <Box display='flex' alignItems={'center'} justifyContent='space-between' p={1} pl={2} flexWrap='wrap' >
                        <Box display={'flex'} alignItems='center' gap={2} >
                            <Box display={'flex'} flexDirection='column'>
                                <Typography variant="caption" color={'text.secondary'}>{t('vendor')}</Typography>
                                <Typography variant="body2"  >{`${vendorName} • ${company_name}`}</Typography>
                                <Typography variant="caption" color={'text.secondary'}>{email}</Typography>
                            </Box>
                        </Box>
                        <Box display={'flex'} alignItems='center' >
                            <SharingPopover email={email} phoneNumber={phone} />

                            {isRequire ?
                                <LoadingButton disabled={!isEditable} loading={loading} size='small' variant='text' color='primary' onClick={modal.onTrue}>{t('change')}</LoadingButton>
                                :
                                <TableMoreMenu
                                    isDisable={!isEditable}
                                    loading={loading}
                                    showButton
                                    open={popover.open}
                                    onOpen={popover.onOpen}
                                    onClose={popover.onClose}
                                    actions={
                                        <>
                                            <MenuItem onClick={() => { modal.onTrue(); popover.onClose() }}><GoogleMaterialIcon icon={'edit'} />{t('edit')}</MenuItem>
                                            <MenuItem onClick={() => { removeItem(), popover.onClose() }} sx={{ color: "error.main" }}><GoogleMaterialIcon icon={'cancel'} />{t('remove')}</MenuItem>
                                        </>
                                    }
                                />}
                        </Box>
                    </Box>
                </Paper>
                :
                addButton && <LoadingButton loading={loading} disabled={!isEditable} sx={{ p: 1.5 }} variant={buttonType} fullWidth color="primary" onClick={modal.onTrue} startIcon={<GoogleMaterialIcon icon={'add'} />} >{addButton}</LoadingButton>
            }
            {modal.value && <VendorMaster open={modal.value} onClose={vendorModalClose} selectedItem={[supplier_id]} NeedtoSelect />}
        </>
    )
}