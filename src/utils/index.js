import moment from 'moment';


export const getFirstDayInMonth = (date) => {
    let result = moment(date).startOf('month').get('day') - 1;
    if (result < 0) {
        result = 6;
    }
    return result;
};

export const range = (start, end) => (
    new Array(end - start + 1).fill(undefined).map((_, i) => i + start)
);