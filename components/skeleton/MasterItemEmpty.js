import EmptyContent from "components/empty-content";
import { useTranslate } from "locales";
import PropTypes from "prop-types";


MasterItemEmpty.propTypes = {
    isNotFound: PropTypes.bool,
};

export default function MasterItemEmpty({ isNotFound }) {
    const { t } = useTranslate();
    return (
        <>
            {
                isNotFound &&
                <EmptyContent title={t("no_data_found")} sx={{ "& span.MuiBox-root": { height: 150, width: 204 } }} />
            }
        </>
    )
}
