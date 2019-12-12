import React, { useState } from 'react';
import Month from '../MonthView';
import Modal from '../Modal';
import { 
    WEEKS_FORMAT, 
    ERROR_MESSAGE_EMPTY_TITLE,
    ERROR_MESSAGE_END_LESS_START_TIME,
    ERROR_MESSAGE_EVENTS_INTERSECTS,
    EVENT_BACKGROUND_COLOR,
} from '../../constants';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import './style.scss';
import { getRandomFromArray } from '../../utils';

const moment = extendMoment(Moment);

const modalStyle = {
    width: '300px',
}

const AddEventModal = ({ events, setEvents, setIsOpen }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [event, setEvent] = useState({
        date: moment(),
        from_h: 0,
        from_m: 0,
        to_h: 0,
        to_m: 0,
    });
    const [error, setError] = useState(null);

    const showError = (errorMessage, event) => {
        event.preventDefault();
        event.stopPropagation();
        setError(errorMessage);
        return true;
    }

    const handleOnAddEvent = (e) => {
        const sameDayEvents = [];
        let isError = false;
        
        const startDate = moment(event.date).set({ 
            hour: event.from_h, 
            minute: event.from_m, 
        });
        const endDate = moment(event.date).set({ 
            hour: event.to_h, 
            minute: event.to_m,
        });

        events.forEach(value => {
            const eventDate = value.start;
            if (
                eventDate.isSame(event.date, 'year') && 
                eventDate.isSame(event.date, 'month') && 
                eventDate.isSame(event.date, 'day')
            ) {
                sameDayEvents.push(value);
            }
        });

        if (!event.title) {
            isError = showError(ERROR_MESSAGE_EMPTY_TITLE, e);
        } else if (startDate.isSameOrAfter(endDate)) {
            isError = showError(ERROR_MESSAGE_END_LESS_START_TIME, e);
        } else if (sameDayEvents.length) {
            sameDayEvents.forEach(value => {
                const range = moment.range(value.start, value.end);
                const newEventRange = moment.range(startDate, endDate);
                if (range.overlaps(newEventRange)) {
                    isError = showError(ERROR_MESSAGE_EVENTS_INTERSECTS, e);
                    return;
                }
            });
        }

        if (!isError) {
            const newEvent = {
                title: event.title,
                description: event.description || '',
                start: startDate,
                end: endDate,
                color: getRandomFromArray(EVENT_BACKGROUND_COLOR),
            };
            setEvents(prevState => ([...prevState, newEvent]));
            setIsOpen(false);
        }
    }

    const handleOnChange = (field, e) => {
        const { target } = e;
        if (target) {
            setEvent(prevState => ({
                ...prevState, 
                [field]: target.value
            }));
        }
    } 

    return (
        <div className="add-event-modal">
            <h2>New Event</h2>
            <hr />
            <div className="add-event-content add-event-content__name">
                <p>Name</p>
                <input type="text" onChange={e => handleOnChange('title', e)}/>
            </div>
            <div className="add-event-content add-event-content__description">
                <p>Description</p>
                <input type="text" onChange={e => handleOnChange('description', e)} />
            </div>
            <div className="add-event-content add-event-content__date">
                <p>Date</p>
                <input 
                    id="add-event-date" 
                    type="text" 
                    value={event.date.format(WEEKS_FORMAT)} 
                    onClick={() => setIsModalOpen(true)}
                    readOnly 
                />
                <Modal 
                    isOpen={isModalOpen} 
                    modalStyle={modalStyle} 
                    setIsOpen={setIsModalOpen} 
                    mainComponentSelector=".add-event-content__time-to"
                    arrow 
                >
                    <Month calendar onClickDay={value => {
                        setIsModalOpen(false);
                        setEvent(prevState => ({...prevState, 'date': value}));
                    }}/>
                </Modal>
            </div>
            <div className="add-event-content add-event-content__time-from">
                <p>Time from</p>
                <input 
                    type="number" 
                    placeholder={0} 
                    max={23} 
                    min={0} 
                    onChange={e => handleOnChange('from_h', e)}
                />
                <input 
                    type="number" 
                    placeholder={0} 
                    max={59} 
                    min={0} 
                    onChange={e => handleOnChange('from_m', e)}
                />
            </div>
            <div className="add-event-content add-event-content__time-to">
                <p>Time to</p>
                <input 
                    type="number" 
                    placeholder={0} 
                    max={23} 
                    min={0} 
                    onChange={e => handleOnChange('to_h', e)}
                />
                <input 
                    type="number" 
                    placeholder={0} 
                    max={59} 
                    min={0} 
                    onChange={e => handleOnChange('to_m', e)}
                />
            </div>
            <div className="add-event-content add-event-content__error right">
                <p className="error">{error}</p>
                <button type="button" onClick={handleOnAddEvent}>Create</button>
            </div>
        </div>
    );
};

export default AddEventModal;