"use client";
import { EmailOutlined, SmsOutlined, WhatsApp } from "@mui/icons-material";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, Collapse, Container, IconButton, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { blue, green, orange } from "@mui/material/colors";
import { useAuthContext } from "auth/hooks";
import GoogleMaterialIcon from "components/google-icon";
import { LoadingScreen } from "components/loading-screen";
import { MasterItemEmpty } from "components/skeleton";
import { useBoolean } from "hooks/use-boolean";
import useApi from "hooks/useApi";
import { Fragment, memo, useEffect, useState } from "react";
import { SEND_NOTIFICATION_LOG } from "utils/constant";
import { timemiliesToSpecificFormat } from "utils/format-time";

export default function NotificationView({ event = {} }) {
    const { DATE_FORMAT } = useAuthContext();

    const controller = new AbortController();
    const { signal } = controller;
    const { getApiData, } = useApi();
    const [loading, setLoading] = useState(true)
    const [itemList, setItemList] = useState([]);


    async function GetItemList() {
        try {
            setLoading(true);
            const params = {
                search_keyword: "",
                order_by_column: "",
                order_by: "",
                ...event,
            };
            const response = await getApiData(SEND_NOTIFICATION_LOG.get, params, signal);
            setItemList(response.data.result)
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
    }, []);

    return (
        <>
            <Container maxWidth='md' disableGutters sx={{ m: 0 }}>
                <Box sx={{ p: 2 }} display='flex' flexDirection={'column'} gap={2}>
                    <Paper variant="outlined">
                        {loading ?
                            <LoadingScreen sx={{ py: 10 }} />
                            :
                            itemList.length > 0 ?
                                <Timeline position="right" sx={{ m: 0, pr: 0 }} >
                                    {itemList.map((item, _i) => {
                                        return (
                                            <Fragment key={_i}>
                                                {item.sms_body &&
                                                    <TimelineItem sx={{ '&::before': { flex: 0, p: 0 } }}>
                                                        < TimelineSeparator >
                                                            <TimelineDot sx={{ bgcolor: orange[50], color: orange[800] }} >
                                                                <SmsOutlined />
                                                            </TimelineDot>
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            <Box display={'flex'} flexDirection='column'>
                                                                <Typography variant='caption' color={'text.secondary'} sx={{ whiteSpace: "pre-line" }}>{item.sms_body || "-"}</Typography>
                                                                <Typography variant='caption' fontWeight='medium' >{`${timemiliesToSpecificFormat(item.created_date, `${DATE_FORMAT} hh:mm A`)}`}</Typography>
                                                            </Box>
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                }

                                                {item.whatsapp_body &&
                                                    <TimelineItem sx={{ '&::before': { flex: 0, p: 0 } }}>
                                                        < TimelineSeparator >
                                                            <TimelineDot sx={{ bgcolor: green[50], color: green[800] }} >
                                                                <WhatsApp color="inherit" />
                                                            </TimelineDot>
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            <Box display={'flex'} flexDirection='column'>
                                                                <Typography variant='caption' color={'text.secondary'} sx={{ whiteSpace: "pre-line" }}>{item.whatsapp_body || "-"}</Typography>
                                                                <Typography variant='caption' fontWeight='medium' >{`${timemiliesToSpecificFormat(item.created_date, `${DATE_FORMAT} hh:mm A`)}`}</Typography>
                                                            </Box>
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                }

                                                {item.email_body &&
                                                    <TimelineItem sx={{ '&::before': { flex: 0, p: 0 }, minHeight: itemList.length - 1 == _i ? "auto" : 70 }}>
                                                        < TimelineSeparator >
                                                            <TimelineDot sx={{ bgcolor: blue[50], color: blue[800] }} >
                                                                <EmailOutlined color="inherit" />
                                                            </TimelineDot>
                                                            {itemList.length - 1 != _i && <TimelineConnector />}
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            <EmailView item={item} />
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                }
                                            </Fragment>
                                        );
                                    })}
                                </Timeline>
                                :
                                <MasterItemEmpty isNotFound={true} />
                        }
                    </Paper>
                </Box>
            </Container >
        </>
    );
}

function EmailView({ item }) {
    const collapseView = useBoolean()

    const { DATE_FORMAT } = useAuthContext()

    return (
        <Box>
            <Box display={'flex'} gap={1} alignItems='center' justifyContent={'space-between'} onClick={collapseView.onToggle} sx={{ cursor: "pointer" }}>
                <Box display={'flex'} flexDirection='column'>
                    <Typography variant="body2" textTransform={'capitalize'}>{item.email_subject}</Typography>
                    <Typography variant='caption' color={'text.secondary'} >{`${timemiliesToSpecificFormat(item.created_date, `${DATE_FORMAT} hh:mm A`)}`}</Typography>
                </Box>
                <IconButton ><GoogleMaterialIcon icon={'keyboard_arrow_down'} sx={{ transform: collapseView.value ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }} /> </IconButton>
            </Box>
            <Collapse in={collapseView.value}>
                <Typography variant='caption' color={'text.secondary'} sx={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: item?.email_body }} />
            </Collapse>
        </Box>
    )
}
