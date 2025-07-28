import { forwardRef } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import { alpha, styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { RouterLink } from "routes/components";
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

// eslint-disable-next-line react/display-name
const NavItem = forwardRef(({ title, path, icon, disabled, roles, active, hasChild, externalLink, currentRole = "admin", ...other }, ref) => {
    const renderContent = (
        <Tooltip title={title} arrow placement="right">
            <Box display={'flex'} flexDirection='column' alignItems={'center'}>
                <StyledNavItem disableGutters ref={ref} active={active} disabled={disabled} {...other}>
                    <Box className="icon"  >{icon}</Box>
                </StyledNavItem>
                {title && <Typography variant="captionSmall" textAlign={'center'} >{title}</Typography>}
            </Box>
        </Tooltip>
    );

    // Hidden item by role
    if (roles && !roles.includes(`${currentRole}`)) {
        return null;
    }
    if (externalLink)
        return (
            <Link href={path} target="_blank" rel="noopener" color="inherit" underline="none" sx={{ width: 1 }}>
                {renderContent}
            </Link>
        );

    return (
        <Link
            component={RouterLink}
            href={`/${path}`}
            color="inherit"
            underline="none"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: 1,
                ...(disabled && { cursor: "default" }),
                mt: path == 'setting/companyprofile' ? "auto" : "",
            }}
        >
            {renderContent}
        </Link>
    );
});
export default NavItem;

const StyledNavItem = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== "active",
})(({ active, theme }) => {
    const lightMode = theme.palette.mode === "light";
    const noWrapStyles = {
        width: "100%",
        maxWidth: "100%",
        display: "block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    };
    const baseStyles = {
        item: {
            borderRadius: 8,
            color: theme.palette.text.secondary,
            display: "flex",
        },
        icon: {
            width: 24,
            height: 24,
            flexShrink: 0,
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center'
        },
        label: {
            textTransform: "capitalize",
        },
        caption: {
            color: theme.palette.text.disabled,
        },
    };
    return {
        ...baseStyles.item,
        fontSize: 10,
        minHeight: 42,
        width: 42,
        lineHeight: "16px",
        textAlign: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(0.5),
        // margin: theme.spacing(0, 1),
        fontWeight: theme.typography.fontWeightSemiBold,
        "& .icon": {
            ...baseStyles.icon,
        },
        ...(active && {
            fontWeight: theme.typography.fontWeightBold,
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            color: lightMode ? theme.palette.primary.main : theme.palette.primary.light,
            "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.16),
            },
        }),
        "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            "& .icon": {
                color: lightMode ? theme.palette.primary.main : theme.palette.primary.light,
            },
        },
    };
});
