"use client";
import { apiGetData, axiosApiCalling } from "api";
import { useAuthContext } from "auth/hooks";
import { useTranslate } from "locales"; 
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { createContext, useReducer, useState } from "react";
import { useRouter } from "routes/hooks";
import { ADMIN_RESTRICTED, FORCE_PUCNH_IN, INTERNET_NETWORK_ERROR, SA_RESTRICTED, SESSION_EXPIRED, TIMEOUT } from "utils/constant";
import { APP_NAME } from "../config-global";

const ApiContext = createContext({});

ApiProvider.propTypes = {
    children: PropTypes.node,
};

const initialState = {
    requests: {},
};

const apiReducer = (state, action) => {
    const { type, requestId, payload } = action;
    switch (type) {
        case "REQUEST":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [requestId]: { loading: true, data: null, error: null },
                },
            };
        case "SUCCESS":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [requestId]: { loading: false, data: payload, error: null },
                },
            };
        case "ERROR":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [requestId]: { loading: false, data: null, error: payload },
                },
            };
        default:
            return state;
    }
};
function ApiProvider({ children }) {
    const { t } = useTranslate();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { logout, user } = useAuthContext();
    const companyID = user?.currentWorkshop?.company_id;
    const [state, dispatch] = useReducer(apiReducer, initialState);

    const [punchInModal, setPunchInModal] = useState(false);
    function punchInModalClose(value) {
        setPunchInModal(false);
        value.update && window.location.reload()
    }
    async function apiCalling(requestObject) {
        const { showToast = true, method } = requestObject;
        try {
            const response = await axiosApiCalling(requestObject);
            const message = response?.data?.message;
            (showToast && message && message != 'Success') && enqueueSnackbar(message, { variant: "success" });
            return response;
        } catch (error) {
            checkError(error, showToast);
            throw error;
        }
    }

    async function getApiData(url, params = '', signal = "", showToast = true, requestId) {
        if (companyID) {
            try {
                dispatch({ type: "REQUEST", requestId });
                const response = await apiGetData(url, params, signal);
                dispatch({ type: "SUCCESS", payload: response.data, requestId });
                return response;
            } catch (error) {
                checkError(error, showToast, true);
                dispatch({ type: "ERROR", payload: error, requestId });
                throw error;
            }
        } else {
            handleLogout()
        }
    }
    const handleLogout = async () => {
        try {
            await logout();
            router.replace("/");
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Unable to logout!", { variant: "error" });
        }
    };
    function checkError(error, showToast = true, isGetMethod = false) {
        if (error.message == TIMEOUT) {
            enqueueSnackbar(t("error_slow_internet_connection"), {
                variant: "error",
            });
        } else if (error.message == INTERNET_NETWORK_ERROR) {
            enqueueSnackbar(t("error_internet_connection", { placeholder: APP_NAME }), {
                variant: "error",
            });
        } else {
            if (error.status == SESSION_EXPIRED) {
                handleLogout();
            }
            else if (error.status == SA_RESTRICTED || error.status == ADMIN_RESTRICTED) {
                !isGetMethod && enqueueSnackbar(error.message || t('error_something_went_wrong'), { variant: "error" })
            }
            else if (error.status == FORCE_PUCNH_IN) {
                setPunchInModal(true);
                !isGetMethod && enqueueSnackbar(error.message || t('error_something_went_wrong'), { variant: "error" })
            } else {
                console.error(error)
                error.message != "canceled" && showToast && enqueueSnackbar(error.message || t('error_something_went_wrong'), { variant: "error" });
            }
        }
    }
    return (
        <ApiContext.Provider
            value={{
                apiCalling,
                getApiData,
                apiCallBack: state,
                dispatch,
            }}
        > 

            {children}
        </ApiContext.Provider>
    );
}
export { ApiContext, ApiProvider };
