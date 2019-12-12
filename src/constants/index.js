import moment from 'moment';
import 'moment/locale/en-gb';

moment.locale('en-GB');

export const TOTAL_CELLS = 42;

export const MINUTE_HEIGHT = 42 / 60;

export const SHOW_EVENTS_IN_CELL = 2;

export const EVENT_BACKGROUND_COLOR = ['#e892e6', '#a0a9ea', '#81e09a'];

export const WEEKEND_DAYS_INDEXES = [5, 6];

export const WEEKS_MODIFICATOR = [-1, 0, 1, 2, 3];

export const TITLE_FORMAT = 'D MMMM YYYY';
export const WEEKS_FORMAT = 'DD.MM.YYYY';
export const CALENDAR_FORMAT = 'MMM YYYY';
export const EVENT_TITLE_FORMAT = 'HH.mm';

export const ERROR_MESSAGE_EMPTY_TITLE = 'You must fill the title field.';
export const ERROR_MESSAGE_END_LESS_START_TIME = 'End time must be greater than start time.';
export const ERROR_MESSAGE_EVENTS_INTERSECTS = 'Current event time intersects with another event.';

export const MONTH_VIEW = 'month';
export const WEEK_VIEW = 'week';
export const DAY_VIEW = 'day';

export const MONTH_TITLES = moment.months();
export const WEEK_DAY_TITLES = moment.weekdays(true);
export const WEEK_DAY_SHORT_TITLES = moment.weekdaysShort(true);

export const VIEWS = [MONTH_VIEW, WEEK_VIEW, DAY_VIEW];