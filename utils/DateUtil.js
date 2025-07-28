import moment from "moment";
import { t } from 'i18next';
import { useAuthContext } from "../auth/hooks";


export function DateUtil() {
    const { DATE_FORMAT } = useAuthContext();

    const startDate = moment().format(DATE_FORMAT);
    const yesterDay = moment().subtract(1, 'd').format(DATE_FORMAT);
    const tomorrow = moment().add(1, 'd').format(DATE_FORMAT);

    const thisWeekStartDate = moment().startOf('isoWeek').format(DATE_FORMAT);

    const lastWeekStartDate = moment().subtract(1, 'weeks').startOf('isoWeek').format(DATE_FORMAT)
    const lastWeekEndDate = moment().subtract(1, 'weeks').endOf('isoWeek').format(DATE_FORMAT)

    const nextWeekStartDate = moment().add(1, 'weeks').startOf('isoWeek').format(DATE_FORMAT)
    const nextWeekEndDate = moment().add(1, 'weeks').endOf('isoWeek').format(DATE_FORMAT)

    const thisMonthStartDate = moment().startOf('month').format(DATE_FORMAT)
    const thisMonthEndDate = moment().endOf('month').format(DATE_FORMAT)

    const lastMonthStartDate = moment().subtract(1, "month").startOf('month').format(DATE_FORMAT)
    const last3MonthStartDate = moment().subtract(3, "month").endOf('month').format(DATE_FORMAT)
    const last6MonthStartDate = moment().subtract(6, "month").endOf('month').format(DATE_FORMAT)

    const lastMonthEndDate = moment().subtract(1, "month").endOf('month').format(DATE_FORMAT)


    return {
        today: {
            title: t('today'),
            from: startDate,
            to: startDate,
            label: startDate
        },
        yesterday: {
            title: t('yesterday'),
            from: yesterDay,
            to: yesterDay,
            label: yesterDay
        },
        tomorrow: {
            title: t('tomorrow'),
            from: tomorrow,
            to: tomorrow,
            label: tomorrow
        },
        thisWeek: {
            title: t('this_week'),
            from: thisWeekStartDate,
            to: startDate,
            label: `${thisWeekStartDate} - ${startDate}`
        },
        lastWeek: {
            title: t('last_week'),
            from: lastWeekStartDate,
            to: lastWeekEndDate,
            label: `${lastWeekStartDate} - ${lastWeekEndDate}`
        },
        nextWeek: {
            title: t('next_week'),
            from: nextWeekStartDate,
            to: nextWeekEndDate,
            label: `${nextWeekStartDate} - ${nextWeekEndDate}`
        },
        thisMonth: {
            title: t('this_month'),
            from: thisMonthStartDate,
            to: startDate,
            endOf: thisMonthEndDate, label: `${thisMonthStartDate} - ${startDate}` //for calendar
        },
        lastMonth: {
            title: t('last_month'),
            from: lastMonthStartDate,
            to: lastMonthEndDate,
            label: `${lastMonthStartDate} - ${lastMonthEndDate}`
        },
        last3Month: {
            title: t('last_3_months'),
            from: last3MonthStartDate,
            to: lastMonthEndDate,
            label: `${last3MonthStartDate} - ${lastMonthEndDate}`
        },

        last6Month: {
            title: t('last_6_months'),
            from: last6MonthStartDate,
            to: lastMonthEndDate,
            label: `${last6MonthStartDate} - ${lastMonthEndDate}`
        },
        custom: {
            title: t('custom'),
            from: null,
            to: null,
            label: ``
        }
    };
}

