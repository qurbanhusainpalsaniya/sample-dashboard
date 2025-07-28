import { useAuthContext } from "auth/hooks";
import { useLocalStorage } from "hooks/use-local-storage";
import useApi from "hooks/useApi";
import { useCustomPagination } from "hooks/useCustomPagination";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";
import { useParams } from "routes/hooks";
import { paths } from "routes/paths";
import { INVENTORY_VEHICLE } from "utils/constant";
import { OLD_VEHICLE_FILTER } from "utils/defaultFilter";


VehicleProvider.propTypes = {
    children: PropTypes.node,
};
const VehicleContext = createContext();
function VehicleProvider({ children }) {
    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData, apiCalling } = useApi();
    const { isAuth, user } = useAuthContext();
    const params = useParams(); 
    const [loading, setLoading] = useState(true);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [searchWord, setSearchWord] = useState("");
    const [itemList, setItemList] = useState([]);
    const [currentItem, setCurrentItem] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [showError, setShowError] = useState({ status: false, data: '' });

    const { fetchDataOptions, handleCloseItem } = useCustomPagination()


    const { state: filter, update: setFilter, reset: resetFilter } = useLocalStorage("oldVehicleFilter", OLD_VEHICLE_FILTER);

    const { status, order_by, order_by_column, ...DefaultFilterWithOrder } = OLD_VEHICLE_FILTER
    const { status: filterStatus, order_by: orderby, order_by_column: orderbyColumn, ...CurrentFilter } = filter

    const changesInFilter = useMemo(() => !isEqual(CurrentFilter, DefaultFilterWithOrder), [filter]);

    async function GetItemList(Options) {
        try { 
            setLoading(true);
            const params = {
                take: Options.pageSize,
                skip: Options.pageIndex * Options.pageSize,
                search_keyword: searchWord,
                order_by_column: orderbyColumn,
                order_by: orderby,
                status: filterStatus == "all" ? null : filterStatus,
                track_inventory: filter?.type == 'inventory_items' ? "yes" : filter?.type == 'non_inventory_items' ? "no" : null,
                sales_information: filter?.type == 'sales' ? "yes" : null,
                purchase_information: filter?.type == 'purchase' ? "yes" : null,
                inventory_category_id: filter?.inventory_category?.inventory_category_id || null,
            };
            const response = await getApiData(INVENTORY_VEHICLE.get, params, signal);
            setItemList(response.data.result);
            setTotalCount(response.data.count);
            setShowError({ status: false, data: '' })
        } catch (error) {
            controller.abort();
            error.message != "canceled" && setShowError({ status: true, data: error })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        GetItemList(fetchDataOptions)
        return () => {
            controller.abort();
        };
    }, [user, fetchDataOptions, searchWord, orderby, orderbyColumn, filterStatus, filter?.type, filter?.inventory_category]);


    async function GetCurrentItemDetails() {
        setLoadingDetails(true);
        try {
            const id = atob(decodeURIComponent(params.id));
            var response = await getApiData(INVENTORY_VEHICLE.getByid + id) 
            setCurrentItem(response.data.result);
            setLoadingDetails(false);
            setShowError({ status: false, data: '' })
        } catch (error) {
            console.log(error);
            error.status == 404 && handleCloseItem(paths.items.usedVehicle)
            error.message != "canceled" && setShowError({ status: true, data: error })
        }
    }
    useEffect(() => {
        if (params.id) {
            GetCurrentItemDetails();
        }
    }, [params.id]);
    async function handlePageRefresh(update) {
        if (update) {
            GetItemList(fetchDataOptions)
            if (params.id) {
                GetCurrentItemDetails();
            }
        }
    }

    async function DeleteItem(item) {
        try {
            await apiCalling({ url: INVENTORY_VEHICLE.delete + item.inventory_id, method: 'delete', });
            handleCloseItem(paths.sales.vehicles)
            GetItemList(fetchDataOptions)
        } catch (error) {
            throw error
        }
    }

    async function UpdateItemStatus(item) {
        try {
            await apiCalling({ url: INVENTORY_VEHICLE.updateStatus + item.inventory_id, method: 'put', });
            handlePageRefresh(true)
        } catch (error) {
            throw error
        }
    }

    const memoizedValue = useMemo(
        () => ({
            isAuth,
            user,
            loading,
            loadingDetails,
            itemList,
            currentItem,
            totalCount,
            searchWord,
            filter,
            changesInFilter,
            showError,
            resetFilter,
            setFilter,
            setSearchWord,
            setTotalCount,
            setCurrentItem,
            setItemList,
            handlePageRefresh,
            DeleteItem,
            UpdateItemStatus
        }),
        [isAuth, user, loading, loadingDetails, itemList, currentItem, totalCount, searchWord, filter, changesInFilter, resetFilter, setFilter, showError]
    );
    return <VehicleContext.Provider value={memoizedValue}>{children}</VehicleContext.Provider>;
}
export { VehicleContext, VehicleProvider };
