import { IconButton, Link, Stack, Tooltip } from "@mui/material";
import Grid from '@mui/material/Grid2';

import AlternateEmailRounded from "@mui/icons-material/AlternateEmailRounded";
import CallRounded from "@mui/icons-material/CallRounded";
import WhatsApp from "@mui/icons-material/WhatsApp";
import { useTranslate } from "locales";

export default function Sharing({ links = { call: "", email: "" } }) {
    const { t } = useTranslate();
    return (
        <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent={"flex-start"} gap={1}>
            {links.call && (
                <Link href={`tel:${links.call}`} sx={{ "&:hover": { textDecoration: "none" } }}>
                    <IconButton variant="text" color="info" >
                        <Tooltip title={t("call")} arrow>
                            <CallRounded fontSize="small"/>
                        </Tooltip>
                    </IconButton>
                </Link>
            )}
            {links.email && (
                <Link href={`mailto:${links.email}`} sx={{ "&:hover": { textDecoration: "none" } }}>
                    <IconButton variant="text" color="error" fontSize="small">
                        <Tooltip title={t("email")} arrow>
                            <AlternateEmailRounded fontSize="small" />
                        </Tooltip>
                    </IconButton>
                </Link>
            )}

            {links.call && (
                <Link href={`https://wa.me/${links.call}`} target="_blank" sx={{ "&:hover": { textDecoration: "none" } }}>
                    <IconButton variant="text" color="success">
                        <Tooltip title={t("whatsapp")} arrow>
                            <WhatsApp fontSize="small"/>
                        </Tooltip>
                    </IconButton>
                </Link>
            )}
        </Stack>
    );
}
