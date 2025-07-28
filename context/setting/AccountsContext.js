import CustomerError from "app/error/CustomerError";
import { useAuthContext } from "auth/hooks";
import { useLocalStorage } from "hooks/use-local-storage";
import useApi from "hooks/useApi";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "routes/hooks";
import { CHART_OF_ACCOUNT_API } from "utils/constant";
import { CHART_ACCOUNT_DEFAULT_FILTER } from "utils/defaultFilter";
AccountsProvider.propTypes = {
    children: PropTypes.node,
};
const AccountsContext = createContext();
function AccountsProvider({ children }) {
    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData, apiCalling, apiCallBack } = useApi();
    const { isAuth, user } = useAuthContext();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [searchWord, setSearchWord] = useState("");
    const [itemList, setItemList] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentRangeList, setCurrentRangeList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [connectWithZohoBook, setConnectWithZohoBooks] = useState(false);

    const { state: filter, update: setFilter, reset: resetFilter } = useLocalStorage("accFilter", CHART_ACCOUNT_DEFAULT_FILTER);
    var changesInFilter = !isEqual(filter, CHART_ACCOUNT_DEFAULT_FILTER);

    const api_link = CHART_OF_ACCOUNT_API.list;

    async function GetItemList() {
        try {
            setLoading(true);
            const params = {
                search_keyword: searchWord,
                order_by_column: filter?.order_by_column,
                order_by: filter?.order_by,
                group_by: filter?.group_by != 'all' ? [filter?.group_by] : null,
            };
            const response = await getApiData(api_link, params, signal, api_link);
            setItemList(response.data.result?.chart_of_accounts_list || []);
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
    }, [user, searchWord, filter]);

    async function handlePageRefresh(update) {
        if (update) {
            GetItemList();
        }
    }

    async function DeleteItem(row) {
        try {
            await apiCalling({ url: CHART_OF_ACCOUNT_API.delete + row.chart_of_account_id, method: 'delete', });
            handlePageRefresh(true);
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
            DeleteItem
        }),
        [isAuth, user, loading, loadingDetails, itemList, currentItem, currentRangeList, totalCount, searchWord, filter, setFilter, changesInFilter, resetFilter, connectWithZohoBook]
    );
    return <AccountsContext.Provider value={memoizedValue}>{apiCallBack?.requests[api_link]?.error ? <CustomerError error={apiCallBack?.requests[api_link]?.error} /> : children}</AccountsContext.Provider>;
}
export { AccountsContext, AccountsProvider };
