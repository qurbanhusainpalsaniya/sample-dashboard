"use client";

import merge from "lodash/merge";
import PropTypes from "prop-types";
import { useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, lighten, darken, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { useLocales } from "../locales";

import { useSettingsContext } from "../components/settings";

// system
import { palette, customBreakpoints } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";
// options
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { customShadows } from "./custom-shadows";
import { createContrast } from "./options/contrast";
import { createPresets } from "./options/presets";
import RTL from "./options/right-to-left";
import { componentsOverrides } from "./overrides";

// import moment from "moment";
// import 'moment/locale/fr'; 
// import 'moment/locale/vi';
// import 'moment/locale/zh-cn';
// import 'moment/locale/ar'; 

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
    const { currentLang } = useLocales();

    const settings = useSettingsContext();

    const presets = createPresets(settings.themeColorPresets);

    const contrast = createContrast(settings.themeContrast, settings.themeMode);


    const memoizedValue = useMemo(
        () => ({
            palette: {
                ...palette(settings.themeMode),
                ...presets.palette,
                ...contrast.palette,
                background: {
                    ...palette(settings.themeMode)?.background,
                    dialog: settings.themeMode == 'light' ? lighten(presets?.palette?.primary?.lighter, 0.8) : darken(presets?.palette?.primary?.dark, 0.8),
                }
            },
            customShadows: {
                ...customShadows(settings.themeMode),
                ...presets.customShadows,
            },
            direction: settings.themeDirection,
            shadows: shadows(settings.themeMode),
            shape: { borderRadius: 8 },
            typography,
            breakpoints: {
                ...customBreakpoints
            }
        }),
        [settings.themeMode, settings.themeDirection, presets.palette, presets.customShadows, contrast.palette]
    );


    const theme = createTheme(memoizedValue);

    theme.components = merge(componentsOverrides(theme), contrast.components);


    const themeWithLocale = useMemo(() => createTheme(theme, currentLang.systemValue), [currentLang.systemValue, theme]);


    // useEffect(()=>{
    //     moment.locale(currentLang?.momentLocale)
    // },[currentLang])


    return (
        <AppRouterCacheProvider options={{ key: 'css' }}>
            <MuiThemeProvider theme={themeWithLocale}>
                <RTL themeDirection={settings.themeDirection}>
                    <CssBaseline />
                    {children}
                </RTL>
            </MuiThemeProvider>
        </AppRouterCacheProvider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node,
};
