import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { paths } from "routes/paths";


import { useAuthContext } from "auth/hooks";
import Label from "components/label";
import GoogleMaterialIcon from "components/google-icon";

// ----------------------------------------------------------------------

export default function NavUpgrade() {
    const { user } = useAuthContext();

    return (
        <Stack
            sx={{
                px: 2,
                py: 5,
                textAlign: "start",
            }}
        >
            <Stack alignItems="">
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ position: "relative" }}>
                        <Avatar src={user?.photoURL} alt={user?.displayName} sx={{ width: 48, height: 48 }} />
                        <Label
                            color="success"
                            variant="filled"
                            sx={{
                                top: -6,
                                px: 0.5,
                                left: 40,
                                height: 20,
                                position: "absolute",
                                borderBottomLeftRadius: 2,
                            }}
                        >
                            Free
                        </Label>
                    </Box>

                    <Stack spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
                        <Typography variant="subtitle2" noWrap>
                            {user?.displayName}
                        </Typography>

                        <Typography variant="body2" noWrap sx={{ color: "text.disabled" }}>
                            {'demo@gmail.com'}
                        </Typography>
                    </Stack>
                </Box>

                <Button variant="outlined" href={'/'} sx={{ gap: 0.2 }} target="_blank" rel="noopener">
                    <GoogleMaterialIcon icon='settings' /> Settings
                </Button>
                <Button variant="outlined" color="error" sx={{ mt: 1, gap: 0.2 }} href={'/'} target="_blank" rel="noopener">
                    <GoogleMaterialIcon icon='logout' /> Logout
                </Button>
            </Stack>
        </Stack>
    );
}
