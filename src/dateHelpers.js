import {formatDistance} from 'date-fns';

export function distanceInWordsToNow(date) {
    const formattedDate = date ? new Date(date) : new Date();
    return formatDistance(formattedDate, new Date());
}