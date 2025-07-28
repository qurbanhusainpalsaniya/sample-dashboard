
import GoogleMaterialIcon from "components/google-icon";
import { useCustomPagination } from "hooks/useCustomPagination";
import { useTranslate } from "locales";
import { useMemo } from "react";
import { paths } from "routes/paths";


export function useMainNavData() {
    const { t } = useTranslate();
    const { fetchDataOptions, } = useCustomPagination();
    const currentPageWithIndex = `?page=${1}&size=${fetchDataOptions.pageSize || 15}`
    const data = useMemo(
        () => [
            {
                showBgcolor: false,
                subheader: "",
                items: [
                    {
                        title: t("dashboard"),
                        path: "/dashboard/home",
                        icon: <GoogleMaterialIcon fontSize="small" icon={'speed'} filled />,
                    },
                    {
                        title: t("Customers"),
                        path: "#",
                        icon: <GoogleMaterialIcon fontSize="small" icon={'dashboard'} filled />,
                    },
                    {
                        title: t("My Reports"),
                        path: "#",
                        icon: <GoogleMaterialIcon fontSize="small" icon={'dashboard'} filled />,
                    },
                    {
                        title: t("My Bookings"),
                        path: "#",
                        icon: <GoogleMaterialIcon fontSize="small" icon={'dashboard'} filled />,
                    },
                    {
                        title: t("My Bankings"),
                        path: "#",
                        icon: <GoogleMaterialIcon fontSize="small" icon={'dashboard'} filled />,
                    },
                    {
                        title: t("My Courses"),
                        path: "#",
                        icon: <GoogleMaterialIcon fontSize="small" icon={'dashboard'} filled />,
                    },
                    {
                        title: t("My Orders"),
                        path: "#",
                        icon: <GoogleMaterialIcon fontSize="small" icon={'dashboard'} filled />,
                    },
                ],
            }, 
        ],
        [t, fetchDataOptions]
    );
    return data;
}
