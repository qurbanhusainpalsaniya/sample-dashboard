import { Button, IconButton, LinearProgress, MenuItem, Stack, Typography } from "@mui/material";
import CustomPopover, { usePopover } from "components/custom-popover";
import Iconify from "components/iconify";
import { useResponsive } from "hooks/use-responsive";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
    {
        value: "dayGridMonth",
        label: "Month",
        icon: "mingcute:calendar-month-line",
    },
    {

        value: "timeGridWeek",
        label: "Week",
        icon: "mingcute:calendar-week-line",
    },
    {
        value: "timeGridDay",
        label: "Day",
        icon: "mingcute:calendar-day-line"
    },
    // {
    //     value: "listWeek",
    //     label: "Agenda",
    //     icon: "fluent:calendar-agenda-24-regular",
    // },
];

// ----------------------------------------------------------------------

export default function FullCalendarToolbar({ title, date, view, loading, onToday, onNextDate, onPrevDate, onChangeView, }) {
    const smUp = useResponsive("up", "sm");
    const popover = usePopover();
    const selectedItem = VIEW_OPTIONS.filter((item) => item.value === view)?.[0] || VIEW_OPTIONS[0];

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1, px: 3, position: "relative" }}>
                {smUp ?
                    <Button size="small" color="inherit" onClick={popover.onOpen} startIcon={<Iconify icon={selectedItem.icon} />} endIcon={<Iconify icon="eva:arrow-ios-downward-fill" sx={{ ml: -0.5 }} />}>
                        {selectedItem.label}
                    </Button>
                    :
                    <Stack />}

                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton onClick={onPrevDate}>
                        <Iconify icon="eva:arrow-ios-back-fill" />
                    </IconButton>

                    <Typography variant="h6">{title}</Typography>

                    <IconButton onClick={onNextDate}>
                        <Iconify icon="eva:arrow-ios-forward-fill" />
                    </IconButton>
                </Stack>

                <Stack />

                {loading && (
                    <LinearProgress
                        sx={{
                            height: 2,
                            width: 1,
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                        }}
                    />
                )}
            </Stack>

            <CustomPopover open={popover.open} onClose={popover.onClose} arrow="top-left" sx={{ width: 160 }}>
                {VIEW_OPTIONS.map((viewOption) => (
                    <MenuItem
                        key={viewOption.value}
                        selected={viewOption.value === view}
                        onClick={() => {
                            popover.onClose();
                            onChangeView(viewOption.value);
                        }}
                    >
                        <Iconify icon={viewOption.icon} />
                        {viewOption.label}
                    </MenuItem>
                ))}
            </CustomPopover>
        </>
    );
}

FullCalendarToolbar.propTypes = {
    date: PropTypes.object,
    loading: PropTypes.bool,
    onChangeView: PropTypes.func,
    onNextDate: PropTypes.func,
    onOpenFilters: PropTypes.func,
    onPrevDate: PropTypes.func,
    onToday: PropTypes.func,
    view: PropTypes.oneOf(["dayGridMonth", "timeGridWeek", "timeGridDay", "listWeek"]),
};
