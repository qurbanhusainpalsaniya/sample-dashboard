// ----------------------------------------------------------------------

export function flattenArray(list, key = "children") {
    let children = [];

    const flatten = list?.map((item) => {
        if (item[key] && item[key].length) {
            children = [...children, ...item[key]];
        }
        return item;
    });

    return flatten?.concat(children.length ? flattenArray(children, key) : children);
}


export function chartOfAccountGroupList(arr, parent = null, link = 'parent_chart_of_account_id', parentCount = 0) {
    return arr
        .filter(item => item[link] == parent)
        .sort((a, b) => a.account_name.localeCompare(b.account_name))
        .map((child, i) => {
            const subChildren = chartOfAccountGroupList(arr, child.chart_of_account_id, 'parent_chart_of_account_id', parentCount + 1);
            const totalChildrenCount = subChildren.length + subChildren.reduce((acc, subChild) => acc + subChild.totalChildrenCount, 0);


            return {
                ...child,
                isChild: child[link] != null,
                subChildExist: subChildren.length > 0,
                children: subChildren,
                totalChildrenCount: totalChildrenCount,
                parentCount: parentCount
            };
        });
}



export function sumBy(array, iteratee) {
    return array.reduce((sum, item) => sum + iteratee(item), 0);
}

export function groupByTax(items = []) {
    const taxGroups = items.reduce((acc, item) => {
        const { company_tax = {}, tax_amount_total = 0 } = item;
        const { company_tax_id = '', title = '', tax_percentage = 0 } = company_tax || {};
        if (company_tax_id) {
            if (!acc[company_tax_id]) {
                acc[company_tax_id] = {
                    company_tax_id: Number(company_tax_id),
                    title,
                    tax_value: 0,
                    tax_percentage
                };
            }
            acc[company_tax_id].tax_value += tax_amount_total;
        }
        return acc;
    }, {});

    return Object.values(taxGroups).sort((a, b) => a.tax_percentage - b.tax_percentage);
}



export function serviceGroupInventory(transaction = [], withServiceGroup = true, keyGroup = 'workorder_service_group', keyID = 'workorder_service_group_id') {
    if (!transaction.length) return withServiceGroup ? [] : {};
    if (withServiceGroup) {
        return transaction
            .filter(item => item[keyGroup])
            .reduce((acc, item) => {
                const group = item[keyGroup];
                const existingGroup = acc.find(g => g[keyID] === group[keyID]);
                if (existingGroup) {
                    existingGroup.workorder_estimate_item_transaction.push({ ...item, [keyGroup]: group });
                } else {
                    acc.push({
                        status: '',
                        title: group?.title,
                        [keyID]: group?.[keyID],
                        workorder_estimate_item_transaction: [{ ...item, [keyGroup]: group }],
                    });
                }
                return acc;
            }, []);
    } else {
        return transaction
            ?.filter((item) => !item?.[keyGroup])
            ?.reduce((acc, { inventory, ...rest }) => ({ ...acc, [inventory.inventory_type]: [...(acc[inventory.inventory_type] || []), { inventory, ...rest }] }), {})
    }
}
