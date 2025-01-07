import {differenceInMinutes, format, isToday, isYesterday} from 'date-fns';

const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);

    if (differenceInMinutes(new Date(), date) < 1) {
        return 'Now';
    }

    if (isToday(date)) {
        return format(date, 'HH:mm'); // Show time only if it's today
    }

    if (isYesterday(date)) {
        return `Yesterday ${format(date, 'HH:mm')}`; // Show yesterday + time
    }

    return format(date, 'dd/MM/yyyy HH:mm'); // For older dates
};

export default formatTimestamp;