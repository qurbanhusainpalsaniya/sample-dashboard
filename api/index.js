import axiosInstance from "utils/axios";

async function apiGetData(url, params, signal) {
    return axiosInstance.get(url, { params, signal });
}

async function axiosApiCalling(data) {
    return axiosInstance.request(data);
}

export { axiosApiCalling, apiGetData, };
