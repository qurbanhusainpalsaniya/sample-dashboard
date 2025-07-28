import { grey, indigo, lightBlue, lime, orange, purple, red, teal, yellow } from "@mui/material/colors";
import { VEHICLE_STATUS } from "./statusConstant";
import { t } from "i18next";
 
export function vehicleStatusHelper(status) {
    const statusData = VEHICLE_STATUS.find(s => s.value == status) || {};
    return {
        statusIcon: statusData.icon || "",
        statusText: t(statusData.value) || "",
        iconColor: statusData.color || grey,
    };
}
    