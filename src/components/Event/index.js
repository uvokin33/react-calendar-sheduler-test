import React, { useState, useEffect } from 'react';
import Tooltip from '../Tooltip';
import './style.scss';

const Event = ({ event }) => {
    const [isShowTooltip, setIsShowTooltip] = useState(false);

    const toggleTooltip = () => {
        setIsShowTooltip(prevState => !prevState);
    }

    return (
        <div 
            className="event" 
            style={{backgroundColor: event.color}}
            onMouseEnter={() => toggleTooltip()}
            onMouseLeave={() => toggleTooltip()}
        >
            {event.description && <Tooltip isShow={isShowTooltip}> 
                <p>{event.description}</p>
            </Tooltip>}
            {event.title}
        </div>
    );
};

export default Event;