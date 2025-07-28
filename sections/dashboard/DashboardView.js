'use client';

import React from 'react'
import Grid from '@mui/material/Grid2';
import { useTranslate } from 'locales';
import { paths } from 'routes/paths';
import { Avatar, Box, Chip, Container, Stack, Tooltip, Typography } from '@mui/material';
import FileStorageOverview from './file-storage-overview';
import AppNewInvoice from './app-new-invoice';
import AppCustomerList from './app-new-invoice';
import EcommerceYearlySales from './ecommerce-yearly-sales';
import CountsWidget from './CountsWidget';
import AnalyticsWidgetSummary from './AnalyticsWidgetSummary';
import GoogleMaterialIcon from 'components/google-icon';
import { bgGradient } from 'theme/css';
import AnalyticsConversionRates from './analytics-conversion-rates';
import { DomainVerification } from '@mui/icons-material';

export default function DashboardView() {
    const { t } = useTranslate();

    const GB = 1000000000 * 24;

    const renderStorageOverview = (
        <FileStorageOverview
            total={GB}
            chart={{
                series: 76,
            }}
            data={[
                {
                    name: 'Images',
                    usedStorage: GB / 2,
                    filesCount: 223,
                    icon: <Box component="img" src="/assets/icons/files/ic_img.svg" />,
                },
                {
                    name: 'Media',
                    usedStorage: GB / 5,
                    filesCount: 223,
                    icon: <Box component="img" src="/assets/icons/files/ic_video.svg" />,
                },
                {
                    name: 'Documents',
                    usedStorage: GB / 5,
                    filesCount: 223,
                    icon: <Box component="img" src="/assets/icons/files/ic_document.svg" />,
                },
                {
                    name: 'Other',
                    usedStorage: GB / 10,
                    filesCount: 223,
                    icon: <Box component="img" src="/assets/icons/files/ic_file.svg" />,
                },
            ]}
        />
    );

    return (
        <Box sx={{ p: { xs: 2, md: 6 } }}>
            <Grid container spacing={2} rowSpacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <AnalyticsWidgetSummary
                        title={t('my_vehicles')}
                        total={5}
                        icon={'directions_car'}
                        iconcolor='#FFF085'
                        path={``}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <AnalyticsWidgetSummary
                        title={t('my_appointments')}
                        total={8}
                        icon={'calendar_month'}
                        iconcolor='#B9F8CF'
                        path={``}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    {renderStorageOverview}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <AppCustomerList title="New Customers" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <EcommerceYearlySales
                        title="Yearly Sales"
                        subheader="(+43%) than last year"
                        chart={{
                            categories: [
                                'Jan',
                                'Feb',
                                'Mar',
                                'Apr',
                                'May',
                                'Jun',
                                'Jul',
                                'Aug',
                                'Sep',
                                'Oct',
                                'Nov',
                                'Dec',
                            ],
                            series: [
                                {
                                    year: '2019',
                                    data: [
                                        {
                                            name: 'Total Income',
                                            data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                                        },
                                        {
                                            name: 'Total Expenses',
                                            data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                                        },
                                    ],
                                },
                                {
                                    year: '2020',
                                    data: [
                                        {
                                            name: 'Total Income',
                                            data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                                        },
                                        {
                                            name: 'Total Expenses',
                                            data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                                        },
                                    ],
                                },
                            ],
                        }}
                    />
                    <Grid sx={{ mt: 2 }} container spacing={2} rowSpacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <CountsWidget
                                title={t('Top Month')}
                                total={5}
                                name={'November'}
                                icon={'directions_car'}
                                description={'This is demo text of revenues.'}
                                iconcolor='#FFF085'
                                path={``}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <CountsWidget
                                title={t('Top Year')}
                                total={5}
                                name={'2023'}
                                icon={'directions_car'}
                                description={'This is demo text of revenues.'}
                                iconcolor='#FFF085'
                                path={``}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <CountsWidget
                                title={t('Top Buyer')}
                                total={5}
                                name={'John Doe'}
                                icon={'directions_car'}
                                description={'john@example.com'}
                                iconcolor='#FFF085'
                                path={``}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Stack
                        alignItems="start"
                        sx={{
                            cursor: 'default',
                            ...bgGradient({
                                direction: '135deg',
                                // startColor: alpha(theme.palette[color].light, 0.2),
                                // endColor: alpha(theme.palette[color].main, 0.2),
                            }),
                            p: 2,
                            borderRadius: 2,
                            textAlign: 'start',
                            color: `black`,
                            backgroundColor: 'white',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        }}
                    >
                        <Typography variant="h3">Chats</Typography>

                        <Typography variant="subtitle1">2 unread messages</Typography>

                        <Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1.5,
    mt: 2,
    alignItems: 'center',
  }}
>
  {/* Image Avatars */}
  {[...Array(5)].map((_, i) => (
    <Avatar
      key={i}
      src="/assets/image_one.png"
      alt={`Avatar ${i + 1}`}
      sx={{ width: 48, height: 48 }}
    />
  ))}

  {/* Initial Avatars with tooltip */}
  {[
    { label: 'S', name: 'Sarah' },
    { label: 'M', name: 'Michael' },
  ].map((item, idx) => (
    <Tooltip key={idx} title={item.name}>
      <Avatar
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          width: 36,
          height: 36,
          fontWeight: 300,
        }}
      >
        {item.label}
      </Avatar>
    </Tooltip>
  ))}
</Box>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <AnalyticsConversionRates
                        title="Top States"
                        subheader=""
                        chart={{
                            series: [
                                { label: '', value: 1380 },
                                { label: '', value: 1350 },
                                { label: '', value: 1200 },
                                { label: '', value: 1150 },
                                { label: '', value: 950 },
                                { label: '', value: 900 },
                            ],
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Stack
                        alignItems="start"
                        sx={{
                            cursor: 'default',
                            ...bgGradient({
                                direction: '135deg',
                                // startColor: alpha(theme.palette[color].light, 0.2),
                                // endColor: alpha(theme.palette[color].main, 0.2),
                            }),
                            p: 2,
                            borderRadius: 2,
                            textAlign: 'start',
                            color: `black`,
                            backgroundColor: 'white',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        }}
                    >
                        <Typography variant="h3">New Deals</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <Chip
                                label="Fruit2Go"
                                icon={<GoogleMaterialIcon icon='add' />}
                                color="#FFF7E8"
                                sx={{ bgcolor: '#FFF7E8', color: 'primary.main' }}
                            />
                            <Chip
                                label="Marshall's MKT"
                                icon={<GoogleMaterialIcon icon='add' />}
                                color="#FFF7E8"
                                sx={{ bgcolor: '#FFF7E8', color: 'primary.main' }}
                            />
                             <Chip
                                label="CCNT"
                                icon={<GoogleMaterialIcon icon='add' />}
                                color="#FFF7E8"
                                sx={{ bgcolor: '#FFF7E8', color: 'primary.main' }}
                            />
                             <Chip
                                label="Target"
                                icon={<GoogleMaterialIcon icon='add' />}
                                color="#FFF7E8"
                                sx={{ bgcolor: '#FFF7E8', color: 'primary.main' }}
                            />
                             <Chip
                                label="Organic Place"
                                icon={<GoogleMaterialIcon icon='add' />}
                                color="#FFF7E8"
                                sx={{ bgcolor: '#FFF7E8', color: 'primary.main' }}
                            />
                             <Chip
                                label="Morello's"
                                icon={<GoogleMaterialIcon icon='add' />}
                                color="#FFF7E8"
                                sx={{ bgcolor: '#FFF7E8', color: 'primary.main' }}
                            />

                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}
