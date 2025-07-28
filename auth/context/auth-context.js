"use client";

import { createContext } from "react";
import { PASSING_DATE_FORMAT } from "utils/constant";

// ----------------------------------------------------------------------

export const AuthContext = createContext({
    CURRENCY_SYMBOL: "₹",
    DATE_FORMAT: PASSING_DATE_FORMAT,
    DECIMAL_VALUE: 2,
    CURRENCY_NAME: "INR",
    user: null,
    businessRegister: false,
    SHOW_HSN_CODE: false
});
