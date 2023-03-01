import React, { useState } from 'react';
import './style.css';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hoursOfDay = Array.from(Array(9), (_, i) => i + 9);
  const halfHoursOfDay = hoursOfDay.flatMap(hour => [`${hour}:00`, `${hour}:30`]);

  const previousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const daysInMonth = () => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month, daysInMonth).getDay();
    const days = [];
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(daysInPrevMonth - i);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
      days.push(i);
    }
    return days;
  };

  return (
    <div className="calendar-container">
      <h1>Week of {selectedDate.toLocaleDateString()}</h1>
      <button onClick={previousMonth}>&lt;</button>
      <button onClick={nextMonth}>&gt;</button>
      <table className="calendar">
        <thead>
          <tr>
            <th></th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {halfHoursOfDay.map((hour) => (
            <tr key={hour}>
              <td>{hour}</td>
              {daysOfWeek.map((day) => (
                <td key={`${day}-${hour}`}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;

