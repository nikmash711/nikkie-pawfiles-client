import React from 'react';
import {connect} from 'react-redux';
import './reminder.css'

export function Reminder(props){
  return(
    <li className="reminder">
      <span className="reminder-note">
        {props.note}
      </span>
      <span className="reminder-date">
        {props.date}
      </span>
    </li>
  )
}

export default connect()(Reminder);