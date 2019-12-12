import React from 'react';
import './style.scss';

const Tooltip = ({ isShow, children }) => (
    <div className="tooltip">
        {isShow && <div className="tooltip-content">
            {children}
        </div>}
    </div>
);

export default Tooltip;