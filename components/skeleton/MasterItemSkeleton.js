import { Box, ListItem, Skeleton, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';
export default function MasterItemSkeleton({ loadTime = 8 }) {
    return (
        <>
            {[...Array(loadTime)].map((_, index) => (
                <ListItem key={index}>
                    <Stack spacing={1}>
                        <Box display={"flex"} justifyContent="flex-start" alignItems="center" gap={2}>
                            <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
                            <Box>
                                <Skeleton variant="text" width={130} />
                                <Skeleton variant="text" height={16} width={200} />
                            </Box>
                        </Box>
                    </Stack>
                </ListItem>
            ))}
        </>
    );
}
