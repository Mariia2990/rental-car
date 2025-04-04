import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  getMonthName,
  // getDaysInMonth,
  generateCalendarDays,
} from './Calendar';
import css from './Calendar.module.css';

const Calendar = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? selectedDate.getMonth() : new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState(
    selectedDate ? selectedDate.getFullYear() : new Date().getFullYear(),
  );

  const handlePrevMonth = () => {
    setCurrentMonth(prev => (prev > 0 ? prev - 1 : 11));
    setCurrentYear(prev => (currentMonth === 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => (prev < 11 ? prev + 1 : 0));
    setCurrentYear(prev => (currentMonth === 11 ? prev + 1 : prev));
  };

  const handleDayClick = day => {
    const newDate = new Date(currentYear, currentMonth, day);
    onDateChange(newDate);
  };

  // const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const monthName = getMonthName(currentYear, currentMonth);
  const calendarDays = generateCalendarDays(currentMonth, currentYear);

  return (
    <div className={css.customCalendar}>
      <div className={css.header}>
        <button
          type="button"
          onClick={handlePrevMonth}
          className={css.navButton}
        >
          {'<'}
        </button>
        <span className={css.monthYear}>
          {monthName} {currentYear}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className={css.navButton}
        >
          {'>'}
        </button>
      </div>
      <div className={css.weekdays}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <span key={day} className={css.weekday}>
            {day}
          </span>
        ))}
      </div>
      <div className={css.days}>
        {calendarDays.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleDayClick(item.day)}
            className={`${css.day} ${
              item.isCurrentMonth &&
              selectedDate &&
              selectedDate.getDate() === item.day &&
              selectedDate.getMonth() === currentMonth &&
              selectedDate.getFullYear() === currentYear
                ? css.selected
                : ''
            } ${!item.isCurrentMonth ? css.inactive : ''}`}
            disabled={!item.isCurrentMonth}
          >
            {item.day}
          </button>
        ))}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
};

export default Calendar;
