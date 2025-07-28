"use client";

import PropTypes from "prop-types";
import { useMemo, useEffect, useReducer, useCallback } from "react";
import axios, { endpoints } from "utils/axios";
import { AuthContext } from "./auth-context";
import { setSession } from "utils/utils";
import encryptLocalStorage from "localstorage-slim";
import { PASSING_DATE_FORMAT, STORAGE_KEY_PASSCODE, STORAGE_KEY_USER } from "utils/constant";
import moment from "moment-timezone";
import { paths } from "routes/paths";

import { useRouter } from "next/navigation";



const initialState = {
    user: null,
    loading: true,
};

const reducer = (state, action) => {
    if (action.type === "INITIAL") {
        return {
            loading: false,
            user: action.payload.user,
        };
    }
    if (action.type === "LOGIN") {
        return {
            ...state,
            user: action.payload.user,
        };
    }
    if (action.type === "REGISTER") {
        return {
            ...state,
            user: action.payload.user,
        };
    }
    if (action.type === "LOGOUT") {
        return {
            ...state,
            user: null,
        };
    }
    return state;
};

const STORAGE_KEY = "accessToken";

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();

    const initialize = useCallback(async () => {
        try {
            const user = encryptLocalStorage.get(STORAGE_KEY_USER, {
                decrypt: true,
                secret: STORAGE_KEY_PASSCODE,
            });
            if (user) {
                setSession(user);
                user?.currentWorkshop?.timezone && moment.tz.setDefault(user?.currentWorkshop?.timezone);
                dispatch({ type: "INITIAL", payload: { user: user } });
            } else {
                dispatch({ type: "INITIAL", payload: { user: null } });
            }
        } catch (error) {
            dispatch({ type: "INITIAL", payload: { user: null } });
        }
    }, []);

    useEffect(() => {
        initialize();
    }, [initialize]);

    const login = useCallback(async (user) => {
        const userInfo = { ...user, currentWorkshop: { ...user?.company, company_id: user?.company_id } };
        setSession(userInfo);
        encryptLocalStorage.set(STORAGE_KEY_USER, userInfo, { encrypt: true, secret: STORAGE_KEY_PASSCODE, });
        dispatch({ type: "LOGIN", payload: { user: userInfo } });
    }, []);

    // REGISTER
    const register = useCallback(async (email, password, firstName, lastName) => {
        const data = { email, password, firstName, lastName };
        const response = await axios.post(endpoints.auth.register, data);
        const { accessToken, user } = response.data;
        sessionStorage.setItem(STORAGE_KEY, accessToken);
        dispatch({
            type: "REGISTER",
            payload: {
                user: {
                    ...user,
                    accessToken,
                },
            },
        });
    }, []);

    // LOGOUT
    const logout = useCallback(async () => {
        if (typeof window !== "undefined") {
            window?.localStorage.removeItem(STORAGE_KEY_USER);
            setSession(null);
        }
        dispatch({ type: "LOGOUT" });
        router.replace(paths.root);
    }, []);

    const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

    const status = state.loading ? "loading" : checkAuthenticated;

    const memoizedValue = useMemo(() => {
        const user = state.user;
        const currentWorkshop = user?.currentWorkshop;
        const country = currentWorkshop?.country;
        return {
            initialize,
            login,
            register,
            logout,
            user,
            method: "jwt",
            loading: status === "loading",
            authenticated: status === "authenticated",
            unauthenticated: status === "unauthenticated",
            DECIMAL_VALUE: country?.decimal_value ?? 2,
            CURRENCY_SYMBOL: country?.currency_symbol ?? "₹",
            DATE_FORMAT: currentWorkshop?.web_date_format ?? PASSING_DATE_FORMAT,
            CURRENCY_NAME: country?.currency ?? "INR",
            SHOW_HSN_CODE: country?.phonecode == "91",
            businessRegister: currentWorkshop?.business_registered == 'yes' || false
        };
    }, [initialize, login, logout, register, state.user, status]);

    return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};
