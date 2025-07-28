import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import { fontSize } from '@mui/system';
import GoogleMaterialIcon from "components/google-icon";
import { useCustomPagination } from "hooks/useCustomPagination";
import { useTranslate } from "locales";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { paths } from "routes/paths";


export default function DemoMenu() {
    const { t } = useTranslate();
    const { fetchDataOptions, } = useCustomPagination();
    const currentPageWithIndex = `?page=${1}&size=${fetchDataOptions.pageSize || 15}`
    const [open, setOpen] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        // Load the open state from localStorage when the component mounts
        const storedOpenState = JSON.parse(localStorage.getItem('openState')) || [];
        setOpen(storedOpenState);
    }, []);

    useEffect(() => {
        // Save the open state to localStorage whenever it changes
        localStorage.setItem('openState', JSON.stringify(open));
    }, [open]);

    const menuSection = [
        {
            id: 1,
            title: t('Calendars'),
            icon: 'settings',
            child: [
                {
                    title: t("appointment"),
                    path: `${paths.calendar.appointment}${currentPageWithIndex}`,
                    icon: 'calendar_month',
                },
                {
                    title: t("work_schedule"),
                    path: `${paths.calendar.workSchedule}${currentPageWithIndex}`,
                    icon: 'routine',
                },
            ]
        },
        {
            id: 2,
            title: t("items"),
            child: [
                {
                    title: t("parts"),
                    path: `${paths.items.part}${currentPageWithIndex}`,
                    icon: 'build',
                },
                {
                    title: t("tires"),
                    path: `${paths.items.tire}${currentPageWithIndex}`,
                    icon: 'tire_repair',
                },
                {
                    title: t("vehicles"),
                    path: `${paths.items.usedVehicle}${currentPageWithIndex}`,
                    icon: 'car_tag',
                },
                {
                    title: t("labours"),
                    path: `${paths.items.labour}${currentPageWithIndex}`,
                    icon: 'construction',
                },
            ]
        },
        {
            id: 3,
            title: t("sales"),
            child: [
                {
                    title: t("customers"),
                    path: `${paths.workflow.customers}${currentPageWithIndex}`,
                    icon: 'contacts',
                },
                {
                    title: t("vehicles"),
                    path: `${paths.workflow.vehicles}${currentPageWithIndex}`,
                    icon: 'directions_car',
                },
                {
                    title: t("vehicle_inspections"),
                    path: `${paths.workflow.inspections}${currentPageWithIndex}`,
                    icon: 'fact_check',
                },
                {
                    title: t("estimates"),
                    path: `${paths.workflow.estimate}${currentPageWithIndex}`,
                    icon: 'calculate',
                },
                {
                    title: t("work_orders"),
                    path: `${paths.workflow.workorder}${currentPageWithIndex}`,
                    icon: 'bar_chart',
                },
                {
                    title: t("invoices"),
                    path: `${paths.workflow.invoice}${currentPageWithIndex}`,
                    icon: 'receipt',
                },
                {
                    title: t("payments_received"),
                    path: `${paths.workflow.paymentReceived}${currentPageWithIndex}`,
                    icon: 'universal_currency_alt',
                },
            ]
        },
        {
            id: 4,
            title: t("purchases"),
            child: [
                {
                    title: t("vendors"),
                    path: `${paths.purchase.vendor}${currentPageWithIndex}`,
                    icon: 'storefront',
                },
                {
                    title: t("parts_issuance"),
                    path: `${paths.purchase.partIssuance}${currentPageWithIndex}`,
                    icon: 'beenhere',
                },
                {
                    title: t("parts_requisition"),
                    path: `${paths.purchase.partRequisition}${currentPageWithIndex}`,
                    icon: 'approval_delegation',
                },
                {
                    title: t("purchase_orders"),
                    path: `${paths.purchase.purchaseOrder}${currentPageWithIndex}`,
                    icon: 'shopping_cart',
                },
                {
                    title: t("bills"),
                    path: `${paths.purchase.bill}${currentPageWithIndex}`,
                    icon: 'receipt',
                },
                {
                    title: t("expenses"),
                    path: `${paths.purchase.expense}${currentPageWithIndex}`,
                    icon: 'wallet',
                },
                {
                    title: t("payments_made"),
                    path: `${paths.purchase.paymentsMade}${currentPageWithIndex}`,
                    icon: 'universal_currency_alt',
                },
            ]
        },
        {
            id: 5,
            title: t("employees"),
            child: [
                {
                    title: t("employees"),
                    path: `${paths.productivity.employees}${currentPageWithIndex}`,
                    icon: 'group',
                },
                {
                    title: t("time_clocks"),
                    path: `${paths.productivity.timeclocks}${currentPageWithIndex}`,
                    icon: 'punch_clock',
                },
                {
                    title: t("time_sheets"),
                    path: "#",
                    icon: 'view_object_track',
                },
            ]
        },
        {
            id: 6,
            title: t("setting"),
            child: [
                {
                    title: t("company_profile"),
                    path: `${paths.setting.companyprofile}`,
                    icon: 'garage_home',
                },
                {
                    title: t("taxes"),
                    // path: `${paths.setting.tax}`,
                    icon: 'heap_snapshot_thumbnail',
                },
                {
                    title: t("chart_of_account"),
                    path: `${paths.setting.accounts}`,
                    icon: 'account_tree',
                },
                {
                    title: t("preferences"), // Which path ?
                    path: "/setting/general",
                    icon: 'settings',
                },
                {
                    title: t("templates"),
                    path: `${paths.setting.templates}${currentPageWithIndex}`,
                    icon: 'edit_square',
                },
                {
                    title: t("integration"), // Which path ?
                    path: paths.setting.integration,
                    icon: 'extension',
                },
            ]
        },
        // {
        //     id: 7,
        //     title: t('reports'),
        //     icon: <GoogleMaterialIcon fontSize="small" icon={'bar_chart'} />,
        //     pathing: "reports",
        //     redirectPath: "reports/employee",
        // }
    ]

    const lists = [
        {
            id: 1,
            title: t("dashboard"),
            icon: 'speed',
            path: "/dashboard/home",
        },
        {
            id: 2,
            title: t("Analytics Dashboard"),
            icon: 'dashboard',
            path: "/analytics-dashboard/home",
        }
    ]

    const otherLists = [
        {
            title: t("appointment"),
            path: `${paths.calendar.appointment}${currentPageWithIndex}`,
            icon: 'calendar_month',
        },
        {
            title: t("work_schedule"),
            path: `${paths.calendar.workSchedule}${currentPageWithIndex}`,
            icon: 'routine',
        },
    ]

    const [items, setItems] = useState(otherLists);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        const dragIndex = e.dataTransfer.getData('text/plain');
        if (dragIndex === dropIndex) return;

        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(dragIndex, 1);
        updatedItems.splice(dropIndex, 0, movedItem);
        setItems(updatedItems);
    };

    // Function to handle click and toggle the section
    const handleClick = (id) => {
        setOpen((prevOpen) =>
            prevOpen.includes(id) ? prevOpen.filter(openId => openId !== id) : [...prevOpen, id]
        );
    };

    const dashboard = (
        <List component="nav" aria-labelledby="nested-list-subheader">
            {lists.map((list) => {
                const cleanPathname = pathname.split('?')[0];
                const isActive = cleanPathname === list.path.split('?')[0];
                return (
                    <Box key={list.id}>
                        <ListItemButton sx={{
                            "&:hover": {
                                bgcolor: "menu.hoverOthers",
                                borderRadius: 20,
                            },
                            color: isActive ? 'menu.selectedText' : 'menu.text',
                            bgcolor: isActive ? 'menu.selected' : '',
                            borderRadius: isActive ? 20 : '',
                        }} href={list.path}>
                            <ListItemIcon>
                                <GoogleMaterialIcon icon={list.icon} sx={{ fontSize: '22px' }} filled fontSize='10px' />
                            </ListItemIcon>
                            <ListItemText primary={
                                <Typography sx={{ fontWeight: 'bold' }} variant="button">
                                    {list.title}
                                </Typography>
                            } />
                        </ListItemButton>

                    </Box>
                )
            })}
        </List>
    )

    const others = (
        <List component="nav" aria-labelledby="nested-list-subheader">
            <Typography mb={1} px={2} color='menu.text' variant='caption'>Shortcuts</Typography>
            {otherLists.map((list) => {
                const cleanPathname = pathname.split('?')[0];
                const isActive = cleanPathname === list.path.split('?')[0];
                return (
                    <Box key={list.id}>
                        <ListItemButton sx={{
                            "&:hover": {
                                bgcolor: "menu.hoverOthers",
                                borderRadius: 20,
                            },
                            color: isActive ? 'menu.selectedText' : 'menu.text',
                            bgcolor: isActive ? 'menu.selected' : '',
                            borderRadius: isActive ? 20 : '',
                        }} href={list.path}>
                            <ListItemIcon>
                                <GoogleMaterialIcon icon={list.icon} sx={{ fontSize: '22px' }} filled fontSize='medium' />
                            </ListItemIcon>
                            <ListItemText primary={
                                <Typography sx={{ fontWeight: 'bold' }} variant="button">
                                    {list.title}
                                </Typography>
                            } />
                        </ListItemButton>
                    </Box>
                )
            })}
        </List>
    )

    const menu = (
        <List sx={{ mt: 1, borderRadius: '16px', backgroundColor: 'menu.main' }} component="nav" aria-labelledby="nested-list-subheader">
            {menuSection.map((section, index) => (
                <Box key={section.id} sx={{ borderBottom: index < menuSection.length - 1 ? '1px solid' : '', borderColor: 'menu.background' }}>
                    <ListItemButton sx={{
                        "&:hover": {
                            bgcolor: "menu.hover",
                            borderRadius: 20
                        },
                        height: '42px'
                    }} onClick={() => handleClick(section.id)}>
                        <ListItemText primary={
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} color="menu.title">
                                {section.title}
                            </Typography>
                        } />
                        {open.includes(section.id) ? <GoogleMaterialIcon fontSize='medium' icon={'keyboard_arrow_up'} /> : <GoogleMaterialIcon fontSize="medium" icon={'keyboard_arrow_down'} />}
                    </ListItemButton>
                    <Collapse in={open.includes(section.id)}>
                        <List component="div">
                            {section.child && section.child.map((item, index) => {
                                const cleanPathname = pathname.split('?')?.[0];
                                const isActive = cleanPathname === item.path?.split('?')[0];
                                return (
                                    <ListItemButton href={item.path} key={index}
                                        sx={{
                                            pl: 2, "&:hover": {
                                                bgcolor: "menu.hover",
                                                borderRadius: 20,
                                            },
                                            color: isActive ? 'menu.selectedText' : 'menu.text',
                                            bgcolor: isActive ? 'menu.selected' : '',
                                            borderRadius: isActive ? 20 : '',
                                        }}>
                                        <ListItemIcon>
                                            <GoogleMaterialIcon icon={item.icon} sx={{ fontSize: '22px' }} filled fontSize='medium' />
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <Typography sx={{ fontWeight: 'bold' }} variant="button">
                                                {item.title}
                                            </Typography>
                                        } />
                                    </ListItemButton>
                                )
                            })}
                        </List>
                    </Collapse>
                </Box>
            ))}
        </List>
    )

    return (
        <>
            <Box sx={{ px: 1, py: 0, pt: 0 }}>
                <>
                    {dashboard}
                    {others}
                    {menu}
                    <List component="nav" aria-labelledby="nested-list-subheader">
                        <ListItemButton sx={{
                            "&:hover": {
                                borderRadius: 20,
                                bgcolor: "menu.hoverOthers",
                            },
                            color: pathname === '/reports/employee' ? 'menu.selectedText' : 'menu.text',
                            bgcolor: pathname === '/reports/employee' ? 'menu.selected' : '',
                            borderRadius: pathname === '/reports/employee' ? 20 : '',
                        }} href={'/reports/employee'}>
                            <ListItemIcon>
                                <GoogleMaterialIcon icon={'finance'} sx={{ fontSize: '22px' }} filled fontSize='medium' />
                            </ListItemIcon>
                            <ListItemText primary={
                                <Typography sx={{ fontWeight: 'bold' }} variant="button">
                                    {t('reports')}
                                </Typography>
                            } />
                        </ListItemButton>
                    </List>
                </>
            </Box>
        </>
    );
}


{/* <List component="nav" aria-labelledby="nested-list-subheader">
                    <Typography px={2} mb={1} variant='body2'>Shortcuts</Typography>
                    {items.map((list, index) => {
                        const cleanPathname = pathname.split('?')[0];
                        const isActive = cleanPathname === list.path.split('?')[0];
                        return (
                            <Box
                                key={list.id}
                                draggable onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, index)}
                                sx={{
                                    '&:hover .dragIndicator': { visibility: 'visible' }
                                }}
                            >
                                <ListItemButton sx={{
                                    "&:hover": {
                                        bgcolor: "menu.hoverOthers",
                                        borderRadius: 20,
                                    },
                                    color: isActive ? 'menu.selectedText' : 'menu.text',
                                    bgcolor: isActive ? 'menu.selected' : '',
                                    borderRadius: isActive ? 20 : '',
                                }} href={list.path}>
                                    <ListItemIcon>
                                        <GoogleMaterialIcon
                                            className="dragIndicator"
                                            sx={{
                                                visibility: 'hidden',
                                                transition: 'visibility 0.0s ease-in-out'
                                            }}
                                            icon={'drag_indicator'}
                                            filled
                                            fontSize='small'
                                        />
                                        <GoogleMaterialIcon icon={list.icon} filled fontSize='medium' />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant="subtitle1">
                                            {list.title}
                                        </Typography>
                                    } />
                                </ListItemButton>
                            </Box>
                        )
                    })}
                </List> */}