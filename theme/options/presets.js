import { alpha } from "@mui/material/styles";

import { grey, primary } from "../palette";

// ----------------------------------------------------------------------

export function createPresets(preset) {
    const primaryColor = getPrimary(preset);
    const theme = {
        palette: {
            primary: primaryColor,
        },
        customShadows: {
            primary: `0 8px 16px 0 ${alpha(`${primaryColor?.main}`, 0.24)}`,
        },
    };

    return {
        ...theme,
    };
}

// ----------------------------------------------------------------------

const cyan = {
    lighter: "#CCF4FE",
    light: "#68CDF9",
    main: "#078DEE",
    dark: "#0351AB",
    darker: "#012972",
    contrastText: "#FFFFFF",
};

const purple = {
    lighter: "#B49DE3",
    light: "#927BC8",
    main: "#6750A4",
    dark: "#4E3A8D",
    darker: "#392876",
    contrastText: "#FFFFFF",
};

const green = {
    lighter: '#5AE284',
    light: '#31C66E',
    main: '#00A152',
    dark: '#008A54',
    darker: '#007352',
    contrastText: '#FFFFFF',
  };

const orange = {
    lighter: "#FEF4D4",
    light: "#FED680",
    main: "#fda92d",
    dark: "#B66816",
    darker: "#793908",
    contrastText: grey[800],
};

const red = {
    lighter: "#FFE3D5",
    light: "#FFC1AC",
    main: "#FF3030",
    dark: "#B71833",
    darker: "#7A0930",
    contrastText: "#FFFFFF",
};

export const presetOptions = [
    { name: "default", value: primary.main },
    { name: "cyan", value: cyan.main },
    { name: "purple", value: purple.main },
    { name: "green", value: green.main },
    { name: "orange", value: orange.main },
    { name: "red", value: red.main },
];

export function getPrimary(preset) {
    return {
        default: primary,
        cyan,
        purple,
        green,
        orange,
        red,
    }[preset];
}
