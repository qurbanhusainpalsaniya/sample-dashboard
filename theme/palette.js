import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

// SETUP COLORS

export const grey = {
    0: "#FFFFFF",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
};

export const primary = {
    lighter: '#CBD8FE',
    light: '#6485FA',
    main: '#002CF1',
    dark: '#0019AD',
    darker: '#000C73',
    contrastText: '#FFFFFF',
};

export const secondary = {
    lighter: "#C8FAD6",
    light: "#5BE49B",
    main: "#00A261",
    dark: "#007867",
    darker: "#004B50",
    contrastText: "#FFFFFF",
};

export const info = {
    lighter: "#A3BAC5",
    light: "#6D899A",
    main: "#475569",
    dark: "#2D3B45",
    darker: "#131B23",
    contrastText: "#FFFFFF",
};

export const success = {
    lighter: "#C8FAD6",
    light: "#5BE49B",
    main: "#00A261",
    dark: "#007867",
    darker: "#004B50",
    contrastText: "#FFFFFF",
};

export const warning = {
    lighter: "#FDF8D7",
    light: "#FBE293",
    main: "#FBC02D",
    dark: "#BC9200",
    darker: "#7E6100",
    contrastText: "#FFFFFF",
};

export const error = {
    lighter: "#FFC9C2",
    light: "#FF8373",
    main: "#DC2626",
    dark: "#A30000",
    darker: "#730000",
    contrastText: "#FFFFFF",
};

export const common = {
    black: "#000000",
    white: "#FFFFFF",
};

export const action = {
    hover: alpha(grey[500], 0.08),
    selected: alpha(grey[500], 0.16),
    disabled: alpha(grey[500], 0.8),
    disabledBackground: alpha(grey[500], 0.24),
    focus: alpha(grey[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
};

export const customBreakpoints = {
    values: {
        xs: 0,
        sm: 640,
        md: 900,
        lg: 1200,
        xl: 1536,
    },
};

const base = {
    primary,
    secondary,
    info,
    success,
    warning,
    error,
    grey,
    common,
    divider: alpha(grey[500], 0.2),
    action,
};


// ----------------------------------------------------------------------

export function palette(mode) {
    const light = {
        ...base,
        mode: "light",
        text: {
            primary: grey[800],
            secondary: grey[600],
            disabled: grey[500],
        },
        background: {
            paper: "#FFFFFF",
            default: "#FFFFFF",
            neutral: "#F6F2F7",
        },
        action: {
            ...base.action,
            active: grey[600],
        },
    };

    const dark = {
        ...base,
        mode: "dark",
        text: {
            primary: "#FFFFFF",
            secondary: grey[500],
            disabled: grey[600],
        },
        background: {
            paper: grey[900],
            default: grey[900],
            neutral: alpha(grey[500], 0.12),
        },
        action: {
            ...base.action,
            active: grey[500],
        },
    };

    return mode === "light" ? light : dark;
}
