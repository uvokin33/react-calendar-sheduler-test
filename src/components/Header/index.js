import React, { useState } from 'react';
import moment from 'moment';
import { VIEWS } from '../../constants';
import Modal from '../Modal';
import './style.scss';
import HeaderTitle from '../HeaderTitle';
import AddEventModal from '../AddEventModal';
import { getClassNames } from '../../utils';

const modalStyle = {
    width: 'auto',
    height: 'auto',
};

const Header = ({ 
    date, 
    setDate, 
    currentView, 
    setCurrentView,
    events, 
    setEvents, 
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnNext = () => {
        setDate(moment(date).add(1, currentView));
    }
    
    const handleOnPrev = () => {
        setDate(moment(date).subtract(1, currentView));
    }

    const handleOnChangeView = (view) => {
        setDate(moment());
        if (view !== currentView) {
            setCurrentView(view);
        }
    }

    return (
        <div className="app-header">
            <div className="header-container left">
                {VIEWS.map(value => (
                    <button 
                        key={value} 
                        className={getClassNames({
                            [`${value}-button`]: true,
                            'current': value === currentView, 
                        })}
                        onClick={() => handleOnChangeView(value)}
                    >
                        {`${value[0].toUpperCase()}${value.substring(1)}`}
                    </button>
                ))}
            </div>
            <div className="header-container center">
                <button className="prev-button" onClick={handleOnPrev}>{'<'}</button>
                <HeaderTitle currentView={currentView} date={date} setDate={setDate} />
                <button className="next-button" onClick={handleOnNext}>{'>'}</button>
            </div>
            <div className="header-container right">
                <button className="add-event-button" onClick={() => setIsModalOpen(true)}>+ Add Event</button>
            </div>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalStyle={modalStyle} >
                <AddEventModal events={events} setEvents={setEvents} setIsOpen={setIsModalOpen} />
            </Modal>
        </div>
    )
};

export default Header;