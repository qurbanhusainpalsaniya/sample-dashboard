import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";

import { paths } from "routes/paths";
import { useRouter } from "routes/hooks";

import { SplashScreen } from "components/loading-screen";

import { useAuthContext } from "../hooks";
import { PATH_AFTER_LOGIN } from "config-global";

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
    const { loading } = useAuthContext();

    return <>{loading ? <SplashScreen /> : <Container> {children}</Container>}</>;
}

AuthGuard.propTypes = {
    children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
    const router = useRouter();

    const { authenticated, user } = useAuthContext();

    const [checked, setChecked] = useState(false);

    const check = useCallback(() => {
        if (!authenticated) {
            const searchParams = new URLSearchParams({
                returnTo: window.location.pathname,
            }).toString();

            const loginPath = paths.signin;
            const href = `${loginPath}?${searchParams}`;

            router.replace(href);
        } else {
            if (user?.currentWorkshop?.company_info == "no") {
                router.replace(PATH_AFTER_LOGIN);
            }
            setChecked(true);
        }
    }, [authenticated, user, router]);

    useEffect(() => {
        check();
    }, [check]);

    if (!checked) {
        return null;
    }

    return <>{children}</>;
}

Container.propTypes = {
    children: PropTypes.node,
};
