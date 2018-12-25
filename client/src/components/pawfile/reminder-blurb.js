import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './reminder-blurb.css';

export function ReminderBlurb(props){
  return(
    <article className="blurb reminders">
      <h2>Reminders</h2>
      <div className="option-icons">
        <i className="fas fa-edit"></i>
        <i className="fas fa-trash-alt"></i>
      </div>
      <p>Testing</p>
    </article>
  );
}

export default connect()(ReminderBlurb);