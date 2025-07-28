"use client";

import { Box, Typography } from "@mui/material";
import Image from "components/image/image";
import { getMessaging, isSupported, onMessage } from "firebase/messaging";
// import { NotificationDialog } from "master";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { firebaseCloudMessaging } from "utils/firebase";

function PushNotificationLayout() {
    const { enqueueSnackbar } = useSnackbar();

    const [confirmation, setConfirmation] = useState({ status: false, data: {} });
    const [audio, setAudio] = useState(null);

    useEffect(() => {

        process.env.NODE_ENV === 'development' ? setTokenDevelopment() : setToken();
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("message", (event) => {
                console.log("event for the service worker", event)
            });
        }

        async function setTokenDevelopment() {
            try {
                const isSupportedBrowser = await isSupported();
                if (isSupportedBrowser) {
                    const token = await firebaseCloudMessaging.init();
                    token && getMessage();
                }
            } catch (error) {
                console.error('PUSH NOTIFICATION LAYOUT DEVELOPMENT:', error);
            }
        }

        async function setToken() {
            try {
                const token = await firebaseCloudMessaging.init();
                token && getMessage();
            } catch (error) {
                console.error('PUSH NOTIFICATION LAYOUT PRODUCTION:', error);
            }
        }

        // Create audio object
        const soundName = '/assets/notification.mp3';
        const newAudio = new Audio(soundName);
        setAudio(newAudio);

        // Clean up function
        return () => {
            newAudio.pause();
            newAudio.currentTime = 0;
        };
    }, []);

    function speakText(value) {
        const utterance = new SpeechSynthesisUtterance(value);
        const voices = speechSynthesis.getVoices();
        utterance.voice = voices[0];
        speechSynthesis.speak(utterance);
    }

    function getMessage() {
        const messaging = getMessaging();
        onMessage(messaging, (message) => {
            const { img_url, title, description } = message?.data || {}
            enqueueSnackbar(
                <Box display={'flex'} alignItems='center' gap={1}>
                    {img_url && <Image src={img_url} sx={{ width: 56, height: 56, borderRadius: 1 }} />}
                    <Box>
                        <Typography variant="body2">{title}</Typography>
                        <Typography variant="caption">{description}</Typography>
                    </Box>
                </Box>,
                { variant: "success", anchorOrigin: { horizontal: "right", vertical: "top" }, hideIconVariant: true, autoHideDuration: 10000 }
            )
            // speakText(message.data.title)
            audio && audio.play();
        });
    }

    function RedirectPage(data) {
        // Implement redirection logic here
    }

    function confirmationClose(value) {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        if (value.confirmation) {
            RedirectPage(confirmation.data);
        }
        setConfirmation({ status: false, data: {} });
    }

    return (
        <>
            {confirmation.status &&
                // <NotificationDialog
                //     icon={confirmation?.data?.img_url}
                //     title={confirmation?.data?.title}
                //     description={confirmation?.data?.description}
                //     open={confirmation.status}
                //     onClose={confirmationClose}
                // />
                <>
                </>
            }
        </>
    );
}

export default PushNotificationLayout;
