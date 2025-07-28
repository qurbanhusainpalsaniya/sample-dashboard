import { InputAdornment, TextField } from "@mui/material";
import GoogleMaterialIcon from "components/google-icon";
import { useTranslate } from "locales";

export default function SearchBar({ setSearchWord, searchWord, fullWidth = false, sx, placeholder = '', variant = 'filled' }) {
    const { t } = useTranslate();

    return (
        <TextField
            fullWidth={fullWidth}
            hiddenLabel
            variant={variant}
            type={"search"}
            onChange={(e) => setSearchWord(e.target.value)}
            size="small"
            value={searchWord}
            placeholder={placeholder ? placeholder : t("search")}
            InputProps={{ startAdornment: (<InputAdornment position="start"><GoogleMaterialIcon icon={'search'} sx={{ color: "text.disabled" }} /></InputAdornment>) }}
            sx={{
                ...sx,
                '& .MuiInputBase-root': {
                    outline: "1px solid",
                    outlineColor: 'transparent'
                },
                ".MuiInputBase-root.Mui-focused": {
                    bgcolor: 'background.paper',
                    outline: '2px solid',
                    outlineColor: "primary.main"
                }

            }}
        />
    );
}