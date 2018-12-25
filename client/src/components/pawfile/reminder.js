import React from 'react';
import {connect} from 'react-redux';
import './reminder.css'

export function Reminder(props){
  return(
    <li className="reminder">
      <button className="delete-reminder">X</button>
      <span className="reminder-note">
        <strong>{props.note}</strong>
      </span>
      <span className="reminder-date">
        {props.date}
      </span>
    </li>
  )
}

export default connect()(Reminder);