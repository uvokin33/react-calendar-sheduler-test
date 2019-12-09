import React from 'react';
import moment from 'moment';
import { VIEWS, MONTH_VIEW, WEEK_VIEW, DAY_VIEW } from '../../constants';
import './style.scss';

const Header = ({ date, setDate, currentView, setCurrentView }) => {

    const handleOnNext = () => {
        setDate(moment(date).add(1, currentView));
    }
    
    const handleOnPrev = () => {
        setDate(moment(date).subtract(1, currentView));
    }

    let title = '';
    
    if (currentView === MONTH_VIEW) {
        title = moment(date).format('MMMM YYYY');
    } else if (currentView === WEEK_VIEW) {
        const endDate = moment(date).startOf('week').add(1, 'weeks').subtract(1, 'days');
        const endWeek = endDate._d;
        const startWeek = moment(endWeek).subtract(6, 'days');
        title = `${moment(startWeek).format('D MMMM YYYY')} - ${moment(endWeek).format('D MMMM YYYY')}`;
    } else if (currentView === DAY_VIEW) {
        title = moment(date).format('D MMMM YYYY');
    }

    return (
        <div className="app-header">
            <div className="header-container left">
                {VIEWS.map(value => (
                    <button 
                        key={value} 
                        className={`${value}-button ${value === currentView ? 'current' : ''}`}
                        onClick={() => setCurrentView(value)}
                    >
                        {`${value[0].toUpperCase()}${value.substring(1)}`}
                    </button>
                ))}
            </div>
            <div className="header-container center">
                <button className="prev-button" onClick={handleOnPrev}>{'<'}</button>
                <p>{title}</p>
                <button className="next-button" onClick={handleOnNext}>{'>'}</button>
            </div>
            <div className="header-container right">
                <button className="add-event-button">+ Add Event</button>
            </div>
        </div>
    )
};

export default Header;