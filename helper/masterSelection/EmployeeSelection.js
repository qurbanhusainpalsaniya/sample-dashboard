"use client";
import { LoadingButton } from "@mui/lab";
import { Box, CardActionArea, IconButton, MenuItem, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import { TableMoreMenu } from "components/table";
import { useBoolean } from "hooks/use-boolean";
import { useTranslate } from "locales";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { employeeFullName } from "utils/format-string";

const EmployeeMaster = dynamic(() => import("master/EmployeeMaster"));

export default function EmployeeSelection({ referenceData = {}, isEditable = true, updateItem, label = '', isRequire = false, icon = '', addButton = '' }) {
    const { user_id, first_name, last_name } = referenceData || {}

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
            {user_id ?
                <Paper variant='outlined' sx={{ p: 1,  }}>
                    <Box display={"flex"} gap={0.5} justifyContent='space-between'>
                        <Box display={"flex"} gap={1} minWidth={0}>
                            {icon && <GoogleMaterialIcon icon={icon} color='primary' />}
                            <Box display={'flex'} textAlign={"left"} flexDirection={'column'} width={1} minWidth={0}>
                                <Typography variant='caption' color='text.secondary'>{label}</Typography>
                                <Typography variant='caption' fontWeight={'bold'} lineHeight='normal' noWrap>{employeeFullName(referenceData)}</Typography>
                            </Box>
                        </Box>
                        <TableMoreMenu
                            isDisable={!isEditable}
                            loading={loading}
                            open={popover.open}
                            onOpen={popover.onOpen}
                            onClose={popover.onClose}
                            actions={
                                <>
                                    <MenuItem onClick={() => { modal.onTrue(); popover.onClose() }}><GoogleMaterialIcon icon={'edit'} />{t('edit')}</MenuItem>
                                    {!isRequire && <MenuItem onClick={() => { removeItem(), popover.onClose() }} sx={{ color: "error.main" }}><GoogleMaterialIcon icon={'cancel'} />{t('remove')}</MenuItem>}
                                </>
                            }
                        />
                    </Box>
                </Paper>

                // <Box display='flex' alignItems={'center'} justifyContent='space-between' p={1} pl={2}>
                //     <Box display={'flex'} alignItems='center' gap={2} >
                //         {icon && <GoogleMaterialIcon icon={icon} width={24} />}
                //         <Box display={'flex'} flexDirection='column'>
                //             <Typography variant="caption" color={'text.secondary'}>{label}</Typography>
                //             <Typography variant="body2"  >{first_name ? `${first_name} ${last_name}` : "-"}</Typography>
                //         </Box>
                //     </Box>
                //     <Box display={'flex'} alignItems='center'>
                //         {isRequire ?
                //             <LoadingButton disabled={!isEditable} loading={loading} size='small' variant='text' color='primary' onClick={modal.onTrue}>{t('change')}</LoadingButton>
                //             :
                //             <TableMoreMenu
                //                 isDisable={!isEditable}
                //                 loading={loading}
                //                 showButton
                //                 open={popover.open}
                //                 onOpen={popover.onOpen}
                //                 onClose={popover.onClose}
                //                 actions={
                //                     <>
                //                         <MenuItem onClick={() => { modal.onTrue(); popover.onClose() }}><GoogleMaterialIcon icon={'edit'} />{t('edit')}</MenuItem>
                //                         <MenuItem onClick={() => { removeItem(), popover.onClose() }} sx={{ color: "error.main" }}><GoogleMaterialIcon icon={'cancel'} />{t('remove')}</MenuItem>
                //                     </>
                //                 }
                //             />}
                //     </Box>
                // </Box>
                :
                <Paper variant='outlined' sx={{ p: 1, bgcolor: "background.dialog", minHeight: 54 }} component={CardActionArea} onClick={modal.onTrue} >
                    <Box display={"flex"} gap={1} alignItems='center' justifyContent={'center'}>
                        {icon && <GoogleMaterialIcon icon={icon} color='primary' />}
                        <Box display={'flex'} textAlign={"left"} flexDirection={'column'}>
                            <Typography variant='body2' color='primary'>{addButton}</Typography>
                        </Box>
                    </Box>
                </Paper>

                // addButton &&
                // <LoadingButton
                //     loading={loading}
                //     disabled={!isEditable}
                //     sx={{ p: 1.5 }}
                //     variant="outlined"
                //     color="inherit"
                //     onClick={modal.onTrue}
                //     startIcon={<GoogleMaterialIcon icon={'add'} />} >
                //     {addButton}
                // </LoadingButton>
            }

            {modal.value &&
                <EmployeeMaster
                    open={modal.value}
                    onClose={serviceWriterModalClose}
                    selectedItem={user_id && [{ user_id: user_id }]}
                    NeedtoSelect
                />
            }
        </>
    )
}