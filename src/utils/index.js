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

export const getRandomFromArray = (array) => 
    array[Math.floor((Math.random() * array.length))];

export const range = (start, end) => (
    new Array(end - start + 1).fill(undefined).map((_, i) => i + start)
);

export const getClassNames = (classNames) => 
    Object.keys(classNames).map(value => classNames[value] ? value : '' ).join(' ');