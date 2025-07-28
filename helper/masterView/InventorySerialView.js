"use client";
import { Box, CardActionArea, Container, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { MasterItemEmpty } from "components/skeleton";

export default function InventorySerialView({ referenceData = [] }) {

    function SerialView({ row, index }) {
        const { serial_number, serial_stock_status } = row;

        let bgcolor = serial_stock_status == 'billed' ? 'background.default' : 'error.lighter'

        return (
            <CardActionArea sx={{ border: "1px solid", borderColor: 'divider', width: 200, margin: "-1px 0 0 -1px", }}>
                <Box display={'flex'} alignItems='center' justifyContent={'center'} sx={{ p: 2, px: 4, bgcolor: bgcolor }}>
                    <Typography variant="body1" color="initial"> {serial_number}</Typography>
                </Box>
            </CardActionArea>
        );
    }

    return (
        <>
            <Container maxWidth='md' disableGutters sx={{ m: 0 }}>
                <Box sx={{ p: 2 }} display='flex' flexDirection={'column'} gap={2}>
                    {referenceData.length > 0
                        ?
                        <Box display={'flex'} flexDirection='row' flexWrap={'wrap'}>
                            {referenceData.map((item, _i,) => {
                                return (
                                    <SerialView key={_i} row={item} index={_i} />
                                );
                            })}
                        </Box>
                        :
                        <MasterItemEmpty isNotFound={true} />
                    }
                </Box>
            </Container>
        </>
    );
}


