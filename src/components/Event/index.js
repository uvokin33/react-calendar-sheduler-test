import React, { useState } from 'react';
import Tooltip from '../Tooltip';
import { getClassNames } from '../../utils';
import { EVENT_TITLE_FORMAT } from '../../constants';
import './style.scss';

const Event = ({ event, day, style }) => {
    const { title, description, start, end, color } = event;
    const [isShowTooltip, setIsShowTooltip] = useState(false);

    const mainStyle = {backgroundColor: color, ...style};

    const eventTitle = `${title} ${start.format(EVENT_TITLE_FORMAT)} - ${end.format(EVENT_TITLE_FORMAT)}`;

    const toggleTooltip = () => {
        setIsShowTooltip(prevState => !prevState);
    }

    return (
        <div 
            className={getClassNames({
                "event": true,
                "day-event": day,
            })} 
            style={mainStyle}
            onMouseEnter={() => toggleTooltip()}
            onMouseLeave={() => toggleTooltip()}
        >
            {description && <Tooltip isShow={isShowTooltip}> 
                <p>{description}</p>
            </Tooltip>}
            {eventTitle}
        </div>
    );
};

export default Event;