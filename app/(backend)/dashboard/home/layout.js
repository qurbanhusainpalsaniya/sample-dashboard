"use client";

import { AuthGuard } from "auth/guard";
import { LoadingScreen } from "components/loading-screen";
import CustomLayout from "layouts/custom";
import PropTypes from "prop-types";
import { Suspense } from "react";

export default function Layout({ children }) {
    return (
            <CustomLayout>
                <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
            </CustomLayout>
    );
}

Layout.propTypes = {
    children: PropTypes.node,
};
