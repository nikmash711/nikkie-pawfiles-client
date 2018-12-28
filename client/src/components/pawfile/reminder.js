import React from 'react';
import {connect} from 'react-redux';
import {formatDate} from '../helper-functions';

import './reminder.css'

export function Reminder(props){
  return(
    <li className="reminder">
      <button className="delete-reminder">X</button>
      <span className="reminder-note">
        <strong>{props.note}</strong>
      </span>
      <span className="reminder-date">
        {formatDate(props.date).toLocaleDateString()}
      </span>
    </li>
  )
}

export default connect()(Reminder);