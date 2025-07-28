"use client";
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTranslate } from "locales";
import { memo } from "react";

function CompanyInfoView({ company = null, infoTitle = '', }) {
    const { name = '', address_line1 = '', address_line2 = '', city_name = '', state_name = '', zip_code = '', email = '', phone = '', website = '', tax_number = '' } = company || {}
    const { t } = useTranslate()

    if (!company) return null

    return (
        <>
            <Box width={1} display='flex' >
                <Box display={'flex'} alignItems='flex-start' justifyContent={'start'} flexDirection='column' py={2}>
                    <Typography variant='body2' color={'text.secondary'} textTransform='capitalize'>{infoTitle}</Typography>
                    <Typography variant='subtitle1'>{name}</Typography>
                    {address_line1 && <Typography variant='body2' color={'text.secondary'} >{address_line1}</Typography>}
                    {address_line2 && <Typography variant='body2' color={'text.secondary'} >{address_line2}</Typography>}
                    {(city_name || state_name || zip_code) && <Typography variant='body2' color={'text.secondary'}  >{`${city_name || ""} ${state_name || ''} ${zip_code || ""}`}</Typography>}
                    {email && <Typography variant='body2' color={'text.secondary'} mt={0.5} >{`${t('email')} : ${email} `}</Typography>}
                    {phone && <Typography variant='body2' color={'text.secondary'} >{`${t('phone')} : ${phone} `}</Typography>}
                    {website && <Typography variant='body2' color={'text.secondary'} mt={0.5} >{`${t('website')} : ${website} `}</Typography>}
                    {tax_number && <Typography variant='body2' color={'text.secondary'} >{`${t('tax_number')} : ${tax_number} `}</Typography>}
                </Box>
            </Box>
        </>
    );
}

export default memo(CompanyInfoView);
