import React from 'react';
import './style.scss';

const Cell = ({ day, currentDay, isCurrentMonth, isPrevOrNextMonth }) => {

    let mainClassName = 'cell ';
    if ((day === currentDay) && isCurrentMonth) {
        mainClassName += 'current-day';
    }
    if (isPrevOrNextMonth) {
        mainClassName += 'not-current-month';
    }

    return (
        <div className={mainClassName}>
            <div className="cell-header">
                {day}
            </div>
            <div className="cell-content">
                {!isPrevOrNextMonth ? 'Content' : ''}
            </div>
        </div>
    );
};

export default Cell;