import React from 'react';
import {connect} from 'react-redux';
import Reminder from './reminder';
import {addingNewReminder} from '../../actions/index';
import {todaysDate} from '../helper-functions';
import './reminder-blurb.css';

export class ReminderBlurb extends React.Component{

  onSubmit(e){
    e.preventDefault();
    const values={note: this.noteInput.value, date: this.dateInput.value};
    this.props.dispatch(addingNewReminder(values, this.props.id));
    this.noteInput.value = "";
    this.dateInput.value="";
  }
  
  render(){
    const reminders = this.props.reminders.map((reminder, index)=>(
      <Reminder reminderId={index} key={index} {...reminder}/>
    ));

    return(
      <article className="blurb reminders">
        <h2>Reminders</h2>
        <ul className = "reminders-list">
          {reminders}
          <li>
            <form className="new-reminder-form reminder" onSubmit={ (e)=> this.onSubmit(e)}>
              <input required className="new-reminder-note reminder-note" ref={input => this.noteInput = input} type="text" id="new-reminder" name="note" placeholder="Start typing..."/>
              <input required className="reminder-date" ref={input => this.dateInput = input} type="date" min={todaysDate()}/>

              {/* <button className="add-reminder">+</button> */}

              {/* <button type="button" className="more-options-button" onClick={()=>this.toggleMoreOptions()}>More options</button> */}

              {/* {this.state.showMoreOptions && 
              <div className="more-options">
                <input ref={input => this.dateInput = input} type="date" max={todaysDate()}/>
              </div>
              } */}

              {/* <button className="add-reminder-button" type="submit" onClick={(e)=>this.onSubmit(e)}>Add</button> */}
              {/* Have the time/date option be hidden unless user clicks a button that says time/date, then display visible and keep the values and submit with form  */}
              {/* <input type="date" />
              <input type="time" /> */}
            </form>
          </li>
        </ul>
      </article>
    );
  }
}

export default connect()(ReminderBlurb);