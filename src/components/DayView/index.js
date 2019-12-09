import React from 'react';
import './style.scss';
import { range } from '../../utils';

const DayView = ({ date, setDate }) => {

    const content = range(0, 23).map(value => (
        <div key={value} className="hour-container">
            <div className="title">
                {`${value}.00 - ${value + 1}.00`}
            </div>
            <div className="content">
                
            </div>
        </div>
    ));

    return (
        <div className="day-view">
            <div className="events">
                <div className="event">Test</div>
            </div> 
            {content}
        </div>
    );
};

export default DayView;