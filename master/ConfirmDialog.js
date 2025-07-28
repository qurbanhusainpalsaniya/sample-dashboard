import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import GoogleMaterialIcon from "components/google-icon";
import { useTranslate } from "locales";
import { forwardRef, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

export default function ConfirmDialog({ icon = <GoogleMaterialIcon icon={'delete'} />, title, description, open, onClose, showQuestionMark = true }) {
    const { t } = useTranslate();

    const [loading, setLoading] = useState(false);

    return (
        <Dialog TransitionComponent={Transition} fullWidth maxWidth="sm" open={open} onClose={() => onClose({ status: false, confirmation: false })}>
            <Box sx={{ p: 2 }}>
                <Box display={"flex"} flexDirection="column" gap={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        {icon}
                        <Typography variant={"h6"} fontWeight="500">
                            {`${title}  ${showQuestionMark ? "?" : ""}`}
                        </Typography>
                    </Box>
                    <Typography variant={"body2"} color={"text.secondary"} sx={{ whiteSpace: "pre-line" }}>
                        {description}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ p: 2, display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button variant="outlined" color="inherit" onClick={() => onClose({ status: false, confirmation: false })} sx={{ px: 3 }}>
                    {t("cancel")}
                </Button>
                <LoadingButton autoFocus variant="contained" color="primary" loading={loading} onClick={() => { setLoading(true); onClose({ status: false, confirmation: true }); }} sx={{ px: 3 }}>
                    {title}
                </LoadingButton>
            </Box>
        </Dialog>
    );
}
