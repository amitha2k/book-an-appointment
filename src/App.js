import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import GlobalContext from './GlobalContext';

function Calendar() {
  //Today's Date:
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { dateVar, setDateVar, timeVar, setTimeVar, yearVar, setYearVar, monthVar, setMonthVar } = useContext(GlobalContext);

  // useEffect(() => {
  //   setSelectedDate(dateVar);
  // }, [dateVar])

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
  const curr = new Date()
  //previousWeek and nextWeek mutate selectedDate to the date 7 days prior and later respectively.
  const previousWeek = () => {
    if (selectedDate > curr){
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 7));
      document.getElementById("prev").disabled = true;
      document.getElementById("next").disabled = false;
    }
  };

  const nextWeek = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 7));
    document.getElementById("next").disabled = true;
    document.getElementById("prev").disabled = false;
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

  const updateWhen = (d,h) => {
    setDateVar(d.getDate());
    setMonthVar(d.getMonth());
    setYearVar(d.getFullYear());
    setTimeVar(h);
  }


  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
    <div className="calendar-container">
      <h1 className="header">Week of {currentWeekStart.getDate()} {monthName(currentWeekStart.getMonth())} {currentWeekStart.getFullYear()}</h1>
      {/* <h2>{dateVar} {timeVar}</h2> */}
      <span className="navigators">
        <button id="prev" onClick={previousWeek}>&lt;</button>
        <button id= "next" onClick={nextWeek}>&gt;</button>
      </span>
      <br></br>
      <br></br>
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
                    {/* <Link to="/get-an-appointment" onClick={toggleModal}> */}
                      <button 
                      className="slotButtons"
                      onClick={() => {
                        updateWhen(date, hour);
                        toggleModal();
                        }}>.</button>
                    {/* </Link> */}
                  </td>;
                }
                return <td key={`${date}-${hour}`} className="inactive">unavailable</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Book an Appointment</h2>
            <form>
              <input type="text" name="name" id="name" placeholder="Name"></input>
              <br></br><br></br>
              <input type="email" name="email" id="email" placeholder="School e-mail"></input>
              <br></br><br></br>
              <label for="course">Course: </label>
              <select name="course" id="course">
              <option>Select a Course</option>
              <option>MATH 135</option>
              <option>MATH 136</option>
              <option>MATH 137</option>
              <option>MATH 138</option>
              <option>MATH 235</option>
              <option>MATH 237</option>
              <option>MATH 239</option>
              <option>CS 115</option>
              <option>CS 116</option>
              <option>CO 250</option>
              <option>STAT 230</option>
              <option>Other</option>
              </select>
              <br></br><br></br>
              <label for="mode">Mode: </label>
              <select name="mode" id="mode">
                <option> in-person</option>
                <option> online (via Teams) </option>
              </select>
              <br></br><br></br>
              <label for="date">Date: {dateVar} {monthName(monthVar)} {yearVar}</label>
              <br></br><br></br>
              <label for="time">Time: {timeVar} </label>
              <br></br><br></br>
              <label for="relatedFiles">Attach any relevant files here 
              (eg: assignments, coursenotes or screenshots of the same)</label>
              <br></br>
              <input type="file" name="relatedFiles" id="relatedFiles"></input>
              <br></br><br></br>
              <label for="comments">Any Comments: </label>
              <br></br>
              <input type="text" name="comments" id="comments"></input>
              <br></br><br></br>
              <input type="submit" value="Book"></input>

      </form>

            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Calendar;