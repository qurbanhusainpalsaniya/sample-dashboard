import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "routes/hooks";
import { ROW_PER_PAGE_OPTION } from "utils/constant";

export function useCustomPagination(pagePath = '') {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();

    const page = isNaN(searchParams.get("page")) ? 1 : Number(searchParams.get("page"));
    const size = ROW_PER_PAGE_OPTION.includes(Number(searchParams.get("size"))) ? Number(searchParams.get("size")) : 15;

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: page > 0 ? page - 1 : 0,
        pageSize: size > 0 ? size : 15,
    }); 

    useEffect(() => {
        const pageValue = parseInt(page);
        const newSize = parseInt(size);
        const needsUpdate = pageValue - 1 !== pageIndex || newSize !== pageSize;
        if (needsUpdate) {
            let pageIndexValue = '';
            if(page === 0){
                pageIndexValue = 0;
            }
            if(page > 0){
                pageIndexValue = pageValue - 1;
            }
            setPagination({
                pageIndex: pageIndexValue,
                pageSize: newSize,
            });
            if ((searchParams.get("size") && !ROW_PER_PAGE_OPTION.includes(newSize)) || isNaN(pageValue)) {
                const params = new URLSearchParams(searchParams);
                params.set('page', pageValue);
                params.set('size', newSize);
                router.push(`${pathName}?${params}`);
            }
        }
    }, [page, size, pageIndex, pageSize, searchParams, router, pathName]);


    const updatePagination = useCallback((newPageIndex, newPageSize) => {
        setPagination({
            pageIndex: newPageIndex,
            pageSize: newPageSize,
        });
    }, []);

    const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

    const fetchDataOptions = useMemo(() => {
        return { pageIndex, pageSize };
    }, [pageIndex, pageSize]);

    const updateSearchParams = useCallback((newPage, newSize) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage + 1);
        params.set('size', newSize);
        router.push(`${pagePath}?${params}`);
    }, [searchParams, pagePath, router]);

    const handleChangePage = useCallback((event, newPage) => {
        updatePagination(newPage, pageSize);
        updateSearchParams(newPage, pageSize);
    }, [pageSize, updatePagination, updateSearchParams]);

    const handleChangeRowsPerPage = useCallback((event) => {
        const newSize = event?.target ? event.target.value : event.pageSize;
        const newPage = event?.page || 0;
        updatePagination(newPage, parseInt(newSize));
        updateSearchParams(newPage, newSize);
    }, [updatePagination, updateSearchParams]);

    const handleChangeItem = useCallback((path, id) => {
        const params = new URLSearchParams(searchParams.toString());
        router.push(`${path}/${id}?${params}`);
    }, [searchParams, router]);

    const handleCloseItem = useCallback((path) => {
        router.push(`${path}?page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`);
    }, [pagination.pageIndex, pagination.pageSize, router]);

    return {
        pagination,
        fetchDataOptions,
        handleChangePage,
        handleChangeRowsPerPage,
        handleChangeItem,
        handleCloseItem,
    };
}
