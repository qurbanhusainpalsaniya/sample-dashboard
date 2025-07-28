"use client";
import { alpha, Box, Button, CardActionArea, MenuItem, Paper, Tooltip, Typography } from "@mui/material";
import { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import { TableMoreMenu } from "components/table";
import { useBoolean } from "hooks/use-boolean";
import { useTranslate } from "locales";
import { CustomerMaster, InsuranceTypeMaster } from "master";
import { useCallback, useState } from "react";
import { customerFullName } from "utils/format-string";

export default function CustomerSelection({ referenceData = {}, isEditable = true, updateItem, changeInsuranceType, addButton = '', customerType = ['individual', 'company', 'fleet'], isRequire = false, icon = 'account_box', isInsurance = false, isEstimateTo = false }) {
    const { email, customer_id, phone, customer_type, insurance_type = null } = referenceData || {}

    const { t } = useTranslate();

    const modal = useBoolean();
    const insuraceTypeModal = useBoolean();
    const popover = usePopover();
    const popover1 = usePopover();
    const [loading, setLoading] = useState(false)

    const customerModalClose = useCallback(async (value) => {
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


    const insuraceTypeModalClose = useCallback(async (value) => {
        insuraceTypeModal.onFalse();
        if (value.data) {
            try {
                setLoading(true);
                await changeInsuranceType(value.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    }, [insuraceTypeModal,]);




    return (
        <>


            {!!customer_id ?
                <Paper variant='outlined' sx={{ p: 1, bgcolor: isEstimateTo ? (theme) => alpha(theme.palette.primary.main, 0.25) : "background.dialog" }}>
                    <Box display={"flex"} gap={1} alignItems='center' justifyContent={'space-between'}>
                        <Box display={"flex"} gap={1} minWidth={0}>
                            {icon && <GoogleMaterialIcon icon={icon} color='primary' />}
                            <Box display={'flex'} textAlign={"left"} flexDirection={'column'} width={1} minWidth={0}>
                                <Box display={'flex'}>
                                    <Typography variant='caption' fontWeight={'bold'} lineHeight='normal' noWrap >{customerFullName(referenceData)}</Typography>
                                    {isEstimateTo &&
                                        <Tooltip arrow title={t('estimate_to')}>
                                            <Typography display={'flex'} variant='body2' component={Button} sx={{ height: "auto" }} minWidth='auto' onClick={popover1.onOpen} p={0} ><GoogleMaterialIcon icon={'calculate'} color='error' fontSize="inherit" /></Typography>
                                        </Tooltip>
                                    }
                                </Box>
                                {isInsurance ?
                                    < Typography variant='caption' color='text.secondary' noWrap>{insurance_type?.title}</Typography>
                                    : < Typography variant='caption' color='text.secondary'>{customer_type}</Typography>
                                }
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
                                    {isInsurance && <MenuItem onClick={() => { insuraceTypeModal.onTrue(), popover.onClose() }}><GoogleMaterialIcon icon={'edit'} />{t('insurance_type')}</MenuItem>}
                                </>
                            }
                        />
                    </Box>
                </Paper>
                :
                <Paper variant='outlined' sx={{ p: 1, bgcolor: "background.dialog", minHeight: 54 }} component={CardActionArea} onClick={modal.onTrue} >
                    <Box display={"flex"} gap={1} alignItems='center' justifyContent={'center'}>
                        <GoogleMaterialIcon icon={'add'} color='primary' />
                        <Box display={'flex'} textAlign={"left"} flexDirection={'column'}>
                            <Typography variant='body2' color='primary'>{addButton ? addButton : t('select_customer')}</Typography>
                        </Box>
                    </Box>
                </Paper>
            }

            {modal.value && <CustomerMaster open={modal.value} onClose={customerModalClose} selectedItem={[customer_id]} NeedtoSelect customerType={customerType} />}

            {insuraceTypeModal.value && <InsuranceTypeMaster open={insuraceTypeModal.value} onClose={insuraceTypeModalClose} selectedItem={insurance_type ? [insurance_type] : []} NeedtoSelect />}
        </>
    )
}