import React from 'react';
import moment from 'moment';
import { range } from '../../utils';
import { MINUTE_HEIGHT } from '../../constants';
import Event from '../Event';
import './style.scss';

const DayView = ({ events }) => {
    const content = range(0, 23).map(value => {
        const content = events.map(event => {
            const { start, end } = event;
            const style = {};

            const minutesToEnd = Math.abs(moment(start).diff(end, 'minutes'));
            if (minutesToEnd > 60) {
                const eventStart = MINUTE_HEIGHT * moment(start).minute();                
                const eventEnd = ((MINUTE_HEIGHT * minutesToEnd) - eventStart) - 10;

                style.top = `${eventStart}px`;
                style.height = `${eventEnd}px`;
            }

            if (moment(start).hour() === value) {
                return <Event key={value} event={event} style={style} day />;
            }
            return undefined;
        }).filter(value => value);
        return (
            <div key={value} className="hour-container">
                <div className="title">
                    {`${value}.00 - ${value + 1}.00`}
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
        );
    });

    return (
        <div className="day-view">
            {content}
        </div>
    );
};

export default DayView;