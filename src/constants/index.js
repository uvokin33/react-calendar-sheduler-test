import moment from 'moment';
import 'moment/locale/en-gb';

moment.locale('en-GB');

export const TOTAL_CELLS = 42;

export const MONTH_VIEW = 'month';
export const WEEK_VIEW = 'week';
export const DAY_VIEW = 'day';

export const MONTH_TITLES = moment.months();
export const WEEK_DAY_TITLES = moment.weekdays(true);

export const VIEWS = [MONTH_VIEW, WEEK_VIEW, DAY_VIEW];