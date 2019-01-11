import React from 'react';
import {connect} from 'react-redux';
import {formatDate, changeMilitaryFormat} from '../helper-functions';
import {showReminderForm} from '../../actions/index';
import {deleteReminder} from '../../actions/reminder-crud';

import './reminder.css'

export class Reminder extends React.Component{

  render(){
    return(
      <li data-id={`${this.props.reminderId}`} className="reminder">
        <div className="option-icons">
          <button className="delete-button" aria-label = "delete" onClick={()=> this.props.dispatch(deleteReminder(this.props.currentPetId, this.props.reminderId))}><i className="fas fa-trash-alt"></i></button>
          <span className = "delete-span js-delete-span">Delete</span>


          <button className="edit-button" aria-label = "edit" onClick={()=> this.props.dispatch(showReminderForm(true, this.props.reminderId))}><i className="fas fa-edit"></i></button>
          <span className = "edit-span">Edit</span>

        </div>

        <span className="reminder-note">
          <strong>{this.props.note}</strong>
        </span>

        <div className="date-and-time">
          {
            this.props.date && 
            <span className="reminder-date">
              {formatDate(this.props.date).toLocaleDateString()}
            </span>
          }
          {
            this.props.time && 
            <span className="reminder-time">
            {changeMilitaryFormat(this.props.time)}
          </span>
          }
        </div>
      </li>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentPetId: state.pawfile.currentPetId,
  }
}

export default connect(mapStateToProps)(Reminder);