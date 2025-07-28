"use client";

import { Box, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { MotionContainer, varFade } from "components/animate";
import GoogleMaterialIcon from "components/google-icon";
import { m } from "framer-motion";
import { useTranslate } from "locales";

export default function ModuleAccessDenied() {
    const {t} = useTranslate()

    return (
        <Box display="flex" alignItems={"center"} justifyContent="center" flex={1} sx={{ height: "100%" }}>
            <MotionContainer>
                <m.div variants={varFade().inUp}>
                    <Box sx={{ p: 5, bgcolor: "", borderRadius: 2 }} display="flex" alignItems={"center"} gap={2} flexDirection="column" textAlign={"center"}>
                        <GoogleMaterialIcon icon={'workspace_premium'} fontSize="large" sx={{ color: "primary.main" }} />
                        <Box>
                            <Typography variant="h6">{t("upgrade_for_more_benefits")}</Typography>
                            <Typography color={"text.secondary"} variant="body2">
                                {t("this_feature_is_currently_hidden_in_your_workshop_upgrade_to_unlock_it_and_gain_access_to_more_powerful_tools")}
                            </Typography>
                        </Box>
                        <Box display={"flex"} gap={2}>
                            <Button variant="soft" color="primary">
                                {t("contact_us")}
                            </Button>
                            <Button variant="contained" color="primary">
                                {t("upgrade_now")}
                            </Button>
                        </Box>
                    </Box>
                </m.div>
            </MotionContainer>
        </Box>
    );
}
