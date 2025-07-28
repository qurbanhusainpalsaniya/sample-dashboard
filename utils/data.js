import { blue, green, grey, lime, orange, purple, red, teal, yellow } from "@mui/material/colors";

export const workcalendararray = [
    {
        week: 1,
        sunday: "F",
        monday: "F",
        tuesday: "F",
        wednesday: "F",
        thursday: "F",
        friday: "F",
        saturday: "F",
    },
    {
        week: 2,
        sunday: "F",
        monday: "F",
        tuesday: "F",
        wednesday: "F",
        thursday: "F",
        friday: "F",
        saturday: "F",
    },
    {
        week: 3,
        sunday: "F",
        monday: "F",
        tuesday: "F",
        wednesday: "F",
        thursday: "F",
        friday: "F",
        saturday: "F",
    },
    {
        week: 4,
        sunday: "F",
        monday: "F",
        tuesday: "F",
        wednesday: "F",
        thursday: "F",
        friday: "F",
        saturday: "F",
    },
    {
        week: 5,
        sunday: "F",
        monday: "F",
        tuesday: "F",
        wednesday: "F",
        thursday: "F",
        friday: "F",
        saturday: "F",
    },
    {
        week: 6,
        sunday: "F",
        monday: "F",
        tuesday: "F",
        wednesday: "F",
        thursday: "F",
        friday: "F",
        saturday: "F",
    },
];

export const wageoption = [
    {
        name: "hourly_punch",
        value: "hourly",
        desc: "Salary is calculated based on working hours (Duration between in and out punch).",
    },
    {
        name: "hourly_clock",
        value: "hourly_productivity",
        desc: "Salary is calculated based on hourly productivity",
    },
    {
        name: "daily",
        value: "daily",
        desc: "The salary is calculated based on daily attendance status Present/Absent. The salary will not be calculated for a week off or holiday.",
    },
    {
        name: "monthly",
        value: "monthly",
        desc: "Salary is calculated based on monthly attendance including weekoff and holidays but excluding absents.",
    },
];

export const AttendanceStatusList = [
    { id: 1, value: "P", name: "present", color: green }, // Use MUI color name
    { id: 2, value: "A", name: "absent", color: red },
    { id: 6, value: "HF", name: "half_day", color: yellow },
    { id: 4, value: "PL", name: "paid_leave", color: teal },
    { id: 3, value: "WO", name: "week_off", color: grey },
    { id: 6, value: "HO", name: "holiday", color: blue },
    { id: 5, value: "LOP", name: "loss_of_pay", color: purple },
];
