export function ftempletplaceholder(string) {
    return string.replace(/@{([^}]*)}/g, (_, placeholder) => `\${${placeholder.split(" ").join("_").toLowerCase()}}`);
}

export function freversetempletplaceholder(string) {
    return string.replace(
        /\${([^}]*)}/g,
        (_, placeholder) =>
            `@{${placeholder
                .toLowerCase()
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}}`
    );
}
export function isObjectEmpty(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
}

export function customerFullName(customer = '') {
    const { first_name = '', last_name = '', salutation, customer_type, company_name } = customer || {}
    const customerName = `${first_name} ${last_name}`

    return customer ? customer_type == 'individual' ? customerName : company_name : ''
}

export function vehicleFullName(vehicle = '') {
    const { year, license_plate, make, model, sub_model, fuel_type } = vehicle || {}
    return [year, make, model, sub_model, fuel_type?.title].filter(Boolean).join(" ")
}

export function vendorFullName(vendor = '') {
    const { first_name = '', last_name = '', salutation = '', } = vendor || {}
    const vendorName = `${salutation ? `${salutation}.` : ""} ${first_name} ${last_name}`

    return vendor ? vendorName : ""
}

export function employeeFullName(employee = '') {
    const { first_name = '', last_name = '' } = employee || {}
    const employeeName = `${first_name} ${last_name}`
    return employee ? employeeName : ""
}

export function maxChracterShow(string = '', length = Infinity) {
    if (string.length > length) {
        return `${string.slice(0, length)}...`
    }
    return string
}