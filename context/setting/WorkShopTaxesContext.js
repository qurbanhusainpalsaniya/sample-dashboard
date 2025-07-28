import { useAuthContext } from "auth/hooks";
import { useLocalStorage } from "hooks/use-local-storage";
import useApi from "hooks/useApi";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";
import { TAX_API } from "utils/constant";
import { ORDER_BY_DEFAULT_FILTER } from "utils/defaultFilter";
WorkShopTaxesProvider.propTypes = {
    children: PropTypes.node,
};
const WorkShopTaxesContext = createContext();
function WorkShopTaxesProvider({ children }) {
    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData, apiCalling, } = useApi();
    const { isAuth, user } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [searchWord, setSearchWord] = useState("");
    const [itemList, setItemList] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentRangeList, setCurrentRangeList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [connectWithZohoBook, setConnectWithZohoBooks] = useState(false);

    const { state: filter, update: setFilter, reset: resetFilter } = useLocalStorage("wtaxesFilter", ORDER_BY_DEFAULT_FILTER);
    var changesInFilter = !isEqual(filter, ORDER_BY_DEFAULT_FILTER);


    async function GetItemList() {
        try {
            setLoading(true);
            const params = {
                search_keyword: searchWord || null,
                order_by_column: filter?.order_by_column,
                order_by: filter?.order_by,
                business_registered_type: "regular",
            };
            const response = await getApiData(TAX_API.list, params, signal);
            setItemList(response.data.result.company_tax_list);
            setConnectWithZohoBooks(response.data.result.book_keeping_preference == "zoho" ? true : false);
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

    async function handlePageRefresh(update) {
        if (update) {
            GetItemList();
        }
    }

    async function DeleteItem(currentItem) {
        try {
            await apiCalling({ url: TAX_API.delete + currentItem.company_tax_id, method: 'delete', });
            await GetItemList()
        } catch (err) {
            console.log(err);
        }
    }


    async function SetAsDefaultItem(currentItem) {
        try {
            await apiCalling({ url: TAX_API.updateAsDefault + currentItem.company_tax_id, method: 'put', });
            const updatePriceMatrixAsDefault = currentItem.set_as_default === "yes" ? "no" : "yes";
            setItemList((prevList) => prevList.map((item) => ({ ...item, set_as_default: item.company_tax_id === currentItem.company_tax_id ? updatePriceMatrixAsDefault : "no", })));
            setCurrentItem({ ...currentItem, set_as_default: updatePriceMatrixAsDefault });
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
            connectWithZohoBook,
            filter,
            changesInFilter,
            setFilter,
            resetFilter,
            setConnectWithZohoBooks,
            setSearchWord,
            setTotalCount,
            setCurrentRangeList,
            setCurrentItem,
            setItemList,
            handlePageRefresh,
            DeleteItem,
            SetAsDefaultItem
        }),
        [isAuth, user, loading, loadingDetails, itemList, currentItem, currentRangeList, totalCount, searchWord, filter, setFilter, changesInFilter, resetFilter, connectWithZohoBook]
    );
    return <WorkShopTaxesContext.Provider value={memoizedValue}>{children}</WorkShopTaxesContext.Provider>;
}
export { WorkShopTaxesContext, WorkShopTaxesProvider };
