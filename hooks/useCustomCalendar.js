import { useAuthContext } from "auth/hooks";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
export function useCustomCalendar() {
    const { DATE_FORMAT } = useAuthContext();
    const [currentDate, setCurrentDate] = useState(dayjs());
    const currentMonth = dayjs().format("MMMM");
    const [month, setMonth] = useState(currentMonth);

    const getStartAndEndOfMonth = (date) => {
        const start = date.startOf("month").format(DATE_FORMAT);
        const end = date.isSame(dayjs(), "month") ? dayjs().format(DATE_FORMAT) : date.endOf("month").format(DATE_FORMAT);
        return { start, end };
    };
    const [dateRange, setDateRange] = useState(getStartAndEndOfMonth(currentDate));
    const { start: startOfMonth, end: endOfMonth } = dateRange;

    const onDatePrev = useCallback(() => {
        const updatedDate = currentDate.subtract(1, "month");
        setCurrentDate(updatedDate);
        setMonth(updatedDate.format("MMMM"));
        setDateRange(getStartAndEndOfMonth(updatedDate));
    }, [currentDate]);

    const onDateNext = useCallback(() => {
        const updatedDate = currentDate.add(1, "month");
        setCurrentDate(updatedDate);
        setMonth(updatedDate.format("MMMM"));
        setDateRange(getStartAndEndOfMonth(updatedDate));
    }, [currentDate]);

    const showNextMonth = currentMonth !== month;
    return {
        currentDate,
        month,
        startOfMonth,
        endOfMonth,
        showNextMonth,
        onDatePrev,
        onDateNext,
    };
}
