import React, { useState } from 'react';
import moment from 'moment';
import Header from './components/Header';
import Calendar from './components/Calendar';
import { MONTH_VIEW } from './constants';
import './App.scss';

const App = () => {
  const [date, setDate] = useState(moment());
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState(MONTH_VIEW);

  return (
    <div className="app">
      <Header 
        date={date} 
        setDate={setDate} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        events={events} 
        setEvents={setEvents} 
      />
      <Calendar 
        date={date} 
        setDate={setDate} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        events={events}
      />
    </div>
  );
};

export default App;
