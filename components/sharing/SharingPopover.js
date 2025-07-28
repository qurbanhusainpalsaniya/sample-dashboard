import AlternateEmail from "@mui/icons-material/AlternateEmail";
import CallOutlined from "@mui/icons-material/CallOutlined";
import WhatsApp from "@mui/icons-material/WhatsApp";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import { usePopover } from "components/custom-popover";
import GoogleMaterialIcon from "components/google-icon";
import { useTranslate } from "locales";
import dynamic from "next/dynamic";


const CustomPopover = dynamic(() => import("components/custom-popover/custom-popover"));


export default function SharingPopover({ phoneNumber = "", email = "", icon = <GoogleMaterialIcon icon={'forum'} fontSize="small" /> }) {
    const popover = usePopover();
    const { t } = useTranslate();
    return (
        <>
            {(phoneNumber || email) && <IconButton color={popover.open ? "inherit" : "default"} onClick={(e) => { popover.onOpen(e); e.stopPropagation(); }}>
                {icon}
            </IconButton>}

            <CustomPopover open={popover.open} onClose={(e) => { popover.onClose(e); e.stopPropagation(); }} arrow="right-top" sx={{ minWidth: 140 }}>
                {phoneNumber &&
                    <Link href={`tel:${phoneNumber.replaceAll(' ', '')}`} target='_blank' underline='none' color={'inherit'} onClick={(e) => { e.stopPropagation(); popover.onClose(e) }}>
                        <MenuItem>
                            <CallOutlined fontSize="small" /> {t("call")}
                        </MenuItem>
                    </Link>
                }
                {email &&
                    <Link href={`mailto:${email}`} target='_blank' underline='none' color={'inherit'} onClick={(e) => { e.stopPropagation(); popover.onClose(e) }}>
                        <MenuItem>
                            <AlternateEmail fontSize="small" /> {t("email")}
                        </MenuItem>
                    </Link>
                }
                {phoneNumber &&
                    <Link href={`https://wa.me/${phoneNumber.replaceAll(' ', '')}`} target='_blank' underline='none' color={'inherit'} onClick={(e) => { e.stopPropagation(); popover.onClose(e) }}>
                        <MenuItem>
                            <WhatsApp fontSize="small" /> {t("whatsapp")}
                        </MenuItem>
                    </Link>
                }
            </CustomPopover>
        </>
    );
}
