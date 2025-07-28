"use client";
import { useEffect, useState } from "react";
import { CUSTOMIZED_SET_AS_DEFAULT_API } from "utils/constant";
import useApi from "./useApi";


export default function useDefaultValue({ referenceData = '', ...params }) {
    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData } = useApi();
    const [defaultValue, setDefaultValue] = useState('')
    const [loadingDefault, setLoadingDefault] = useState(true)

    useEffect(() => {
        async function GetSetAsDefault() {
            setLoadingDefault(true);
            try {
                const response = await getApiData(CUSTOMIZED_SET_AS_DEFAULT_API.get, params, signal);
                setDefaultValue(response.data?.result)
            } catch (error) {
                console.log(error);
            }
            setLoadingDefault(false);
        }
        if (!referenceData) {
            GetSetAsDefault();
        }
        return () => {
            controller.abort();
        };
    }, [referenceData]);


    return {
        defaultValue,
        loadingDefault,
    };
}

