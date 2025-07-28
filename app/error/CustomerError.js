import { AccessDenied, ModuleAccessDenied, OtherError } from "sections/error";
import { ADMIN_RESTRICTED, SA_RESTRICTED } from "utils/constant";

export default function CustomerError({ error }) {
    if (error.status == ADMIN_RESTRICTED) {
        return <AccessDenied />;
    } else if (error.status == SA_RESTRICTED) {
        return <ModuleAccessDenied />;
    } else {
        return <OtherError error={error} />
    }
}
