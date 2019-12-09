import React, { useState } from 'react';
import moment from 'moment';
import Header from './components/Header';
import Calendar from './components/Calendar';
import './App.scss';
import { MONTH_VIEW } from './constants';

const App = () => {
  const [date, setDate] = useState(moment());
  const [currentView, setCurrentView] = useState(MONTH_VIEW);

  return (
    <div className="app">
      <Header date={date} setDate={setDate} currentView={currentView} setCurrentView={setCurrentView} />
      <Calendar date={date} setDate={setDate} currentView={currentView} />
    </div>
  );
};

export default App;
