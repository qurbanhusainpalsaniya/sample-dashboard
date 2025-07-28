import { useAuthContext } from "auth/hooks";
import { useLocalStorage } from "hooks/use-local-storage";
import useApi from "hooks/useApi";
import { useCustomPagination } from "hooks/useCustomPagination";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";
import { useParams } from "routes/hooks";
import { paths } from "routes/paths";
import { USER_API } from "utils/constant";
import { EMPLOYEE_FILTER } from "utils/defaultFilter";
UserProvider.propTypes = {
    children: PropTypes.node,
};
const UserContext = createContext();
function UserProvider({ children }) {
    const controller = new AbortController();
    const { signal } = controller;
    const controller2 = new AbortController();
    const { signal2 } = controller2;
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


    const { state: filter, update: setFilter, reset: resetFilter } = useLocalStorage("empFilter", EMPLOYEE_FILTER);

    const { status, order_by, order_by_column, ...DefaultFilterWithOrder } = EMPLOYEE_FILTER
    const { status: filterStatus, order_by: orderby, order_by_column: orderbyColumn, ...CurrentFilter } = filter

    const changesInFilter = useMemo(() => !isEqual(CurrentFilter, DefaultFilterWithOrder), [filter]);


    const { fetchDataOptions, handleCloseItem } = useCustomPagination()


    async function GetItemList(Options) {
        try {
            setLoading(true);
            const data = {
                take: Options.pageSize,
                skip: Options.pageIndex * Options.pageSize,
                search_keyword: searchWord || null,
                order_by_column: filter?.order_by_column,
                order_by: filter?.order_by,
                ...(filter?.status && filter.status !== 'all' && { status: filter.status }), 
            };

            const response = await apiCalling({ url: USER_API.get, data, method: 'post', signal });
            setItemList(response.data.result?.user_list);
            setTotalCount(response.data.count);
            setShowError({ status: false, data: '' })
            setLoading(false);
        } catch (error) {
            controller.abort();
            console.log(error);
            error.message != "canceled" && setShowError({ status: true, data: error })
        }
    }
    useEffect(() => {
        user && GetItemList(fetchDataOptions);
        return () => {
            controller.abort();
        };
    }, [user, fetchDataOptions, searchWord, filter?.order_by, filter?.order_by_column, filter?.status]);

    async function GetCurrentItemDetails() {
        setLoadingDetails(true);
        try {
            const id = atob(decodeURIComponent(params.id));
            const response = await getApiData(USER_API.getByid + id, '', signal2);
            setCurrentItem(response.data.result);
            setShowError({ status: false, data: '' })
            setLoadingDetails(false);
        } catch (error) {
            console.log(error);
            error.status == 404 && handleCloseItem(paths.setting.user)
            error.message != "canceled" && setShowError({ status: true, data: error })
        }
    }
    useEffect(() => {
        if (params.id) {
            // setCurrentItem('')
            GetCurrentItemDetails();
        }
        return () => {
            controller2.abort();
        };
    }, [params.id, user]);

    async function handlePageRefresh(update) {
        if (update) {
            GetItemList(fetchDataOptions);
            if (params.id) {
                GetCurrentItemDetails();
            }
        }
    }

    async function handlePageRefreshDtails(update) {
        update && GetCurrentItemDetails();
    }
 
    async function UserUpdateStatus(data) {
        console.log(data);
        try {
            await apiCalling({ url: USER_API.updatestatus + data.user_id, method: 'put', });
            handlePageRefresh(true);
        } catch (err) {
            console.log(err);
        }
    }

    async function UserUploadPhoto(data) {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => formData.append(key, value));
            const response = await apiCalling({ url: USER_API.uploadMedia + currentItem.user_id, data: formData, method: 'put', });
            setItemList(prevList => prevList.map(item => item.email === currentItem.email ? { ...item, media_url: response.data.result } : item));
            return response

        } catch (error) {
            throw error
        }
    }

    async function UserRemovePhoto() {
        try {
            const response = await apiCalling({ url: USER_API.removeMedia + currentItem.user_id, method: 'delete', });
            setItemList(prevList => prevList.map(item => item.email === currentItem.email ? { ...item, media_url: null } : item));
            return response
        } catch (error) {
            throw error
        }
    }

    async function updateRateAndCommission(data) {
        try {
            await apiCalling({ url: USER_API.updateRateAndCommission + currentItem.user_id, data, method: 'put', });
            handlePageRefresh(true);
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
            employeeList: itemList,
            currentUser: currentItem,
            totalCount,
            searchWord,
            filter,
            changesInFilter,
            showError,
            setFilter,
            resetFilter,
            setSearchWord,
            setTotalCount,
            setCurrentItem,
            setItemList,
            handlePageRefresh, 
            UserUpdateStatus,
            UserUploadPhoto,
            UserRemovePhoto,
            updateRateAndCommission,
            handlePageRefreshDtails,
        }),
        [isAuth, user, loading, loadingDetails, itemList, currentItem, totalCount, searchWord, filter, setFilter, resetFilter, handlePageRefreshDtails, handlePageRefresh, changesInFilter, showError]
    );
    return <UserContext.Provider value={memoizedValue}>{children}</UserContext.Provider>;
}
export { UserContext, UserProvider };
