import React, { useState } from 'react';
import Month from '../MonthView';
import Modal from '../Modal';
import { 
    WEEKS_FORMAT, 
    ERROR_MESSAGE_EMPTY_TITLE,
    ERROR_MESSAGE_END_LESS_START_TIME,
    ERROR_MESSAGE_EVENTS_INTERSECTS,
    EVENT_BACKGROUND_COLOR,
    DEFAULT_EVENT_TIME,
} from '../../constants';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { getRandomFromArray, getCurrentDayEvents } from '../../utils';
import './style.scss';

const moment = extendMoment(Moment);

const modalStyle = {
    width: '300px',
}

const TIME_FIELDS = ['from', 'to'];

const AddEventModal = ({ events, setEvents, setIsOpen }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [event, setEvent] = useState({
        date: moment(),
        from: DEFAULT_EVENT_TIME,
        to: DEFAULT_EVENT_TIME,
    });
    const [error, setError] = useState(null);

    const showError = (errorMessage, event) => {
        event.preventDefault();
        event.stopPropagation();
        setError(errorMessage);
        return true;
    }

    const handleOnAddEvent = (e) => {
        const { title, description, date, from, to } = event; 
        const sameDayEvents = getCurrentDayEvents(events, date);
        let isError = false;
        
        let timeFrom = from.split(':');
        let timeTo = to.split(':');
        
        const startDate = moment(date).set({ 
            hour: timeFrom[0], 
            minute: timeFrom[1], 
        });
        const endDate = moment(date).set({ 
            hour: timeTo[0], 
            minute: timeTo[1],
        });

        if (!title) {
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
                title,
                description: description || '',
                start: startDate,
                end: endDate,
                color: getRandomFromArray(EVENT_BACKGROUND_COLOR),
            };
            setEvents(prevState => ([...prevState, newEvent].sort((a, b) => 
                a.start.valueOf() - b.start.valueOf())));
            setIsOpen(false);
        }
    }

    const handleOnChange = (field, e) => {
        const { target } = e;
        if (target) {
            let value = target.value;
            if (!value && TIME_FIELDS.includes(field)) {
                value = DEFAULT_EVENT_TIME;
            }
            setEvent(prevState => ({
                ...prevState, 
                [field]: value,
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
                    type="time" 
                    placeholder="00:00" 
                    min="00:00"
                    max="23:59" 
                    value={event.from} 
                    onChange={e => handleOnChange('from', e)}
                />
            </div>
            <div className="add-event-content add-event-content__time-to">
                <p>Time to</p>
                <input 
                    type="time" 
                    placeholder="00:00" 
                    min="00:00" 
                    max="23:59" 
                    value={event.to} 
                    onChange={e => handleOnChange('to', e)}
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