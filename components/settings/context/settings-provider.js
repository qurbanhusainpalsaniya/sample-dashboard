"use client";

import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import { useMemo, useState, useEffect, useCallback } from "react";

import { useLocalStorage } from "hooks/use-local-storage";

import { localStorageGetItem } from "utils/storage-available";

import { SettingsContext } from "./settings-context";

// ----------------------------------------------------------------------

const STORAGE_KEY = "settings";

export function SettingsProvider({ children, defaultSettings }) {
    const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);

    const [openDrawer, setOpenDrawer] = useState(false);

    const isArabic = localStorageGetItem("i18nextLng") === "ar";

    useEffect(() => {
        if (isArabic) {
            onChangeDirectionByLang("ar");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isArabic]);

    useEffect(() => {
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
        // update("themeMode", darkModeQuery.matches ? "dark" : "light");

        const handleDarkModeChange = (event) => {
            update("themeMode", event.matches ? "dark" : "light");
        };
        darkModeQuery.addEventListener("change", handleDarkModeChange);
        return () => {
            darkModeQuery.removeEventListener("change", handleDarkModeChange);
        };
    }, [update]);

    // Direction by lang
    const onChangeDirectionByLang = useCallback(
        (lang) => {
            update("themeDirection", lang === "ar" ? "rtl" : "ltr");
        },
        [update]
    );

    // Drawer
    const onToggleDrawer = useCallback(() => {
        setOpenDrawer((prev) => !prev);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setOpenDrawer(false);
    }, []);

    const canReset = !isEqual(state, defaultSettings);

    const memoizedValue = useMemo(
        () => ({
            ...state,
            onUpdate: update,
            // Direction
            onChangeDirectionByLang,
            // Reset
            canReset,
            onReset: reset,
            // Drawer
            open: openDrawer,
            onToggle: onToggleDrawer,
            onClose: onCloseDrawer,
        }),
        [reset, update, state, canReset, openDrawer, onCloseDrawer, onToggleDrawer, onChangeDirectionByLang]
    );

    return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}

SettingsProvider.propTypes = {
    children: PropTypes.node,
    defaultSettings: PropTypes.object,
};
