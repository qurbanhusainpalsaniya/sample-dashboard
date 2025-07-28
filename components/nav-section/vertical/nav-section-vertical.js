import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";

import Collapse from "@mui/material/Collapse";
import ListSubheader from "@mui/material/ListSubheader";
import Stack from "@mui/material/Stack";

import { darken, lighten, Typography, useTheme } from "@mui/material";
import GoogleMaterialIcon from "components/google-icon";
import NavList from "./nav-list";
import { usePathname, useActiveLink } from "routes/hooks";

// ----------------------------------------------------------------------

function NavSectionVertical({ data, slotProps, ...other }) {
    return (
        <Stack component="nav" id="nav-section-vertical" {...other}>
            {data
                .map((group, index) => (
                    <Group key={group.subheader || index} group={group} isLast={data?.length - 1 == index} items={group.items} slotProps={slotProps} />
                ))}
        </Stack>
    );
}

NavSectionVertical.propTypes = {
    data: PropTypes.array,
    slotProps: PropTypes.object,
};

export default memo(NavSectionVertical);

// ----------------------------------------------------------------------

function Group({ group, items, isLast = false, slotProps }) {
    const { subheader, showBgcolor = true, borderTopRadius = false, borderBottomRadius = false, rootPath = '' } = group || {}
    
    const pathName = usePathname();
    const active = useActiveLink(rootPath);


    const [open, setOpen] = useState(active);

    useEffect(() => {
        if (!active) {
            handleCloseMenu();
        }
    }, [pathName]);

    const handleCloseMenu = useCallback(() => {
        setOpen(false);
    }, [active]);

    const handleToggle = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);


    const renderContent = items.map((list) => <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />);

    return (
        <Stack
            sx={{
                borderTopLeftRadius: borderTopRadius ? 16 : 0,
                borderTopRightRadius: borderTopRadius ? 16 : 0,
                borderBottomLeftRadius: borderBottomRadius ? 16 : 0,
                borderBottomRightRadius: borderBottomRadius ? 16 : 0,
                mt: isLast ? 1 : 0,
                mb: !showBgcolor ? 2 : 0,
                bgcolor: !!showBgcolor ? (theme) => theme.palette?.mode === 'light' ? lighten(theme.palette.primary.main, 0.93) : 'background.neutral' : "",
                borderBottom: '1px solid',
                borderColor: (theme) => theme.palette?.mode === 'light' ? lighten(theme.palette.primary.main, 0.98) : darken(theme.palette.primary.dark, 0.8)
            }}>
            {subheader ? (
                <>
                    <ListSubheader
                        disableGutters
                        disableSticky
                        onClick={handleToggle}
                        sx={{
                            justifyContent: 'space-between',
                            cursor: "pointer",
                            typography: "overline",
                            display: "inline-flex",
                            color: "text.disabled",
                            mb: `${slotProps?.gap || 8}px`,
                            p: (theme) => theme.spacing(2, 1, 1, 1.5),
                            transition: (theme) =>
                                theme.transitions.create(["color"], {
                                    duration: theme.transitions.duration.shortest,
                                }),
                            "&:hover": {
                                color: "text.primary",
                            },
                            ...slotProps?.subheader,
                        }}
                    >
                        <Typography variant="body2" fontWeight={'bold'} textTransform={'capitalize'} > {subheader}</Typography>
                        <GoogleMaterialIcon icon={'keyboard_arrow_down'} sx={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }} />

                    </ListSubheader>

                    <Collapse in={open}>{renderContent}</Collapse>
                </>
            ) : (
                renderContent
            )}
        </Stack>
    );
}

Group.propTypes = {
    items: PropTypes.array,
    subheader: PropTypes.string,
    slotProps: PropTypes.object,
};
