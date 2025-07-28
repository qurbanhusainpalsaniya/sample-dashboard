import { format, formatDistanceToNow, getTime } from "date-fns";
import moment from "moment";

export function fDate(date, newFormat) {
    const fm = newFormat || "dd MMM yyyy";
    return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date, newFormat) {
    const fm = newFormat || "dd MMM yyyy p";

    return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date) {
    return date ? getTime(new Date(date)) : "";
}

export function fToNow(date) {
    return date
        ? formatDistanceToNow(new Date(date), {
            addSuffix: true,
        })
        : "";
}

export function getHourMinute(value) {
    const duration = moment.duration(value, "minutes");
    const startMoment = moment().startOf("day").add(duration);
    return startMoment.toDate();
}

export function convertTo12HourFormat(time24) {
    const timeObject = moment(time24, "HH:mm");
    const time12 = timeObject.format("hh:mm A");
    return time12;
}

export function timemiliesToSpecificFormat(timemilies, formateType = "DD MM YYYY") {
    return moment(timemilies).format(formateType);
}

export function minutesToHMFormat(minute) {
    const duration = moment.duration(Math.abs(minute), "minutes");
    const formattedTime = `${Math.floor(duration.asHours())}h ${Math.floor(duration.minutes())}m`;
    return formattedTime;
}
export function minutesToHMSFormat(minute) {
    const duration = moment.duration(Math.abs(minute), "minutes");
    let durationTime = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
    return durationTime;
}