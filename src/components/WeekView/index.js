import React from 'react';
import { WEEK_DAY_TITLES, DAY_VIEW } from '../../constants';
import Cell from '../Cell';
import { range, isMonthCurrent } from '../../utils';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import './style.scss';

const moment = extendMoment(Moment);

const Week = ({ date, setDate, setCurrentView, events }) => {
    const endWeek = moment(date).startOf('week').add(1, 'weeks').subtract(1, 'days');
    const startWeek = moment(endWeek).subtract(6, 'days');

    const currentDay = moment().date();
    
    const isCurrentMonth = isMonthCurrent(date);

    const header = WEEK_DAY_TITLES.map((value, index) => 
        <Cell key={value} label={value} day={index} header/>
    );

    const handleOnSelectDay = (value) => {
        setCurrentView(DAY_VIEW);
        setDate(value);
    };

    const content = range(0, 6).map(value => 
        <Cell 
            key={`${value}-current-month`} 
            date={date} 
            day={moment(startWeek).add(value, 'day').format('D')} 
            currentDay={currentDay} 
            isCurrentMonth={isCurrentMonth} 
            onClick={handleOnSelectDay}
            events={events}
            fullHeight 
        />
    );

    return (
        <div className="week-view"> 
            <div className="header">
                {header}
            </div>
            <div className="container">
                {content}
            </div>
        </div>
    );
};

export default Week;