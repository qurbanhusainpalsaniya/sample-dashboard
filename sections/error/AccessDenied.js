"use client";
import { Box, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { MotionContainer, varFade } from "components/animate";
import GoogleMaterialIcon from "components/google-icon";
import { m } from "framer-motion";
import { useTranslate } from "locales";

export default function AccessDenied() {
    const {t} = useTranslate()

    return (
        <Box display="flex" alignItems={"center"} justifyContent="center" flex={1} sx={{ height: "100%" }}>
            <MotionContainer>
                <m.div variants={varFade().inUp}>
                    <Box sx={{ p: 5, bgcolor: "", borderRadius: 2 }} display="flex" alignItems={"center"} gap={2} flexDirection="column" textAlign={"center"}>
                        <GoogleMaterialIcon icon={'block'} fontSize="large" sx={{ color: "error.main" }} />
                        <Box>
                            <Typography variant="h6">{t("access_restricted")}</Typography>
                            <Typography color={"text.secondary"} variant="body2">
                                {t("this_feature_is_currently_unavailable_to_you_the_workshop_owner_has_restricted_access_to_it")}
                            </Typography>
                        </Box>
                        <Button variant="contained" color="primary">
                            {t("contact_admin")}
                        </Button>
                    </Box>
                </m.div>
            </MotionContainer>
        </Box>
    );
}
