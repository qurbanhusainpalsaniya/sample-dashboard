import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { memo, useCallback, useState } from "react";

import Box from "@mui/material/Box";
import Dialog, { dialogClasses } from "@mui/material/Dialog";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";

import { useRouter } from "routes/hooks";

import { useBoolean } from "hooks/use-boolean";
import { useEventListener } from "hooks/use-event-listener";
import { useResponsive } from "hooks/use-responsive";

import Iconify from "components/iconify";
import Label from "components/label";
import Scrollbar from "components/scrollbar";
import SearchNotFound from "components/search-not-found";

import { TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import GoogleMaterialIcon from "components/google-icon";
import { useTranslate } from "locales";
import ResultItem from "./result-item";
import { applyFilter, getAllItems, groupedData } from "./utils";

// ----------------------------------------------------------------------

function Searchbar() {
    const { t } = useTranslate();

    const theme = useTheme();

    const router = useRouter();

    const search = useBoolean();

    const lgUp = useResponsive("up", "lg");

    const [searchQuery, setSearchQuery] = useState("");

    const navData = []

    const handleClose = useCallback(() => {
        search.onFalse();
        setSearchQuery("");
    }, [search]);

    const handleKeyDown = (event) => {
        if (event.key === "k" && event.metaKey) {
            search.onToggle();
            setSearchQuery("");
        }
    };

    useEventListener("keydown", handleKeyDown);

    const handleClick = useCallback(
        (path) => {
            if (path.includes("http")) {
                window.open(path);
            } else {
                router.push(path);
            }
            handleClose();
        },
        [handleClose, router]
    );

    const handleSearch = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    const dataFiltered = applyFilter({
        inputData: getAllItems({ data: navData }),
        query: searchQuery,
    });

    const notFound = searchQuery && !dataFiltered.length;

    const renderItems = () => {
        const data = groupedData(dataFiltered);

        return Object.keys(data)
            .sort((a, b) => -b.localeCompare(a))
            .map((group, index) => (
                <List key={group || index} disablePadding>
                    {data[group].map((item) => {
                        const { title, path } = item;

                        const partsTitle = parse(title, match(title, searchQuery));

                        const partsPath = parse(path, match(path, searchQuery));

                        return <ResultItem path={partsPath} title={partsTitle} key={`${title}${path}`} groupLabel={searchQuery && group} onClickItem={() => handleClick(path)} />;
                    })}
                </List>
            ));
    };

    const renderButton = (
        <TextField
            hiddenLabel
            variant="filled"
            type={"search"}
            size="small"
            placeholder={t("search")}
            InputProps={{ startAdornment: (<InputAdornment position="start"><GoogleMaterialIcon icon={'search'} fontSize="small" color="disabled" /></InputAdornment>) }}
            sx={{
                '& .MuiInputBase-root': {
                    outline: "1px solid",
                    outlineColor: 'divider'
                },
                ml:1
            }}
        />
    );

    return (
        <>
            {renderButton}

            <Dialog
                fullWidth
                maxWidth="sm"
                open={search.value}
                onClose={handleClose}
                transitionDuration={{
                    enter: theme.transitions.duration.shortest,
                    exit: 0,
                }}
                PaperProps={{
                    sx: {
                        mt: 15,
                        overflow: "unset",
                    },
                }}
                sx={{
                    [`& .${dialogClasses.container}`]: {
                        alignItems: "flex-start",
                    },
                }}
            >
                <Box
                    sx={{
                        p: 3,
                        borderBottom: `solid 1px ${theme.palette.divider}`,
                    }}
                >
                    <InputBase
                        fullWidth
                        autoFocus
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                        startAdornment={
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" width={24} sx={{ color: "text.disabled" }} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <Label
                                sx={{
                                    letterSpacing: 1,
                                    color: "text.secondary",
                                }}
                            >
                                esc
                            </Label>
                        }
                        inputProps={{
                            sx: { typography: "h6" },
                        }}
                    />
                </Box>

                <Scrollbar sx={{ p: 3, pt: 2, height: 400 }}>{notFound ? <SearchNotFound query={searchQuery} sx={{ py: 10 }} /> : renderItems()}</Scrollbar>
            </Dialog>
        </>
    );
}

export default memo(Searchbar);
