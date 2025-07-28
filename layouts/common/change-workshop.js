import { Box, IconButton, ListItemButton, Tooltip, Typography } from "@mui/material";
import { useAuthContext } from "auth/hooks";
import GoogleMaterialIcon from "components/google-icon";
// import { WorkshopMaster } from "master";
import { useState } from "react";
import { maxChracterShow } from "utils/format-string";

// ----------------------------------------------------------------------
export default function ChangeWorkshop() {
    const { user } = useAuthContext();
    const [openModal, setOpenModal] = useState(false);
    async function openModalClose() {
        setOpenModal(false);
    }

    return (
        <>
            {user?.currentWorkshop?.name &&
                <>
                    <Box sx={{ m: 1, mx: 2, display: "flex" }}>
                        <ListItemButton onClick={() => setOpenModal(true)} sx={{ borderRadius: 3, p: (theme) => theme.spacing(0.5, 1, 0.5, 1.5), }}  >
                            <Tooltip title={user?.currentWorkshop?.name} arrow>
                                <Box gap={1} display='flex' alignItems={'center'} width={1} flex={1}>
                                    <GoogleMaterialIcon filled icon={'garage_home'} />
                                    <Typography variant="caption" fontWeight={'medium'} noWrap  >{user?.currentWorkshop?.name}</Typography>
                                </Box>
                            </Tooltip>
                        </ListItemButton>

                        <IconButton color="primary">
                            <GoogleMaterialIcon filled icon={'settings'} />
                        </IconButton>
                    </Box>
                    {/*                     
                    <CardActionArea
                        onClick={() => setOpenModal(true)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: (theme) => theme.spacing(0.5, 1, 0.5, 1.5),
                            minHeight: 38,
                            justifyContent: 'space-between',
                        }} >
                        <Tooltip title={user?.currentWorkshop?.name} arrow >
                            <Box gap={1} display='flex' alignItems={'center'} width={100} flex={1}>
                                <Avatar alt={user?.currentWorkshop?.name} src={user?.currentWorkshop?.media_url} sx={{ width: 26, height: 26 }} />
                                <Typography variant="body2" fontWeight={'medium'} noWrap >{user?.currentWorkshop?.name}</Typography>
                            </Box>
                        </Tooltip>
                        <GoogleMaterialIcon icon={'expand_more'} color="inherit" fontSize="small" />
                    </CardActionArea> */}
                    {/* <Button
                        startIcon={ }
                        endIcon={<KeyboardArrowDownOutlined />}
                        onClick={() => setOpenModal(true)}
                    >
                        {user?.currentWorkshop?.name}
                    </Button> */}
                    {/* <IconButton onClick={() => setOpenModal(true)}>
                        <Tooltip title={user?.currentWorkshop?.name} arrow >
                            <Avatar alt={user?.currentWorkshop?.name} src={user?.currentWorkshop?.media_url} sx={{ width: 24, height: 24 }}>
                                <Typography variant="caption" fontWeight={"bold"}>
                                    {getFirstCharacter(user?.currentWorkshop?.name)}
                                </Typography>
                            </Avatar>
                        </Tooltip>
                    </IconButton> */}
                </>
            }
            {/* {openModal && <WorkshopMaster open={openModal} onClose={openModalClose} />} */}
        </>
    );
}
