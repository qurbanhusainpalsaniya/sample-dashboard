"use client";
import { useEffect, useState } from "react";
import { TEMPLET_API } from "utils/constant";
import useApi from "./useApi";


export default function useGetTemplate(type_array) {
    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData } = useApi();
    const [template, setTemplate] = useState([])
    const [loadingDefault, setLoadingDefault] = useState(true)


    useEffect(() => {
        async function GetSetAsDefault() {
            setLoadingDefault(true);
            try {
                const params = { type_array };
                const response = await getApiData(TEMPLET_API.getByType, params, signal);
                setTemplate(response.data?.result)
            } catch (error) {
                console.log(error);
            }
            setLoadingDefault(false);
        }
        if (type_array.length > 0) {
            GetSetAsDefault();
        }
        return () => {
            controller.abort();
        };
    }, []);


    return {
        template,
        loadingDefault,
    };
}

