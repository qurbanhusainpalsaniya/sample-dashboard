import { Icon } from "@mui/material";
import PropTypes from "prop-types";


function GoogleMaterialIcon({ icon, filled = false, fontSize = 'small', sx, ...other }) {
    return (

        <Icon
            fontSize={fontSize}
            baseClassName={`material-symbols-rounded googleIcon ${filled ? "filled" : ""}`}
            sx={{  ...sx, }}
            {...other}
        >
            {icon}
        </Icon>
    );

}

GoogleMaterialIcon.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string]),
    sx: PropTypes.object,
    fontSize: PropTypes.oneOf(['small', 'medium', 'large', 'inherit'])
};

export default GoogleMaterialIcon;