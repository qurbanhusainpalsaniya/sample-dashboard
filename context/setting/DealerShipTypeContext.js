import { useAuthContext } from "auth/hooks";
import { useLocalStorage } from "hooks/use-local-storage";
import useApi from "hooks/useApi";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "routes/hooks";
import { paths } from "routes/paths";
import { PRICEMATRIX_API, WORKSHOP_TYPE } from "utils/constant";
import { WORK_CALENDAR_FILTER } from "utils/defaultFilter";



DealerShipTypeProvider.propTypes = {
    children: PropTypes.node,
};
const DealerShipTypeContext = createContext();
function DealerShipTypeProvider({ children }) {
    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData, apiCalling, } = useApi();
    const { isAuth, user } = useAuthContext();  
    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [searchWord, setSearchWord] = useState("");
    const [itemList, setItemList] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentRangeList, setCurrentRangeList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const { state: filter, update: setFilter, reset: resetFilter } = useLocalStorage("wtypeFilter", WORK_CALENDAR_FILTER);
    var changesInFilter = !isEqual(filter, WORK_CALENDAR_FILTER);

    async function GetItemList() {
        try {
            setLoading(true);
            const params = {
                search_keyword: searchWord,
                order_by_column: filter?.order_by_column,
                order_by: filter?.order_by,
            };
            const response = await getApiData(WORKSHOP_TYPE.get, params, signal);
            setItemList(response.data.result);
            setTotalCount(response.data.count);
            setLoading(false);
        } catch (error) {
            controller.abort();
            console.log(error);
        }
    }
    useEffect(() => {
        GetItemList();
        return () => {
            controller.abort();
        };
    }, [user, searchWord, filter?.order_by_column, filter?.order_by]);
    async function GetCurrentItemDetails(id) {
        setLoadingDetails(true);
        try {
            const response = await getApiData(PRICEMATRIX_API.getByid + id);
            const price_range = response.data.result.price_ranges;
            setCurrentRangeList(price_range);
            setCurrentItem(response.data.result);
            setLoadingDetails(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (params.id) {
            const id = atob(decodeURIComponent(params.id));
            GetCurrentItemDetails(id);
        }
    }, [params.id]);
    async function handlePageRefresh(update) {
        if (update) {
            GetItemList();
        }
    }

    async function DefaultSet(data) {
        try {
            await apiCalling({ url: WORKSHOP_TYPE.updateAsDefault + data.workshop_type_id, method: 'put', });
            const updatePriceMatrixAsDefault = data.set_as_default === "yes" ? "no" : "yes";
            setItemList((prevList) => prevList.map((item) => ({ ...item, set_as_default: item.workshop_type_id === data.workshop_type_id ? updatePriceMatrixAsDefault : "no", })));
            setCurrentItem({ ...data, set_as_default: updatePriceMatrixAsDefault });
        } catch (err) {
            console.log(err);
        }
    }

    async function DeleteItem(currentItem) {
        try {
            await apiCalling({ url: WORKSHOP_TYPE.delete + currentItem.workshop_type_id, method: 'delete', });
            setItemList((prevList) => prevList.filter((item) => item.workshop_type_id != currentItem.workshop_type_id))
            router.push(paths.setting.dealershipType);
        } catch (err) {
            console.log(err);
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
            currentRangeList,
            totalCount,
            searchWord,
            filter,
            changesInFilter,
            setFilter,
            resetFilter,
            setSearchWord,
            setTotalCount,
            setCurrentRangeList,
            setCurrentItem,
            setItemList,
            handlePageRefresh,
            DefaultSet,
            DeleteItem
        }),
        [isAuth, user, loading, loadingDetails, itemList, currentItem, currentRangeList, totalCount, searchWord, filter, changesInFilter, setFilter, resetFilter]
    );
    return <DealerShipTypeContext.Provider value={memoizedValue}>{children}</DealerShipTypeContext.Provider>;
}
export { DealerShipTypeContext, DealerShipTypeProvider };
