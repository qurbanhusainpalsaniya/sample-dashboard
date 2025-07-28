/* eslint-disable import/no-unresolved */
import { APP_NAME } from "../config-global";
import zohoBookLogo from 'assets/logo/zohoBook.png';


export const PASSING_DATE_FORMAT = "YYYY-MM-DD";
export const TIMEOUT = "TIMEOUT";
export const INTERNET_NETWORK_ERROR = "Network Error";
export const SMALL_MODAL = "sm";
export const MEDIUM_MODAL = "md";
export const LARGE_MODAL = "lg";
export const EXTRA_LARGE_MODAL = "xl";

export const NEXT_IMAGE_QUALITY = 90;
export const DECIMAL_PLACE = 0;
export const API_PAGE_LIMIT = 15;
export const ROW_PER_PAGE_OPTION = [5, 10, 15]

// error code
export const FORCE_PUCNH_IN = 1001;
export const SESSION_EXPIRED = 440;
export const SA_RESTRICTED = 1000;
export const ADMIN_RESTRICTED = 999;

export const STORAGE_KEY_USER = "users";
export const STORAGE_KEY_PASSCODE = 1272;


export const ZOHO_BOOK_LOGO = zohoBookLogo;

export const LOGIN_COUNTRY_CODE = "+91";
export const LOGIN_RESEND_OTP_TIMER = 2;
 
export const company_name = APP_NAME;

export const TIMEZONE_API = "timezone";
export const COUNTRY_API = "country";
export const STATE_API = "state";
export const DATE_FORMATE = {
    list: "date_format",
};

export const ADMIN_COMPANY_API = {
    sendOtp: "login/sendOtp",
    login_mobile_OTP : "login",
    company_register : "company/sendOtp", 
    company_mobile_validation : "company/validateOtp", 
    login: "login",
};

export const COMPANY_API = {
    create: "company/create",
    get: "company/",
    update: "company/update",
    logo: "company/uploadMedia/",
    removelogo: "company/removeMedia/",
    profileupdate: "company/companyProfile/",
    companytaxinfo: "company/companyTaxInfo/",
    connectedWorkshopList: "company/connectedWorkshopList/",
    disconnectWorkshop: "company/disconnectWorkshop/",
    getAccessToken: "company/getAccessToken/",
    generateAccessToken: "company/generateAccessToken/",
    linkWorkshopWithAccessToken: "company/linkWorkshopWithAccessToken/",
    purchaseTaxAndDiscountConfig: "company/purchaseTaxAndDiscountConfig/",
    salesTaxAndDiscountConfig: "company/salesTaxAndDiscountConfig/",
    customizedUpdate: "company/customizedUpdate/"
}


export const TAX_API = {
    list: "company_tax",
    create: "company_tax",
    update: "company_tax/",
    delete: "company_tax/",
    getAllZohobookstax: "company_tax/getAllZohobooks",
    linkTaxtWithZohobooks: "company_tax/linkTaxtWithZohobooks/",
    updateAsDefault: "company_tax/update_as_default/",
};

export const CHART_API = {
    list: "chart_of_account_type",
};

export const CHART_OF_ACCOUNT_API = {
    list: "chart_of_account",
    create: "chart_of_account",
    update: "chart_of_account/",
    delete: "chart_of_account/",
};

export const DEFAULT_CHART_OF_ACCOUNT = {
    list: "default_chart_of_account/",
    create: "default_chart_of_account",
};

export const WORKSHOP_TYPE = {
    get: "workshop_type",
    create: "workshop_type",
    update: "workshop_type/",
    getByid: "workshop_type/",
    delete: "workshop_type/",
    uploadMedia: "workshop_type/uploadMedia/",
    uploadMediaWireFrame: "workshop_type/uploadMediaWireFrame/",
    updateAsDefault: "workshop_type/update_as_default/",
};

export const SA_WORKSHOP_TYPE = {
    get: "sa_workshop_type",
};

export const DOCUMENT_TYPE_API = {
    get: "document_type",
    create: "document_type",
    update: "document_type/",
    delete: "document_type/",
};

export const USER_API = {
    get: "user/getAll",
    
    create: "user",
    update: "user/",
    getByid: "user/",
    delete: "user/",
    uploadMedia: "user/uploadMedia/",
    removeMedia: "user/removeMedia/",
    updateRateAndCommission: "user/updateRateAndCommission/",
    getTimeClockStatus: "user/getTimeClockStatus/",
    updatestatus: "user/updateStatus/",
    EmployeePunchStatusById: "user/userStatusAndPermissions/",
    EmployeePermissions: "user/userPermissions/",
    UpdateUserPermissions: "user/updateUserPermissions/",
    getUserCreditDebitAndPaymentMade: "user/getUserCreditDebitAndPaymentMade/",
};

export const EMP_WORK_TIME_AND_CALENDAR = "emp_work_timing_and_calendar";
 
export const INVENTORY_VEHICLE = {
    get: "inventory_used_vehicle",
    create: "inventory_used_vehicle",
    update: "inventory_used_vehicle/",
    getByid: "inventory_used_vehicle/", 
    delete: "inventory_used_vehicle/",
    updateStatus: "inventory_used_vehicle/updateStatus/",
};

export const CUSTOMIZED_SET_AS_DEFAULT_API = {
    get: 'customized_set_as_default_list'
}

export const VEHICLE_MAKE_MODEL = {
    getMake: "vehicle_make_model/getAllMake",
    getModel: "vehicle_make_model/getAllModel",
    getYear: "vehicle_make_model/getAllYear",
    getSubModel: "vehicle_make_model/getAllSubModel",
    getAllEngineSize: "vehicle_make_model/getAllEngineSize",
};

export const VEHICLE_CLASSIFICATION_TYPE = {
    get: "vehicle_classification_type",
    create: "vehicle_classification_type",
    update: "vehicle_classification_type/",
    delete: "vehicle_classification_type/",
};

export const FUEL_TYPE = {
    get: "fuel_type",
    create: "fuel_type",
    update: "fuel_type/",
    delete: "fuel_type/",
};

export const TRANSMISSION_TYPE = {
    get: "transmission_type",
    create: "transmission_type",
    update: "transmission_type/",
    delete: "transmission_type/",
};

export const COLOR_MASTER = {
    get: "color",
    create: "color",
    update: "color/",
    delete: "color/",
};

export const CHART_OF_ACCOUNT_IS_FROM = {
    trackInventory: 'track_inventory',
    purchase: 'inventory_purchase_information',
    sales: 'inventory_sales_information',

    purchaseDiscount: 'bill_discount',
    paidThrough: 'payment_made_paid_through',
    vendorAdvance: 'payment_made_supplier_advance',

    depositTo: 'payment_received_deposit_to',
    customerAdvance: 'payment_received_customer_advance',

    expensePaidThrough: 'expense_paid_through',
    expensePurchase: 'expense_purchase_information',

    expenseWages: 'inventory_expense_wages',
}

export const DEFAULT_CHART_OF_ACCOUNT_KEY = {
    trackInventory: "chart_of_account_default_chart_of_account_inventory_coa_idTochart_of_account",
    purchase: "chart_of_account_default_chart_of_account_purchase_coa_idTochart_of_account",
    sales: "chart_of_account_default_chart_of_account_sales_coa_idTochart_of_account",

    purchaseDiscount: "chart_of_account_default_chart_of_account_purchase_discount_coa_idTochart_of_account",
    paidThrough: "chart_of_account_default_chart_of_account_paid_through_coa_idTochart_of_account",
    vendorAdvance: "chart_of_account_default_chart_of_account_supplier_advance_coa_idTochart_of_account",

    depositTo: "chart_of_account_default_chart_of_account_deposit_to_coa_idTochart_of_account",
    customerAdvance: "chart_of_account_default_chart_of_account_customer_advance_coa_idTochart_of_account",

    expensePaidThrough: 'chart_of_account_default_chart_of_account_expense_paid_through_coa_idTochart_of_account',
    expensePurchase: 'chart_of_account_default_chart_of_account_expense_purchase_coa_idTochart_of_account'
}

