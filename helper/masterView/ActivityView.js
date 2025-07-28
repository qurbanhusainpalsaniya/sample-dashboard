"use client";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, Container, Paper, TablePagination, Typography } from "@mui/material";
import { useAuthContext } from "auth/hooks";
import { MasterItemEmpty, MasterItemSkeleton } from "components/skeleton";
import useApi from "hooks/useApi";
import { useTranslate } from "locales";
import { useEffect, useState } from "react";
import { API_PAGE_LIMIT, EVENT_LOG } from "utils/constant";
import { employeeFullName } from "utils/format-string";
import { timemiliesToSpecificFormat } from "utils/format-time";
import { activityStatusHelper } from "utils/statusUtil";

export default function ActivityView({ event = {} }) {
    const { t } = useTranslate();
    const { DATE_FORMAT } = useAuthContext();
    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData, } = useApi();
    const [loading, setLoading] = useState(true)
    const [itemList, setItemList] = useState([]);
    const [curentPage, setCurentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");

    async function GetItemList() {
        try {
            setLoading(true);
            const params = {
                search_keyword: null,
                order_by_column: "created_date",
                order_by: "desc",
                type: null,
                changed_value: null,
                skip: curentPage,
                take: API_PAGE_LIMIT,
                ...event,
            };
            const response = await getApiData(EVENT_LOG.get, params, signal);
            setTotalPage(~~response.data.count);
            setItemList(response.data.result);
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
    }, [curentPage, search]);

    useEffect(() => {
        setCurentPage(0);
        setItemList([]);
        setLoading(true);
    }, [search]);

    const handleChangePage = (_event, newPage) => {
        setPage(~~newPage);
        setCurentPage(~~newPage * ~~API_PAGE_LIMIT);
    };


    function ActivityItemRow({ row, index }) {
        const { statusIcon, statusText, title, color } = activityStatusHelper(row, DATE_FORMAT);
        const { event_changed, user_event_log_created_byTouser, created_date } = row
        const { first_name, last_name } = user_event_log_created_byTouser || {}
        return (
            <TimelineItem sx={{ '&::before': { flex: 0, p: 0 }, minHeight: itemList.length - 1 == index ? "auto" : 70 }}>
                < TimelineSeparator >
                    <TimelineDot sx={{ bgcolor: color }} >
                        {statusIcon}
                    </TimelineDot>
                    {itemList.length - 1 != index && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                    <Box display={'flex'} flexDirection='column'>
                        <Typography variant="body2" textTransform={'capitalize'}>{`${t(event_changed)} ${title ? `- ${title}` : ""}`}</Typography>
                        <Typography variant='caption' color={'text.secondary'}  >
                            {` ${statusText} ${user_event_log_created_byTouser ? employeeFullName(user_event_log_created_byTouser) : ""}  ${t('on')}  ${timemiliesToSpecificFormat(created_date, `${DATE_FORMAT} hh:mm A`)}`}
                        </Typography>
                    </Box>
                </TimelineContent>
            </TimelineItem>
        );
    }

    return (
        <>
            <Container maxWidth='md' disableGutters sx={{ m: 0 }}>
                <Box sx={{ p: 2 }} display='flex' flexDirection={'column'} gap={2}>
                    <Paper variant="outlined" >
                        {loading ?
                            <MasterItemSkeleton loadTime={API_PAGE_LIMIT} />
                            : itemList.length > 0
                                ?
                                <Timeline position="right"  >

                                    {itemList.map((item, _i,) => {
                                        return (
                                            <ActivityItemRow key={_i} row={item} index={_i} />
                                        );
                                    })}
                                </Timeline>
                                :
                                <MasterItemEmpty isNotFound={true} />
                        }

                        <Box sx={{ width: "100%", borderTop: (theme) => `solid 1px ${theme.palette.divider}`, }}>
                            <TablePagination
                                rowsPerPageOptions={[API_PAGE_LIMIT]}
                                component="div"
                                count={totalPage}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={~~API_PAGE_LIMIT}
                                showFirstButton
                                showLastButton
                            />
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    );
}


