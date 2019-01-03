import React from 'react';
import {connect} from 'react-redux';
import Reminder from './reminder';
import {showReminderForm} from '../../actions/index';
import ReminderForm from './reminder-form'
import {sortOldestToNewest} from '../helper-functions';
import './reminder-blurb.css';

export class ReminderBlurb extends React.Component{

  render(){
    const reminders = this.props.reminders.map((reminder, index)=>(
      <Reminder reminderId={reminder.id} key={index} {...reminder}/>
    ));

    sortOldestToNewest(reminders);

    return(
      <article className="blurb reminders">
        <h2>Reminders</h2>
        <ul className = "reminders-list">
          {reminders}
          <li className="reminder">
            <button onClick={()=>{this.props.dispatch(showReminderForm(true, undefined))}} className="add-reminder">+ Add New</button>
          </li>
        </ul>
        {this.props.showReminderForm && <ReminderForm/>}
      </article>
    );
  }
}

function mapStateToProps(state) {
  return {
    showReminderForm: state.pawfile.showReminderForm,
    currentReminderId: state.pawfile.currentReminderId
  }
}

export default connect(mapStateToProps)(ReminderBlurb);