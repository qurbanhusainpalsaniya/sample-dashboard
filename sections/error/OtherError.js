"use client";

import { Box, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { MotionContainer, varFade } from "components/animate";
import GoogleMaterialIcon from "components/google-icon";
import { APP_NAME } from "config-global";
import { m } from "framer-motion";
import { useTranslate } from "locales";
import { INTERNET_NETWORK_ERROR, TIMEOUT } from "utils/constant";

export default function OtherError({ error }) {
    const { t } = useTranslate()

    let title, description, icon;
    if (error.message == TIMEOUT) {
        icon = <GoogleMaterialIcon fontSize="large" icon={'signal_cellular_connected_no_internet_4_bar'} sx={{ color: "error.main" }} />
        title = error.message
        description = t('error_slow_internet_connection')
    }
    else if (error.message == INTERNET_NETWORK_ERROR) {
        icon = <GoogleMaterialIcon fontSize="large" icon={'signal_cellular_3_bar'} sx={{ color: "error.main" }} />
        title = error.message
        description = t("error_internet_connection", { placeholder: APP_NAME })
    }
    else {
        icon = <GoogleMaterialIcon fontSize="large" icon={'error'} sx={{ color: "error.main" }} />
        title = t('error_something_went_wrong')
        description = t('error_something_went_wrong')
    }

    return (
        <Box display="flex" alignItems={"center"} justifyContent="center" flex={1} sx={{ height: "100%" }}>
            <MotionContainer>
                <m.div variants={varFade().inUp}>
                    <Box sx={{ p: 5, bgcolor: "", borderRadius: 2 }} display="flex" alignItems={"center"} gap={2} flexDirection="column" textAlign={"center"}>
                        {icon}
                        <Box>
                            <Typography variant="h6">{title}</Typography>
                            <Typography color={"text.secondary"} variant="body2">{description}</Typography>
                        </Box>
                        <Box display={"flex"} gap={2}>
                            <Button
                                variant="soft"
                                color="primary"
                                startIcon={<GoogleMaterialIcon icon={'refresh'} />}
                                onClick={() => window.location.reload()}
                            >
                                {t("refresh")}
                            </Button>
                        </Box>
                    </Box>
                </m.div>
            </MotionContainer>
        </Box>
    );
}
