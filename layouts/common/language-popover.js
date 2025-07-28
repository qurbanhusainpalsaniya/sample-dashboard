import { Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import MenuItem from "@mui/material/MenuItem";
import CustomPopover, { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import Iconify from "components/iconify";
import { useLocales, useTranslate } from "locales";
import { useCallback } from "react";


export default function LanguagePopover() {
    const popover = usePopover();

    const { onChangeLang } = useTranslate();

    const { allLangs, currentLang } = useLocales();

    const handleChangeLang = useCallback(
        (newLang) => {
            onChangeLang(newLang);
            popover.onClose();
        },
        [onChangeLang, popover]
    );

    return (
        <>
            <Button endIcon={<GoogleMaterialIcon icon={'arrow_drop_down'} />} variant='text' onClick={popover.onOpen} sx={{ height: "auto" }}>
                {currentLang.label}
            </Button>

            {/* <IconButton
                component={m.button}
                whileTap="tap"
                whileHover="hover"
                variants={varHover(1.05)}
                onClick={popover.onOpen}
                sx={{
                    width: 40,
                    height: 40,
                    ...(popover.open && {
                        bgcolor: "action.selected",
                    }),
                }}
            >
                
            </IconButton> */}

            <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 160 }}>
                {allLangs.map((option) => (
                    <MenuItem key={option.value} selected={option.value === currentLang.value} onClick={() => handleChangeLang(option.value)}>
                        <Iconify icon={option.icon} sx={{ borderRadius: 0.65, width: 28 }} />

                        {option.label}
                    </MenuItem>
                ))}
            </CustomPopover>
        </>
    );
}
