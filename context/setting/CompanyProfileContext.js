import { useAuthContext } from "auth/hooks";
import { LoadingScreen } from "components/loading-screen";
import useApi from "hooks/useApi";
import encryptLocalStorage from "localstorage-slim";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";
import { COMPANY_API, STORAGE_KEY_PASSCODE, STORAGE_KEY_USER } from "utils/constant";

CompanyProfileProvider.propTypes = {
    children: PropTypes.node,
};
const CompanyProfileContext = createContext();
function CompanyProfileProvider({ children }) {
    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData, apiCalling } = useApi();
    const { isAuth, user, initialize } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [companyDetails, setCompanyDetails] = useState("");
    // get company info

    const companyID = user?.currentWorkshop?.company_id;

    async function GetProfiledata() {
        return await getApiData(COMPANY_API.get + companyID, "", signal);
    }
    async function getAllFetchData() {
        try {
            setLoading(true);
            const [resCompanyInfo, resTimeZone] = await Promise.all([GetProfiledata()]);
            setCompanyDetails(resCompanyInfo.data.result);
            setLoading(false);
        } catch (error) {
            controller.abort();
            console.log(error);
        }
    }
    async function handlePageRefresh(update) {
        if (update) {
            try {
                const resCompanyInfo = await GetProfiledata();
                setCompanyDetails(resCompanyInfo.data.result);
            } catch (error) {
                console.log(error);
            }
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
            console.log('csdcdsc');
            const response = await apiCalling({ url: COMPANY_API.profileupdate + companyID, data, method: 'put', });
            const result = response.data.result;
            const userInfo = { ...user, currentWorkshop: { ...user?.currentWorkshop, ...result }, };
            encryptLocalStorage.set(STORAGE_KEY_USER, userInfo, {
                encrypt: true,
                secret: STORAGE_KEY_PASSCODE,
            });
            await initialize();
            getAllFetchData()
        } catch (error) {
            console.log(error);
        }
    }

    async function CompanyProfileSave(data) {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => formData.append(key, value));
            const response = await apiCalling({ url: COMPANY_API.logo + companyID, data: formData, method: 'put', });
            const result = response.data.result;
            const userInfo = {
                ...user,
                currentWorkshop: {
                    ...user?.currentWorkshop,
                    media_url: result,
                },
            };
            encryptLocalStorage.set(STORAGE_KEY_USER, userInfo, {
                encrypt: true,
                secret: STORAGE_KEY_PASSCODE,
            });
            await initialize();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async function CompanyProfileDelete() {
        try {
            const response = await apiCalling({ url: COMPANY_API.removelogo + companyID, method: 'delete', });
            const userInfo = { ...user, currentWorkshop: { ...user?.currentWorkshop, media_url: "" } };
            encryptLocalStorage.set(STORAGE_KEY_USER, userInfo, { encrypt: true, secret: STORAGE_KEY_PASSCODE, });
            await initialize();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async function UpdateCompanyPurchaseInfo(data) {
        try {
            await apiCalling({ url: COMPANY_API.purchaseTaxAndDiscountConfig + companyID, data, method: 'put', });
            await getAllFetchData()
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async function UpdateCompanySalesInfo(data) {
        try {
            await apiCalling({ url: COMPANY_API.salesTaxAndDiscountConfig + companyID, data, method: 'put', });
            await getAllFetchData()
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
            companyDetails,
            setCompanyDetails,
            handlePageRefresh,
            UpdateCompanyInfo,
            CompanyProfileSave,
            CompanyProfileDelete,
            UpdateCompanyPurchaseInfo,
            UpdateCompanySalesInfo
        }),
        [isAuth, user, loading, companyDetails, handlePageRefresh]
    );
    return <CompanyProfileContext.Provider value={memoizedValue}>{loading ? <LoadingScreen /> : children}</CompanyProfileContext.Provider>;
}
export { CompanyProfileContext, CompanyProfileProvider };
