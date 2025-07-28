import { Box, Paper, Skeleton } from "@mui/material";
import Grid from '@mui/material/Grid2';
export default function CardItemSkeleton() {
    return (
        <>
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                <Box display={'flex'} flexDirection='column' gap={2} component={Paper} alignItems='center' sx={{ p: 2 }} variant='outlined'>
                    <Box display={'flex'} alignItems='center' flexDirection={'column'} gap={1}>
                        <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
                        <Box display={'flex'} flexDirection='column' alignItems={'center'}>
                            <Skeleton variant="text" width={130} />
                            <Skeleton variant="text" height={16} width={200} />
                        </Box>
                        <Skeleton variant="text" sx={{ width: "100%" }} height={50} />
                    </Box>
                </Box>
            </Grid>
        </>
    );
}
