import React, { useState } from 'react';
import moment from 'moment';
import Modal from '../Modal';
import { 
    MONTH_VIEW, 
    WEEK_VIEW, 
    DAY_VIEW, 
    MONTH_TITLES, 
    WEEKS_MODIFICATOR, 
    TITLE_FORMAT, 
    WEEKS_FORMAT
} from '../../constants';
import Month from '../MonthView';
import './style.scss';

const modalStyle = {
    width: 'auto',
    height: 'auto',
};

const HeaderTitle = ({ currentView, date, setDate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    let title = '';
    let modalContent = null;
    
    if (currentView === MONTH_VIEW) {
        title = moment(date).format('MMMM YYYY');
        modalContent = (
            <div>
                <button onClick={() =>  setDate(moment())}>Today</button>
                <div className="month-buttons">
                    {MONTH_TITLES.map((value, index) => (
                        <p key={index} onClick={() => 
                            setDate(moment(date).set({ month: index }))
                        }>{value}</p>
                    ))}
                </div>
            </div>
        );
    } else if (currentView === WEEK_VIEW) {
        const weeks = [];
        WEEKS_MODIFICATOR.forEach((value, index) => {
            const endWeek = moment(date).startOf('week').add(value, 'weeks').subtract(1, 'days');
            const startWeek = moment(endWeek).subtract(6, 'days');

            if (index === 2){
                title = `${startWeek.format(TITLE_FORMAT)} - ${endWeek.format(TITLE_FORMAT)}`;
            }
            weeks.push({ 
                label: `${startWeek.format(WEEKS_FORMAT)} - ${endWeek.format(WEEKS_FORMAT)}`, 
                startWeek 
            });
        });

        modalContent = (
            <div>
                <button onClick={() => setDate(moment())}>Today</button>
                <div className="week-buttons">
                    {weeks.map((value, index) => (
                        <button key={index} onClick={() => setDate(moment(value.startWeek))}>
                            {value.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    } else if (currentView === DAY_VIEW) {
        title = moment(date).format(TITLE_FORMAT);
        modalContent = (
            <Month calendar date={date} onClickDay={(value) => setDate(value)}/>
        );
    }

    return (
        <div className="header-title" onClick={() => setIsModalOpen(true)}>
            <p>{title}</p>
            <Modal 
                isOpen={isModalOpen} 
                setIsOpen={setIsModalOpen}
                mainComponentSelector=".header-title" 
                modalStyle={modalStyle}
                arrow
            >
                <div className="title-modal">
                    {modalContent}
                </div>
            </Modal>
        </div>
    );
};

export default HeaderTitle;