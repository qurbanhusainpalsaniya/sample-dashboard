export const ORDER_BY_DEFAULT_FILTER = {
    order_by: "asc",
    order_by_column: "created_date",
};

export const EMPLOYEE_FILTER = {
    order_by: "asc",
    order_by_column: "created_date",
    status: "all",
    punch_status: "all",
    statusKey: "status",
    statusValue: "all"
};

export const WORK_CALENDAR_FILTER = {
    order_by: "asc",
    order_by_column: "title",
};

export const VEHICLE_FILTER = {
    workshop_type: null,
    make: [],
    transmission: [],
    classification_type: [],
    order_by: "asc",
    order_by_column: "created_date",
    status: "all",
};

export const CUSTOMER_FILTER = {
    order_by: "asc",
    order_by_column: "created_date",
    status: "all",
    customer_type_array: []
};

export const CHART_ACCOUNT_DEFAULT_FILTER = {
    order_by: "asc",
    order_by_column: "created_date",
    group_by: "all",
};

export const PART_FILTER = {
    order_by: "asc",
    order_by_column: "title",
    status: "all",
    type: "all",
    inventory_category: null,
};
export const SERVICE_GROUP_FILTER = {
    order_by: "asc",
    order_by_column: "title",
    status: "all",
    inventory_category: null,
};
export const TIRE_FILTER = {
    order_by: "asc",
    order_by_column: "title",
    seasonality: "all",
    status: "all",
    type: "all",
    inventory_category: null,
};

export const INVENTORY_FILTER = {
    order_by: "asc",
    order_by_column: "created_date",
    inventory_type: "part",
    seasonality: "all",
    status: "all",
    type: "all",
};

export const SERVICE_FILTER = {
    order_by: "asc",
    order_by_column: "title",
    status: "all",
    type: "all",
    inventory_category: null,
};

export const OLD_VEHICLE_FILTER = {
    order_by: "asc",
    order_by_column: "created_date",
    status: "all",
    type: "all",
    inventory_category: null,
};

export const VEHICLE_INVENTORY_FILTER = {
    workshop_type: [],
    make: [],
    transmission: [],
    classification_type: [],
    order_by: "asc",
    order_by_column: "created_date",
    inventory_type: "vehicle",
};

export const WORK_ORDER_FILTER = {
    order_by: "asc",
    order_by_column: "workorder_date",
    section: [],
    user: null,
    from: null,
    to: null,
    department: null,
    workorder_status: []
};

export const VENDOR_FILTER = {
    order_by: "asc",
    order_by_column: "first_name",
    status: "all",
};

export const APPOINTMENT_FILTER = {
    order_by: "desc",
    order_by_column: "from_date_time",
    from: null,
    to: null,
    user: null,
    view: "dayGridMonth",
    technician_user: null,
    appointment_status_array: []
};



export const BILL_FILTER = {
    order_by: "desc",
    order_by_column: "bill_date",
    status: "all",
};

export const PURCHASE_FILTER = {
    order_by: "desc",
    order_by_column: "purchase_order_date",
    status: "all",
};

export const INVOICE_FILTER = {
    order_by: "desc",
    order_by_column: "invoice_date",
};

export const PAYMENT_MADE_FILTER = {
    order_by: "desc",
    order_by_column: "payment_date",
    status: "all",
};

export const EXPENSE_FILTER = {
    order_by: "desc",
    order_by_column: "expense_date",
    status: "all",
};


export const WORKSCHEDULE_FILTTER = {
    order_by: "asc",
    order_by_column: "created_date",
    section: [],
    workorder_status: [],
    from: null,
    to: null,
    view: "dayGridMonth",
    user: null,
    department: null,
    start_and_delivery_date_filter: "start_and_delivery_date_one_has_value"
};


export const VEHICLE_INSPECTION_FILTER = {
    order_by: "desc",
    order_by_column: "workorder_inspection_master_number",
    user: null,
    customer: null,
    vehicle: null,
    inspection_master: null,
    inspection_status: []
};