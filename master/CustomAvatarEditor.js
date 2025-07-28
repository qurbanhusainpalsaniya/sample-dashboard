import { Box, CircularProgress, IconButton, Paper, Slider, Typography } from "@mui/material";
import LauncherIcon from "assets/logo/LauncherIcon";
import { fileData } from "components/file-thumbnail";
import GoogleMaterialIcon from "components/google-icon";
import { useTranslate } from "locales";
import { useEffect, useMemo, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import dataURLtoFile, { imageToFile } from "utils/dataURLtoFile";
export default function CustomAvatarEditor({ onSaveAvatar, onDeleteAvatar, avatar, }) {
    const editorRef = useRef(null);
    const { t } = useTranslate();
    const [image, setImage] = useState(null);
    const [initialPosition, setInitialPosition] = useState({ x: 0.5, y: 0.5 });
    const [currentScale, setCurrentScale] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    let borderRadius = 4;
    let width = 275;
    let height = 275;

    useEffect(() => {
        const getImageLinkToFile = async () => {
            try {
                setLoading(true)
                const createdFile = await imageToFile(avatar);
                setImage(createdFile);
            } catch (error) {
                console.error("Error converting image to Base64:");
            }
            finally {
                setLoading(false)
            }
        };
        if (avatar) {
            typeof avatar == 'string' ? getImageLinkToFile(avatar) : setImage(avatar)
        } else {
            setImage(null)
        }
    }, [avatar]);
    const handleSave = async () => {
        setIsLoading(true);
        try {
            const img = editorRef.current?.getImageScaledToCanvas().toDataURL();
            const { name, } = fileData(image);
            let createdFile = dataURLtoFile(img, name)
            const data = { file: createdFile };
            const response = await onSaveAvatar(data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };
    const handleDelete = async () => {
        try {
            setIsLoadingDelete(true)
            await onDeleteAvatar();
            setImage(null);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingDelete(false)
        }
    };
    const logCallback = (e) => {
        console.log("callback", e);
    };

    const handleScaleChange = (newScale) => {
        setCurrentScale(newScale);
    };

    useEffect(() => {
        if (currentScale !== 1 || initialPosition.x !== 0.5 || initialPosition.y !== 0.5) {
            setIsEdited(true);
        } else {
            setIsEdited(false);
        }
    }, [currentScale, initialPosition]);



    const handlePositionChange = (position) => {
        setInitialPosition(position);
    };
    const handleImageChange = () => {
        setIsEdited(true);
    };
    return (
        <Box display={"flex"} alignItems="center" justifyContent={"center"} flexDirection="column" gap={2}>
            <Dropzone onDrop={([image]) => setImage(image)} noClick={image} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                    <Paper
                        variant="outlined"
                        {...getRootProps()}
                        sx={{
                            height: height,
                            minWidth: width,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {image ? (
                            <>
                                <AvatarEditor
                                    crossOrigin="anonymous"
                                    id='canvas'
                                    ref={editorRef}
                                    scale={currentScale}
                                    width={width - 20}
                                    height={height - 20}
                                    position={initialPosition}
                                    color={[255, 255, 255]} // RGBA
                                    border={0}
                                    image={image}
                                    onPositionChange={handlePositionChange}
                                    borderRadius={width / (100 / borderRadius)}
                                    onLoadFailure={() => logCallback("onLoadFailed")}
                                    onLoadSuccess={() => logCallback("onLoadSuccess")}
                                    onImageChange={handleImageChange}
                                />
                            </>
                        ) : (
                            loading
                                ? <CircularProgress />
                                :
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                                    <input {...getInputProps()} />
                                    <LauncherIcon sx={{  opacity: 0.1 }} />
                                    <Typography mt={4} variant="body2" fontWeight={'medium'} color='text.secondary' >{t("drop_or_click_to_select_an_image")}</Typography>
                                </Box>
                        )}
                    </Paper>
                )}
            </Dropzone>
            {image && (
                <Box display={"flex"} alignItems="center" justifyContent={"space-between"} width={width}>
                    <Box flex={0.9}>
                        <Slider min={1} max={3} step={0.01} size='medium' value={currentScale} onChange={(e) => handleScaleChange(parseFloat(e.target.value))} />
                    </Box>
                    <Box display={"flex"} gap={1} alignItems="stretch">
                        {isLoadingDelete ?
                            <CircularProgress size={36} />
                            :
                            <IconButton variant='outlined' color="inherit" onClick={() => handleDelete()}>
                                <GoogleMaterialIcon icon={'delete'} sx={{ color: "error.main" }} filled />
                            </IconButton>
                        }

                        {isLoading ?
                            <CircularProgress size={36} />
                            :
                            isEdited &&
                            <IconButton variant='contained' color="success" onClick={() => handleSave()} >
                                <GoogleMaterialIcon icon={'done'} />
                            </IconButton>
                        }
                    </Box>
                </Box>
            )}
        </Box>
    );
}
