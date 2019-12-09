import React from 'react';
import { WEEK_DAY_TITLES } from '../../constants';
import './style.scss';

const Week = ({ date, setDate }) => {

    const header = WEEK_DAY_TITLES.map(value => (
        <div key={value} className="view-header cell">
            <p>{value}</p>
        </div>
    ));

    const days = WEEK_DAY_TITLES.map(value => (
        <div key={`${value}-content`} className="view-content cell">
            
        </div>
    ));

    return (
        <div className="week-view"> 
            <div className="header">
                {header}
            </div>
            <div className="container">
                {days}
            </div>
        </div>
    );
};

export default Week;