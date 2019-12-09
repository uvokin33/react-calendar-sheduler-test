import React, { useState } from 'react';
import moment from 'moment';
import Month from '../MonthView';
import Week from '../WeekView';
import Day from '../DayView';
import {
    MONTH_VIEW,
    WEEK_VIEW,
    DAY_VIEW,
} from '../../constants';

const Calendar = ({ date, setDate, currentView }) => {

    let view = null;
    if (currentView === MONTH_VIEW) {
        view = <Month date={date} setDate={setDate}/>
    } else if (currentView === WEEK_VIEW) {
        view = <Week date={date} setDate={setDate}/>
    } else if (currentView === DAY_VIEW) {
        view = <Day date={date} setDate={setDate}/>
    }

    return (
        <div className="calendar-container">
            {view}
        </div>
    );
};

export default Calendar;