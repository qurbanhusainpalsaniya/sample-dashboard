import { blue, green, grey, red, yellow } from "@mui/material/colors";
import GoogleMaterialIcon from "components/google-icon";
 
export const VEHICLE_OPEN = 'open';
export const VEHICLE_REFURBISHMENT = 'refurbishment';
export const VEHICLE_FOR_SALE = 'sale';
export const VEHICLE_SOLD = 'sold'; 

export const VEHICLE_STATUS = [
    { icon: <GoogleMaterialIcon fontSize="inherit" icon={'radio_button_unchecked'} filled />, color: grey, value: VEHICLE_OPEN, label: "opem" },
    { icon: <GoogleMaterialIcon fontSize="inherit" icon={'shoppingmode'} filled />, color: blue, value: VEHICLE_REFURBISHMENT, label: "refurbishment" },
    { icon: <GoogleMaterialIcon fontSize="inherit" icon={'shoppingmode'} filled />, color: green, value: VEHICLE_FOR_SALE, label: "sale" },
    { icon: <GoogleMaterialIcon fontSize="inherit" icon={'shoppingmode'} filled />, color: yellow, value: VEHICLE_SOLD, label: "sold" },    
];
