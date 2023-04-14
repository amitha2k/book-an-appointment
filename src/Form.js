import React, { useState, useContext, useEffect } from 'react';
import './formStyle.css';
import { Link } from "react-router-dom";
import App from './App';
import GlobalContext from './GlobalContext';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useHistory } from "react-router-dom";

function Appointment() {
  const { dateVar, setDateVar, timeVar, setTimeVar } = useContext(GlobalContext);
  return (
    <div className="form-container">
      <h1>Book an Appointment</h1>
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
        <label for="date">Date: </label>
        <input type="text" placeholder={dateVar}></input>
        <br></br><br></br>
        <label for="time">Time: </label>
        <input type="text" placeholder={timeVar}></input>
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
    </div>
  )
};

export default Appointment;