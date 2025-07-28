import axios from "axios";
import { HOST_API } from "../config-global";

const axiosInstance = axios.create({
    baseURL: HOST_API,
    timeout: 30000,
    timeoutErrorMessage: "TIMEOUT",
    headers: {
        token: "r2905de7-0of5-44ew-f760-5a78bn12e9x3",
        key: "rcdb973a-7b1e-4052-e3w7-4e9n59dfax67",
        applicationid: "1",
        // companyId: "1",
        devicetype: "WEB",
    },
});

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject((error.response && error.response.data) || error)
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
    chat: "/api/chat",
    kanban: "/api/kanban",
    calendar: "/api/calendar",
    auth: {
        me: "/api/auth/me",
        login: "/api/auth/login",
        register: "/api/auth/register",
    },
    mail: {
        list: "/api/mail/list",
        details: "/api/mail/details",
        labels: "/api/mail/labels",
    },
    post: {
        list: "/api/post/list",
        details: "/api/post/details",
        latest: "/api/post/latest",
        search: "/api/post/search",
    },
    product: {
        list: "/api/product/list",
        details: "/api/product/details",
        search: "/api/product/search",
    },
};
