import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";

import { useRouter, useSearchParams } from "routes/hooks";
import { paths } from "routes/paths";

import { SplashScreen } from "components/loading-screen";

import { useAuthContext } from "../hooks";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
    const { loading } = useAuthContext();

    return <>{loading ? <SplashScreen /> : <Container> {children}</Container>}</>;
}

GuestGuard.propTypes = {
    children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
    const router = useRouter();

    const searchParams = useSearchParams();

    // const returnTo = searchParams.get('returnTo') || paths.dashboard.home;
    const returnTo = paths.dashboard.home;

    const { authenticated } = useAuthContext();

    const check = useCallback(() => {
        if (authenticated) {
            router.replace(returnTo);
        }
    }, [authenticated, returnTo, router]);

    useEffect(() => {
        check();
    }, [check]);

    return <>{children}</>;
}

Container.propTypes = {
    children: PropTypes.node,
};
