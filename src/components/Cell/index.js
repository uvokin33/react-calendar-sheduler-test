import React from 'react';
import moment from 'moment';
import Event from '../Event';
import './style.scss';
import { getDayInWeek, getClassNames } from '../../utils';
import { WEEKEND_DAYS_INDEXES, SHOW_EVENTS_IN_CELL } from '../../constants';

const Cell = ({ 
    date, 
    day, 
    currentDay, 
    isCurrentMonth, 
    isPrevOrNextMonth, 
    fullHeight, 
    onClick,
    calendar,
    events,
    header,
    label,
}) => {
    const returnDate = moment(date).set({
        'date': day, 
        'hour': 0, 
        'minute': 0, 
        'second': 0,
    });

    const dayInWeek = header ? day : getDayInWeek(moment(returnDate).day());

    const mainClassName = getClassNames({
        'cell': true,
        'current-day': (parseInt(day) === parseInt(currentDay)) && isCurrentMonth,
        'not-current-month': isPrevOrNextMonth,
        'full-height': fullHeight,
        'calendar': calendar,
        'weekend': calendar && WEEKEND_DAYS_INDEXES.includes(dayInWeek),
        'view-header': header,    
    });

    const content = [];
    
    if (events && !calendar) {        
        const currentDayEvents = [];
        events.forEach(value => {
            const eventDate = value.start;
            if (
                eventDate.isSame(returnDate, 'year') && 
                eventDate.isSame(returnDate, 'month') && 
                eventDate.isSame(returnDate, 'day')
            ) {
                currentDayEvents.push(value);
            }
        });

        const dayEventsLength = currentDayEvents.length;
        if (dayEventsLength) {
            currentDayEvents.forEach((value, index) => {
                let showEvents = SHOW_EVENTS_IN_CELL; 
                if (dayEventsLength > SHOW_EVENTS_IN_CELL) {
                    showEvents = SHOW_EVENTS_IN_CELL - 1;
                }
                if (index < showEvents || fullHeight) {
                    content.push(<Event key={index} event={value} />);
                }
            });
            if (dayEventsLength > SHOW_EVENTS_IN_CELL && !fullHeight) {
                content.push(<button key="button">{`+ ${dayEventsLength - (SHOW_EVENTS_IN_CELL - 1)}`}</button>);
            }
        }
    }

    const isCalendarDiffMonth = (calendar && !isPrevOrNextMonth) || !calendar;

    return (
        <div 
            className={mainClassName} onClick={() => {
                if (onClick) {
                    onClick(returnDate);
                }
            }}>
            {isCalendarDiffMonth && <div className="cell-header">
                {label || day}
            </div>}
            {!calendar && <div className="cell-content">
                {content}
            </div>}
        </div>
    );
};

export default Cell;