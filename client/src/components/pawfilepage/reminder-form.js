import React from 'react';
import {connect} from 'react-redux';
import {submitReminder} from '../../actions/reminder-crud';
import {showReminderForm} from '../../actions/index';
import {todaysDate} from '../helper-functions';
import './reminder-blurb.css';
import './reminder-form.css';

export class ReminderForm extends React.Component{
  componentWillUnmount(){
    this.props.dispatch(showReminderForm(false, undefined));
  }

  onSubmit(e){
    e.preventDefault();
    const values={note: this.noteInput.value, date: this.dateInput.value};
    this.props.dispatch(submitReminder(values, this.props.currentPetId, this.props.currentReminderId));
    this.noteInput.value = "";
    this.dateInput.value="";
    this.props.dispatch(showReminderForm(false, undefined));
  }
  
  render(){
    console.log('individual reminder is', this.props.individualReminder);
    return(
      <div className="reminder-form-modal">
        <form className="new-reminder-form" onSubmit={ (e)=> this.onSubmit(e)}>
          <input required className="new-reminder-note reminder-note" ref={input => this.noteInput = input} type="text" id="new-reminder" name="note" placeholder="New reminder..." defaultValue={this.props.individualReminder ? this.props.individualReminder.note : ""}/>

          <input required className="reminder-date" ref={input => this.dateInput = input} type="date" defaultValue={this.props.individualReminder ? this.props.individualReminder.date : todaysDate()} />

          <button type="submit" className="save-reminder">Save</button>

          <button onClick={()=>this.props.dispatch(showReminderForm(false, undefined))} type="button" className="cancel-reminder">Cancel</button>
        </form>
      </div>

    );
  }
}

function mapStateToProps(state) {
  let currentReminderId = state.pawfile.currentReminderId;
  let currentPetId = state.pawfile.currentPetId;
  let individualPawfile = state.pawfile.pawfiles.find(pawfile=>pawfile.id==currentPetId);

  console.log('in reminder-form mapstate, the currentPetId is', currentPetId)

  return {
    currentReminderId: state.pawfile.currentReminderId,
    currentPetId: state.pawfile.currentPetId,
    individualReminder: individualPawfile.reminders.find(reminder=>reminder.id==currentReminderId)
  }
}

export default connect(mapStateToProps)(ReminderForm);