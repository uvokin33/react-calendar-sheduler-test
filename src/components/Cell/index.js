import React from 'react';
import moment from 'moment';
import Event from '../Event';
import './style.scss';

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
}) => {
    const returnDate = moment(date).set({
        'date': day, 
        'hour': 0, 
        'minute': 0, 
        'second': 0,
    });

    let mainClassName = 'cell ';
    if ((parseInt(day) === parseInt(currentDay)) && isCurrentMonth) {
        mainClassName += 'current-day ';
    }
    if (isPrevOrNextMonth) {
        mainClassName += 'not-current-month ';
    }
    if (fullHeight) {
        mainClassName += 'full-height '
    }
    if (calendar) {
        mainClassName += 'calendar '
    }

    const content = [];
    
    if (events) {        
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
                let showEvents = 3; 
                if (dayEventsLength > 3) {
                    showEvents = 2;
                }
                if (index < showEvents || fullHeight) {
                    content.push(<Event key={index} event={value} />);
                }
            });
            if (dayEventsLength > 3 && !fullHeight) {
                content.push(<button key="button">{`+ ${dayEventsLength - 2}`}</button>);
            }
        }
    }

    return (
        <div 
            className={mainClassName} onClick={() => onClick(returnDate)}>
            <div className="cell-header">
                {day}
            </div>
            {!calendar && <div className="cell-content">
                {content}
            </div>}
        </div>
    );
};

export default Cell;