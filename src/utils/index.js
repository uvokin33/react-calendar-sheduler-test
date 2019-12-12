import moment from 'moment';

export const getFirstDayInMonth = (date) => 
    getDayInWeek(moment(date).startOf('month').get('day'));

export const getDayInWeek = (day) => {
    let result = day - 1;
    if (result < 0) {
        result = 6;
    }
    return result;
};

export const getCurrentDayEvents = (events, currentDate) => 
    events.map(value => {
        const eventDate = value.start;
        if (
            eventDate.isSame(currentDate, 'year') && 
            eventDate.isSame(currentDate, 'month') && 
            eventDate.isSame(currentDate, 'day')
        ) {
            return value;
        }
        return undefined;
    }).filter(value => value);

export const isMonthCurrent = (date) =>
    moment(date).isSame(moment(), 'year') && 
    moment(date).isSame(moment(), 'month');

export const getRandomFromArray = (array) => 
    array[Math.floor((Math.random() * array.length))];

export const range = (start, end) => (
    new Array(end - start + 1).fill(undefined).map((_, i) => i + start)
);

export const getClassNames = (classNames) => 
    Object.keys(classNames).map(value => classNames[value] ? value : '' ).join(' ');