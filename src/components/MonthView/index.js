import React, { useState } from 'react';
import moment from 'moment';
import Cell from '../Cell';
import { 
    WEEK_DAY_TITLES, 
    TOTAL_CELLS, 
    DAY_VIEW, 
    WEEK_DAY_SHORT_TITLES, 
    CALENDAR_FORMAT 
} from '../../constants';
import { range, getFirstDayInMonth } from '../../utils';
import './style.scss';

const Month = ({ 
    date: propDate, 
    setDate: setPropDate, 
    setCurrentView, 
    calendar, 
    onClickDay, 
    events 
}) => {
    const [localDate, setLocalDate] = useState(moment(propDate));

    let date = localDate;
    let setDate = setLocalDate;

    if (propDate && setPropDate) {
        date = propDate;
        setDate = setPropDate;
    }

    const days = [];
    const daysInMonth = moment(date).daysInMonth();
    const daysInPrevMonth = moment(date).subtract(1, 'month').daysInMonth();
    const currentDay = moment().date();
    
    const isCurrentMonth = 
        moment(date).isSame(moment(), 'year') && 
        moment(date).isSame(moment(), 'month');

    const titles = calendar ? WEEK_DAY_SHORT_TITLES : WEEK_DAY_TITLES;

    let title = null;

    if (calendar) {
        title = (
            <div className="month-title">
                <button className="month-prev" onClick={() => setDate(moment(date).subtract(1, 'month'))}>{'<'}</button>
                <p onClick={() => setDate(moment())}>{date.format(CALENDAR_FORMAT)}</p>
                <button className="month-next" onClick={() => setDate(moment(date).add(1, 'month'))}>{'>'}</button>
            </div>
        );
    }

    const header = titles.map((value, index) => 
        <Cell label={value} day={index} calendar={calendar} header/>
    );

    const handleOnSelectDay = (value) => {
        if (onClickDay) {
            onClickDay(value);
        } else {
            setCurrentView(DAY_VIEW);
            setDate(value);
        }
    };

    range(daysInPrevMonth - getFirstDayInMonth(date), daysInPrevMonth - 1).forEach(value => days.push(
        <Cell key={value} date={moment(date).subtract(1, 'month')} day={value + 1} isPrevOrNextMonth calendar={calendar} />
    )); 

    range(1, daysInMonth).forEach(value => days.push(
        <Cell 
            key={`${value}-current-month`} 
            date={date} 
            day={value} 
            currentDay={currentDay} 
            isCurrentMonth={isCurrentMonth} 
            onClick={handleOnSelectDay} 
            calendar={calendar} 
            events={events}
        />
    ));

    range(1, TOTAL_CELLS - days.length).forEach(value => days.push(
        <Cell key={value} date={moment(date).add(1, 'month')} day={value} isPrevOrNextMonth calendar={calendar} />
    ));

    return (
        <div className="month-view"> 
            {title}
            <div className="month-content">
                <div className="header">
                    {header}
                </div>
                <div className="container">
                    {days}
                </div>
            </div>
        </div>
    );
};

export default Month;
