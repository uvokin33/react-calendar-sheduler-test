import React from 'react';
import Month from '../MonthView';
import Week from '../WeekView';
import Day from '../DayView';
import {
    MONTH_VIEW,
    WEEK_VIEW,
    DAY_VIEW,
} from '../../constants';
import { getCurrentDayEvents } from '../../utils';

const Calendar = ({ 
    date, 
    setDate, 
    currentView, 
    setCurrentView, 
    events, 
}) => {
    let view = null;
    if (currentView === MONTH_VIEW) {
        view = <Month 
                    date={date} 
                    setDate={setDate} 
                    setCurrentView={setCurrentView} 
                    events={events} 
                />
    } else if (currentView === WEEK_VIEW) {
        view = <Week 
                    date={date} 
                    setDate={setDate} 
                    setCurrentView={setCurrentView} 
                    events={events} 
                />
    } else if (currentView === DAY_VIEW) {
        view = <Day events={getCurrentDayEvents(events, date)} />
    }

    return (
        <div className="calendar-container">
            {view}
        </div>
    );
};

export default Calendar;