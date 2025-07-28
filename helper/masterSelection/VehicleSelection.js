// vehicle
"use client";
import { LoadingButton } from "@mui/lab";
import { Box, CardActionArea, MenuItem, Paper, Typography } from "@mui/material";
import { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import { TableMoreMenu } from "components/table";
import { useBoolean } from "hooks/use-boolean";
import { useTranslate } from "locales";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

const VehicleMaster = dynamic(() => import("master/VehicleMaster"));

export default function VehicleSelection({ referenceData = {}, isEditable = true, updateItem, isRequire = false, icon = 'directions_car' }) {

    const { license_plate, year, make, model, sub_model, fuel_type, vehicle_id } = referenceData ?? {};
    const vehicleName = [year, model, sub_model, fuel_type?.title].filter(Boolean).join(" ")

    const { t } = useTranslate();
    const modal = useBoolean();
    const popover = usePopover();
    const [loading, setLoading] = useState(false)

    const vehicleModalClose = useCallback(async (value) => {
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

            {!!vehicle_id ?
                <Paper variant='outlined' sx={{ p: 1, bgcolor: "background.dialog" }}>
                    <Box display={"flex"} gap={1} alignItems='center' justifyContent={'space-between'}>
                        <Box display={"flex"} gap={1} minWidth={0}>
                            {icon && <GoogleMaterialIcon icon={icon} color='primary' />}
                            <Box display={'flex'} textAlign={"left"} flexDirection={'column'} width={1} minWidth={0}>
                                <Typography variant='caption' fontWeight={'bold'} lineHeight='normal' noWrap >{vehicleName}</Typography>
                                {license_plate && < Typography variant='caption' color='text.secondary'>{license_plate}</Typography>}
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
                :
                <Paper variant='outlined' sx={{ p: 1, bgcolor: "background.dialog", minHeight: 54 }} component={CardActionArea} onClick={modal.onTrue} >
                    <Box display={"flex"} gap={1} alignItems='center' justifyContent={'center'}>
                        <GoogleMaterialIcon icon={'add'} color='primary' />
                        <Box display={'flex'} textAlign={"left"} flexDirection={'column'}>
                            <Typography variant='body2' color='primary'>{t('select_vehicle')}</Typography>
                        </Box>
                    </Box>
                </Paper>
            }

            {modal.value && <VehicleMaster open={modal.value} onClose={vehicleModalClose} selectedItem={[vehicle_id]} NeedtoSelect />}
        </>
    )
}
