import React from 'react';

const Event = ({ event }) => {
    return (
        <div className="event">
            {event.title}
        </div>
    );
};

export default Event;