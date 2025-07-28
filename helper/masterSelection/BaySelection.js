"use client";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import { TableMoreMenu } from "components/table";
import { useBoolean } from "hooks/use-boolean";
import { useTranslate } from "locales";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

const BayMaster = dynamic(() => import("master/BayMaster"));

export default function BaySelection({ referenceData = {}, isEditable = true, updateItem, label = '', isRequire = false, icon = '', addButton = '', currentDepartment = '' }) {
    const { bay_id, title, } = referenceData || {}

    const { t } = useTranslate();

    const modal = useBoolean();
    const popover = usePopover();

    const [loading, setLoading] = useState(false)

    const serviceWriterModalClose = useCallback(async (value) => {
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
            {bay_id ?
                <Box display='flex' alignItems={'center'} justifyContent='space-between' p={1} pl={2}>
                    <Box display={'flex'} alignItems='center' gap={2} >
                        {icon && <GoogleMaterialIcon icon={icon} width={24} />}
                        <Box display={'flex'} flexDirection='column'>
                            <Typography variant="caption" color={'text.secondary'}>{label}</Typography>
                            <Typography variant="body2"  >{title ? title : "-"}</Typography>
                        </Box>
                    </Box>
                    <Box display={'flex'} alignItems='center'>
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
                :
                addButton && <LoadingButton loading={loading} disabled={!isEditable} sx={{ p: 1.5 }} variant="text" fullWidth color="primary" onClick={modal.onTrue} startIcon={<GoogleMaterialIcon icon={'add'} />} >{addButton}</LoadingButton>
            }

            {modal.value &&
                <BayMaster
                    open={modal.value}
                    onClose={serviceWriterModalClose}
                    selectedItem={[bay_id]}
                    NeedtoSelect
                    currentDepartment={currentDepartment}
                />
            }
        </>
    )
}