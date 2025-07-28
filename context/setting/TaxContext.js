import { useAuthContext } from "auth/hooks";
import { LoadingScreen } from "components/loading-screen";
import useApi from "hooks/useApi";
import encryptLocalStorage from "localstorage-slim";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";
import { COMPANY_API, DATE_FORMATE, STORAGE_KEY_PASSCODE, STORAGE_KEY_USER } from "utils/constant";

TaxProvider.propTypes = {
    children: PropTypes.node,
};
const TaxContext = createContext();

function TaxProvider({ children }) {
    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData, apiCalling } = useApi();
    const { isAuth, user, initialize } = useAuthContext();

    const [dateFormateList, setDateFormateList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [companyDetails, setCompanyDetails] = useState("");

    const companyID = user?.currentWorkshop?.company_id;

    // get timezone list
    async function GetDateForamte() {
        return await getApiData(DATE_FORMATE.list, "", signal);
    }

    // get company info
    async function GetProfiledata() {
        return await getApiData(COMPANY_API.get + companyID, "", signal);
    }

    async function getAllFetchData() {
        try {
            setLoading(true);
            const [resCompanyInfo, resDateFormate] = await Promise.all([GetProfiledata(), GetDateForamte()]);
            setCompanyDetails(resCompanyInfo?.data?.result);
            setDateFormateList(resDateFormate?.data?.result);
            setLoading(false);
        } catch (error) {
            controller.abort();
            console.log(error);
        }
    }

    async function handlePageRefresh(update) {
        if (update) {
            getAllFetchData();
        }
    }

    useEffect(() => {
        companyID && getAllFetchData();
        return () => {
            controller.abort();
        };
    }, [companyID]);

    async function UpdateCompanyInfo(data) {
        try {
            const response = await apiCalling({ url: COMPANY_API.companytaxinfo + companyID, data, method: 'put', });
            const result = response.data.result;
            const userInfo = {
                ...user,
                currentWorkshop: { ...user?.currentWorkshop, ...result },
            };

            console.log(userInfo)

            encryptLocalStorage.set(STORAGE_KEY_USER, userInfo, {
                encrypt: true,
                secret: STORAGE_KEY_PASSCODE,
            });
            await initialize();
            return response
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    const memoizedValue = useMemo(
        () => ({
            isAuth,
            user,
            loading,
            dateFormateList,
            companyDetails,
            handlePageRefresh,
            UpdateCompanyInfo,
        }),
        [loading, dateFormateList, companyDetails, handlePageRefresh]
    );

    return <TaxContext.Provider value={memoizedValue}>{loading ? <LoadingScreen /> : children}</TaxContext.Provider>;
}
export { TaxContext, TaxProvider };
