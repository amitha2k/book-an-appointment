import React, { useState } from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Calendar() {
  //Today's Date:
  const [selectedDate, setSelectedDate] = useState(new Date());

  //Constants for day, month and time names
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const hoursOfDay = Array.from(Array(9), (_, i) => i + 9);
  const halfHoursOfDay = hoursOfDay.flatMap(hour => [`${hour}:00`, `${hour}:30`]);

  // Alternative approach to create halfHoursOfDay
  // const createTimeSlots = () => {
  //   const slots = [];
  //   for (let i = 10; i < 19; i++;) {
  //     slots.push([i,0], [i,30]);
  //   }
  //   return timeSlots
  // const timeSlots = createTimeSlots();

  //previousWeek and nextWeek mutate selectedDate to the date 7 days prior and later respectively.
  const previousWeek = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 7));
    document.getElementById("prev").disabled = true;
    document.getElementById("next").removeAttribute('disabled');
  };

  const nextWeek = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 7));
    document.getElementById("next").disabled = true;
    document.getElementById("prev").removeAttribute('disabled');
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
      <button id="prev" onClick={previousWeek}>&lt;</button>
      <button id= "next" onClick={nextWeek}>&gt;</button>
      <table className="calendar">
        <thead>
          <tr>
            <th></th>
            {datesAndDays.map((pair) => (
              <th className="slotColumns" key={pair[1]}><span className="dates">{pair[0].getDate()}</span><br></br><span className="days">{pair[1]}</span></th>
              ))}
          </tr>
        </thead>
        <tbody>
          {halfHoursOfDay.map((hour) => (
            <tr key={hour}>
              <td className="times">{hour}</td>
              {datesOfWeek.map((date) => {
                const currentDate = new Date()
                const maxLimit = new Date(currentDate.getFullYear(), currentDate.getMonth(),
                currentDate.getDate()+13-currentDate.getDay())
                if (date >= currentDate && date <= maxLimit) {
                  return <td key={`${date}-${hour}`}>
                    <Link to="/get-an-appointment" target="_blank"><button className="slotButtons">.</button></Link>
                  </td>;
                }
                return <td key={`${date}-${hour}`} className="inactive">unavailable</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;