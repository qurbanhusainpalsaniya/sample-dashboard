"use client";
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import GoogleMaterialIcon from "components/google-icon";
import { useCustomPagination } from "hooks/useCustomPagination";
import { useTranslate } from "locales";
import Link from "next/link";
import { memo } from "react";
import { paths } from "routes/paths";
import { customerFullName } from "utils/format-string";


function CustomerInfoView({ customer = null, infoTitle = '', customerAddress = null }) {
    const { customer_id, customer_type = '', email = '', website = '', tax_number = '', phone = '' } = customer || {}
    const { address_line1 = '', address_line2 = '', city = '', state_name = '', zip_code = '' } = customerAddress || {}
    const { t } = useTranslate()
    const { pagination } = useCustomPagination()

    if (!customer) return null

    return (
        <>
            <Box width={1} >
                <Box display={'flex'} alignItems='flex-start' justifyContent={'flex-end'} flexDirection='column' p={2}>
                    {infoTitle && <Typography variant='body2' color={'text.secondary'} textTransform='capitalize' >{infoTitle}</Typography>}
                    <Box display={'flex'} alignItems='center' gap={0.5} sx={{ cursor: 'pointer' }} component={Link} href={`${paths.workflow.customers}/${btoa(customer_id)}?page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`} style={{ textDecoration: 'none' }} >
                        <Typography variant='subtitle1' color={'primary'}  >
                            {customerFullName(customer)}
                        </Typography>
                        {customer_type == 'insurance' && <Typography variant="subtitle1" display={'flex'} ><GoogleMaterialIcon icon='health_and_safety' color='primary' fontSize="inherit" /></Typography>}
                    </Box>

                    {address_line1 && <Typography variant='body2' color={'text.secondary'}  >{address_line1}</Typography>}
                    {address_line2 && <Typography variant='body2' color={'text.secondary'}  >{address_line2}</Typography>}
                    {(city || state_name || zip_code) && <Typography variant='body2' color={'text.secondary'}  >{`${city || ""} ${state_name || ''} ${zip_code || ""}`}</Typography>}
                    {email && <Typography variant='body2' color={'text.secondary'} mt={0.5} >{`${t('email')} : ${email} `}</Typography>}
                    {phone && <Typography variant='body2' color={'text.secondary'} >{`${t('phone')} : ${phone} `}</Typography>}
                    {website && <Typography variant='body2' color={'text.secondary'} >{`${t('website')} : ${website} `}</Typography>}
                    {tax_number && <Typography variant='body2' color={'text.secondary'} >{`${t('tax_number')} : ${tax_number} `}</Typography>}
                </Box>
            </Box>
        </>
    );
}

export default memo(CustomerInfoView);
