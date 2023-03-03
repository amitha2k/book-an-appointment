import React, { useState } from 'react';
import './style.css';

function Calendar() {
  //Today's Date:
  const [selectedDate, setSelectedDate] = useState(new Date());

  //Constants for day, month and time names
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const hoursOfDay = Array.from(Array(9), (_, i) => i + 9);
  const halfHoursOfDay = hoursOfDay.flatMap(hour => [`${hour}:00`, `${hour}:30`]);

  //previousWeek and nextWeek mutate selectedDate to the date 7 days prior and later respectively.
  const previousWeek = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 7));
  };

  const nextWeek = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 7));
  };

  //monthName consumes a number from 0-11 and returns the corresponding month name.
  function monthName(monthNum) {
    return months[monthNum];
  };

  const getDaysOfWeekForCurrentWeek = () => {
    const currentWeekStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()-selectedDate.getDay());
    const currentWeekEnd = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() + 6);
    const nextWeekStart = new Date(currentWeekEnd.getFullYear(), currentWeekEnd.getMonth(), currentWeekEnd.getDate() + 1);
    const nextWeekEnd = new Date(nextWeekStart.getFullYear(), nextWeekStart.getMonth(), nextWeekStart.getDate() + 6);
    return [currentWeekStart, currentWeekEnd, nextWeekStart, nextWeekEnd];
  };

  const [currentWeekStart, currentWeekEnd, nextWeekStart, nextWeekEnd] = getDaysOfWeekForCurrentWeek();

  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate()+i));
    }
    return dates;
  } 

  const datesOfWeek = getWeekDates();

  const datesAndDays = [];
  for (let i = 0; i < 7; i++) {
    datesAndDays.push([datesOfWeek[i], daysOfWeek[i]]);
  }

  return (
    <div className="calendar-container">
      <h1 className="header">Week of {currentWeekStart.getDate()} {monthName(currentWeekStart.getMonth())} {currentWeekStart.getFullYear()}</h1>
      <button onClick={previousWeek}>&lt;</button>
      <button onClick={nextWeek}>&gt;</button>
      <hl></hl>
      <table className="calendar">
        <thead>
          <tr>
            <th></th>
            {datesAndDays.map((pair) => (
              <th key={pair[1]}><span className="dates">{pair[0].getDate()}</span><br></br><span className="days">{pair[1]}</span></th>
              ))}
          </tr>
        </thead>
        <tbody>
          {halfHoursOfDay.map((hour) => (
            <tr key={hour}>
              <td>{hour}</td>
              {daysOfWeek.map((day) => {
                const currentDate = new Date(`${currentWeekStart.getMonth()+1}/${currentWeekStart.getDate()}/${currentWeekStart.getFullYear()}`);
                const cellDate = new Date(`${currentDate.getMonth()+1}/${currentDate.getDate()+daysOfWeek.indexOf(day)}/${currentDate.getFullYear()}`);
                if (cellDate >= currentWeekStart && cellDate <= nextWeekEnd) {
                  return <td key={`${day}-${hour}`}></td>;
                }
                return <td key={`${day}-${hour}`} className="inactive"></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;