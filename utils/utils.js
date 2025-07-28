// eslint-disable-next-line import/no-unresolved

import axiosInstance from "./axios";

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }
    return true;
};

const setSession = (customer) => {
    if (customer) {
        axiosInstance.defaults.headers.companyid = customer?.currentWorkshop?.company_id || customer?.company_id;
        axiosInstance.defaults.headers.logincompanyid = customer.company_id;
        axiosInstance.defaults.headers.userid = customer.user_id;
        axiosInstance.defaults.headers.logintoken = customer.web_token;
        axiosInstance.defaults.headers.timezone = customer.timezone;
        // axiosInstance.defaults.headers.inventorymastercompanyid = customer?.currentWorkshop?.inventory_master_company_inventory_master_idToinventory_master?.company_id;
        // axiosInstance.defaults.headers.inventorymasterid = customer?.currentWorkshop?.inventory_master_company_inventory_master_idToinventory_master?.inventory_master_id;
    } else {
        delete axiosInstance.defaults.headers.companyid;
        delete axiosInstance.defaults.headers.logincompanyid;
        delete axiosInstance.defaults.headers.userid;
        delete axiosInstance.defaults.headers.logintoken;
        delete axiosInstance.defaults.headers.timezone;
        // delete axiosInstance.defaults.headers.inventorymastercompanyid;
        // delete axiosInstance.defaults.headers.inventorymasterid;
    }
};

const setTimezoneTypeHesetader = (currentTimezone) => {
    if (currentTimezone) {
        axiosInstance.defaults.headers.timezone = currentTimezone;
    } else {
        delete axiosInstance.defaults.headers.timezone;
    }
};
const setLanguage = (currentlanguage) => {
    if (currentlanguage) {
        axiosInstance.defaults.headers.common["Accept-Language"] = "en";
        axiosInstance.defaults.headers.language = currentlanguage;
    } else {
        delete axiosInstance.defaults.headers.language;
    }
};

export { isValidToken, setSession, setTimezoneTypeHesetader, setLanguage };
