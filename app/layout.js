import "../global.css";

// i18n
import "locales/i18n";

// ----------------------------------------------------------------------

import PropTypes from "prop-types";

import { LocalizationProvider } from "locales";

import ThemeProvider from "theme";
import { primaryFont } from "theme/typography";

import { MotionLazy } from "components/animate/motion-lazy";
import ProgressBar from "components/progress-bar";
import { SettingsDrawer, SettingsProvider } from "components/settings";
import SnackbarProvider from "components/snackbar/snackbar-provider";

import { AuthProvider } from "auth/context/";
import { APP_NAME } from "config-global";
import { ApiProvider } from "context/ApiContext";
import PushNotificationLayout from "context/PushNotificationLayout";

// ----------------------------------------------------------------------

export const metadata = {
    title: {
        default: APP_NAME,
        template: `%s | ${APP_NAME}`,
    },
    description: APP_NAME,
    keywords: `${APP_NAME},Employee Management,Inventory Management`,
    manifest: "/manifest.json",
    icons: [
        { rel: "icon", url: "/favicon/favicon.ico" },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            url: "/favicon/favicon-16x16.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/favicon/favicon-32x32.png",
        },
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            url: "/favicon/apple-touch-icon.png",
        },
    ],
};

export const viewport = {
    themeColor: "#000000",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={primaryFont.className}>
            <body>
                <AuthProvider>
                    <LocalizationProvider>
                        <SettingsProvider
                            defaultSettings={{
                                themeMode: "light", // 'light' | 'dark'
                                themeDirection: "ltr", //  'rtl' | 'ltr'
                                themeContrast: "default", // 'default' | 'bold'
                                themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
                                themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                                themeStretch: true,
                            }}
                        >
                            <ThemeProvider>
                                <MotionLazy>
                                    <SnackbarProvider>
                                        <ApiProvider>
                                            <SettingsDrawer />
                                            <ProgressBar />
                                            <PushNotificationLayout />

                                            {children}
                                            <noscript>You need to enable JavaScript to run this app.</noscript>
                                        </ApiProvider>
                                    </SnackbarProvider>
                                </MotionLazy>
                            </ThemeProvider>
                        </SettingsProvider>
                    </LocalizationProvider>
                </AuthProvider>
            </body>
        </html>
    );
}

RootLayout.propTypes = {
    children: PropTypes.node,
};
