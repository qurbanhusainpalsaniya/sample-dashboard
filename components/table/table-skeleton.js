import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

// ----------------------------------------------------------------------

export default function TableSkeleton({ ...other }) {
    return (
        <TableRow {...other}>
            <TableCell colSpan={12}>
                <Stack spacing={3} direction="row" alignItems="center">
                    <Skeleton
                        sx={{
                            borderRadius: 1.5,
                            width: 48,
                            height: 48,
                            flexShrink: 0,
                        }}
                    />
                    <Skeleton sx={{ width: 1, height: 12 }} />
                    <Skeleton sx={{ width: 0.2, height: 12 }} />
                    <Skeleton sx={{ width: 0.2, height: 12 }} />
                </Stack>
            </TableCell>
        </TableRow>
    );
}
