import React from 'react';
import moment from 'moment';
import Cell from '../Cell';
import { WEEK_DAY_TITLES, TOTAL_CELLS } from '../../constants';
import { range, getFirstDayInMonth } from '../../utils';
import './style.scss';

const Month = ({ date, setDate }) => {
    const days = [];
    const daysInMonth = moment(date).daysInMonth();
    const daysInPrevMonth = moment(date).subtract(1, 'month').daysInMonth();
    const currentDay = moment().date();
    
    const isCurrentMonth = 
        moment(date).isSame(moment(), 'year') && 
        moment(date).isSame(moment(), 'month');

    const header = WEEK_DAY_TITLES.map(value => (
        <div key={value} className="view-header cell">
            <p>{value}</p>
        </div>
    ));

    range(daysInPrevMonth - getFirstDayInMonth(date), daysInPrevMonth - 1).forEach(value => days.push(
        <Cell day={value + 1} isPrevOrNextMonth />
    )); 

    range(1, daysInMonth).forEach(value => days.push(
        <Cell day={value} currentDay={currentDay} isCurrentMonth={isCurrentMonth} />
    ));

    range(1, TOTAL_CELLS - days.length).forEach(value => days.push(
        <Cell day={value} isPrevOrNextMonth />
    ));

    return (
        <div className="month-view"> 
            <div className="header">
                {header}
            </div>
            <div className="container">
                {days}
            </div>
        </div>
    );
};

export default Month;
