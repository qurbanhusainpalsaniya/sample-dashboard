"use client";
import { LoadingButton } from "@mui/lab";
import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import { TableMoreMenu } from "components/table";
import { useBoolean } from "hooks/use-boolean";
import { useCustomPagination } from "hooks/useCustomPagination";
import { useTranslate } from "locales";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useState } from "react";
import { paths } from "routes/paths";
import { customerFullName, vehicleFullName } from "utils/format-string";

const WorkorderMaster = dynamic(() => import("master/WorkorderMaster"));


export default function WorkorderSelection({ referenceData = {}, isEditable = true, updateItem, buttonType = 'text' }) {
    const { workorder_id, workorder_number, customer_workorder_customer_idTocustomer, vehicle } = referenceData || {}

    const { t } = useTranslate();
    const modal = useBoolean();
    const popover = usePopover();
    const { pagination, } = useCustomPagination(paths.workflow.workorder)
    const [loading, setLoading] = useState(false)

    const modalClose = useCallback(async (value) => {
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
            {workorder_id ?
                <Box display='flex' alignItems={'center'} justifyContent='space-between' p={1} pl={2}  >
                    <Box display={'flex'} alignItems='center' gap={2}   >
                        <Box display={'flex'} flexDirection='column'>
                            <Typography variant="caption" color={'primary'} >{workorder_number}</Typography>
                            <Typography variant="body2"  >{customerFullName(customer_workorder_customer_idTocustomer)}</Typography>
                            <Typography variant="caption" color='text.secondary'  >{vehicleFullName(vehicle)}</Typography>
                        </Box>
                    </Box>
                    <Box display={'flex'} gap={0.5} alignItems='center'>

                        <IconButton variant='text' component={Link} href={`${paths.workflow.workorder}/${btoa(workorder_id)}?page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`}  >
                            <GoogleMaterialIcon icon={'open_in_new'} fontSize='small' />
                        </IconButton>

                        <TableMoreMenu
                            loading={loading}
                            isDisable={!isEditable}
                            showButton
                            open={popover.open}
                            onOpen={popover.onOpen}
                            onClose={popover.onClose}
                            actions={
                                <>
                                    <MenuItem onClick={(e) => { modal.onTrue(); popover.onClose() }}><GoogleMaterialIcon icon={'edit'} />{t('change')}</MenuItem>
                                    <MenuItem onClick={(e) => { removeItem(); popover.onClose() }} sx={{ color: "error.main" }}><GoogleMaterialIcon icon={'cancel'} />{t('remove')}</MenuItem>
                                </>
                            }
                        />
                    </Box>

                </Box> :
                <LoadingButton loading={loading} disabled={!isEditable} sx={{ p: 1.5 }} variant={buttonType} fullWidth color="primary" onClick={modal.onTrue} startIcon={<GoogleMaterialIcon icon={'add'} />} >{t('select_work_order')}</LoadingButton>
            }

            {modal.value && <WorkorderMaster open={modal.value} onClose={modalClose} selectedItem={[workorder_id]} NeedtoSelect />}
        </>
    )
}