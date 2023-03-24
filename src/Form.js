import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useHistory } from "react-router-dom";

function Appointment() {
  return (
    <div>
      <h1>Book an Appointment</h1>
      <form>
        <label for="name">Name: </label>
        <input type="text" name="name" id="name"></input>
        <br></br><br></br>
        <label for="email">School e-mail: </label>
        <input type="email" name="email" id="email"></input>
        <br></br><br></br>
        <label for="course">Course: </label>
        <select name="course" id="course">
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
        <input type="date"></input>
        <br></br><br></br>
        <label for="time">Time: </label>
        <input type="time"></input>
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