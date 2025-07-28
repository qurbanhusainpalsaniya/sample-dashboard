import { Box, CircularProgress, MenuItem } from "@mui/material";
import Grid from '@mui/material/Grid2';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import { usePopover } from "components/custom-popover";
import CustomPopover from "components/custom-popover/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import { useTranslate } from "locales";
import PropTypes from "prop-types";
import { useState } from "react";
import FileThumbnail from "../file-thumbnail";

// ----------------------------------------------------------------------

export default function CustomPreviewMultiFile({ thumbnail, files, onRemove, onDefaultSet, sx }) {
    const { t } = useTranslate()

    function ThumbnailView({ file }) {
        const { media_url, set_as_default } = file

        const popover = usePopover();
        const [loading, setLoading] = useState(false)

        async function removeImage() {
            setLoading(true)
            await onRemove(file)
            setLoading(false)
        }
        async function defaultImage() {
            setLoading(true)
            await onDefaultSet(file)
            setLoading(false)
        }

        return (
            <Stack
                alignItems="center"
                display="inline-flex"
                justifyContent="center"
                sx={{
                    m: 0.5,
                    width: 80,
                    height: 80,
                    borderRadius: 1.25,
                    overflow: "hidden",
                    position: "relative",
                    border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
                    // "&:hover": {
                    //     '.option': {
                    //         opacity: 1
                    //     }
                    // },
                    ...sx,
                }}
            >
                <FileThumbnail tooltip imageView file={media_url} sx={{ position: "absolute" }} imgSx={{ position: "absolute" }} />

                {set_as_default == "yes" &&
                    <Box sx={{ position: "absolute", left: 5, bottom: 5, bgcolor: "background.paper", height: 26, width: 26, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 5, }}>
                        <GoogleMaterialIcon icon={'star'} filled sx={{ color: "orange" }} />
                    </Box>
                }

                {loading &&
                    <Box sx={{ width: 1, height: 1, display: "flex", alignItems: 'center', justifyContent: 'center', position: "absolute", bgcolor: (theme) => alpha(theme.palette.common.white, 0.48), zIndex: 2, }}>
                        <CircularProgress />
                    </Box>
                }


                <Box className='option'
                    sx={{
                        borderRadius: 1,
                        top: 4,
                        right: 4,
                        position: "absolute",
                        color: "common.white",
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.40),
                        "&:hover": {
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                        },
                    }}>
                    <IconButton color={popover.open ? "inherit" : "default"} onClick={(e) => { e.stopPropagation(); popover.onOpen(e); }} size='small' >
                        <GoogleMaterialIcon icon={'more_vert'} sx={{ color: "common.white" }} />
                    </IconButton>
                </Box>

                <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top">
                    {onDefaultSet &&
                        <MenuItem onClick={() => { defaultImage(); popover.onClose(); }}>
                            {set_as_default == "yes" ? <GoogleMaterialIcon icon={'star'} /> : <GoogleMaterialIcon icon={'star'} filled />}
                            {set_as_default === "yes" ? t("remove_as_default") : t("set_as_default")}
                        </MenuItem>
                    }
                    {onRemove && <MenuItem onClick={() => { removeImage(), popover.onClose(); }} sx={{ color: 'error.main' }}> <GoogleMaterialIcon icon={'delete'} /> {t("delete")}</MenuItem>}
                </CustomPopover>
            </Stack>
        )
    }

    return (
        <>
            {files?.map((file, i) => {
                if (thumbnail) {
                    return (
                        <ThumbnailView file={file} key={i} />
                    );
                }
            })}
        </>
    );
}

CustomPreviewMultiFile.propTypes = {
    files: PropTypes.array,
    onRemove: PropTypes.func,
    onDefaultSet: PropTypes.func,
    sx: PropTypes.object,
    thumbnail: PropTypes.bool,
};
