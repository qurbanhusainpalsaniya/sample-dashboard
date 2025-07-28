import { memo } from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import NavList from "./nav-list";
// ----------------------------------------------------------------------
function NavSectionMini({ data, slotProps, ...other }) {
    return (
        <Stack component="nav" id="nav-section-mini" spacing={`${slotProps?.gap || 8}px`} {...other} flex={1} pt={2}>
            {data.map((group, index) => (
                <NavList key={index} data={group} depth={1} slotProps={slotProps} />
            ))}
        </Stack>
    );
}
NavSectionMini.propTypes = {
    data: PropTypes.array,
    slotProps: PropTypes.object,
};
export default memo(NavSectionMini);
