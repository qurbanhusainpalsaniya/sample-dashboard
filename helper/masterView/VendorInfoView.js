"use client";
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useCustomPagination } from "hooks/useCustomPagination";
import { useTranslate } from "locales";
import Link from "next/link";
import { memo } from "react";
import { paths } from "routes/paths";

function VendorInfoView({ vendor = null, infoTitle = '', vendorAddress = null }) {
    const { supplier_id, company_name = '', email = '', website = '', tax_number = '', phone = '' } = vendor || {}
    const { address_line1 = '', address_line2 = '', city = '', state_name = '', zip_code = '' } = vendorAddress || {}
    const { t } = useTranslate()
    const { pagination } = useCustomPagination()

    if (!vendor) return null

    return (
        <>
            <Box width={1} >
                <Box display={'flex'} alignItems='flex-start' justifyContent={'flex-end'} flexDirection='column' p={2}>
                    {infoTitle && <Typography variant='body2' color={'text.secondary'} textTransform='capitalize' >{infoTitle}</Typography>}
                    <Typography variant='subtitle1' color={'primary'} component={Link} href={`${paths.purchase.vendor}/${btoa(supplier_id)}?page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`} style={{ textDecoration: 'none' }}  >
                        {company_name}
                    </Typography>

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

export default memo(VendorInfoView);
