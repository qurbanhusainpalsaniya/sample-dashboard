const ROOTS = {
    AUTH: "/auth",
    AUTH_DEMO: "/auth-demo",
    DASHBOARD: "/dashboard",
    PRODUCTIVITY: "/productivity",
    WORKFLOW: "/workflow",
    CALENDAR: "/calendar",
    PURCHASE: "/purchase",
    ITEMS: "/items",
    REPORTS: "/reports",
    
    SETTING: "/setting",
    SALES: "/sales",
};
export const paths = {
    root: "/",
    signin: "/signin",
    register: "/register",
    forgotPassword: "/forgot-password",

    setting: {
        company: `${ROOTS.SETTING}/company`,
        profile: `${ROOTS.SETTING}/company/profile`,
        dealershipType: `${ROOTS.SETTING}/company/dealership_type`,
        documentType: `${ROOTS.SETTING}/company/document_type`,
        taxAndRates: `${ROOTS.SETTING}/tax_rates`,
        accounts: `${ROOTS.SETTING}/accounts`,
        
        user: `${ROOTS.SETTING}/user`,
    },
    sales: { 
        vehicles: `${ROOTS.SALES}/vehicles`,
    },

    dashboard: {
        root: ROOTS.DASHBOARD,
        home: `${ROOTS.DASHBOARD}/home`,
        gettingStarted: `${ROOTS.DASHBOARD}/getting_started`,
    },

    productivity: {
        employees: `${ROOTS.PRODUCTIVITY}/employees`,
        timeclocks: `${ROOTS.PRODUCTIVITY}/timeclocks`,
    },
    calendar: {
        root: ROOTS.CALENDAR,
        appointment: `${ROOTS.CALENDAR}/appointment`,
        workSchedule: `${ROOTS.CALENDAR}/work_schedule`,
    },
    workflow: {
        root: ROOTS.WORKFLOW,
        customers: `${ROOTS.WORKFLOW}/customers`,
        vehicles: `${ROOTS.WORKFLOW}/vehicles`,
        inspections: `${ROOTS.WORKFLOW}/inspections`,
        estimate: `${ROOTS.WORKFLOW}/estimate`,
        board: `${ROOTS.WORKFLOW}/workorder/board`,
        workorder: `${ROOTS.WORKFLOW}/workorder/list`,
        invoice: `${ROOTS.WORKFLOW}/invoice`,
        paymentReceived: `${ROOTS.WORKFLOW}/payment_received`,
        documentRenewal: `${ROOTS.WORKFLOW}/document_renewal`,
        serviceReminder: `${ROOTS.WORKFLOW}/service_reminder`,
        recurringService: `${ROOTS.WORKFLOW}/recurring_service`,
        deferredService: `${ROOTS.WORKFLOW}/deferred_service`,
    },

    purchase: {
        root: ROOTS.PURCHASE,
        vendor: `${ROOTS.PURCHASE}/vendor`,
        expense: `${ROOTS.PURCHASE}/expense`,
        partIssuance: `${ROOTS.PURCHASE}/parts_issuance`,
        partRequisition: `${ROOTS.PURCHASE}/parts_requisition`,
        purchaseOrder: `${ROOTS.PURCHASE}/purchase_order`,
        bill: `${ROOTS.PURCHASE}/bill`,
        paymentsMade: `${ROOTS.PURCHASE}/payments_made`,
    },

    items: {
        root: ROOTS.ITEMS,
        part: `${ROOTS.ITEMS}/part`,
        tire: `${ROOTS.ITEMS}/tire`,
        labour: `${ROOTS.ITEMS}/labour`,
        cannedService: `${ROOTS.ITEMS}/canned_service`,
        usedVehicle: `${ROOTS.ITEMS}/used_vehicle`,
    },
    report: {
        root: ROOTS.REPORTS,
        employees: `${ROOTS.REPORTS}/employee`,
        inventory: `${ROOTS.REPORTS}/inventory`,
    }
};
