import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Reminder from './reminder';
import {addingNewReminder} from '../../actions/index';

import './reminder-blurb.css';

export class ReminderBlurb extends React.Component{

  constructor(props){
    super(props)

    this.state={
      showMoreOptions: false,
    }
  }

  onSubmit(e){
    e.preventDefault();
    const values={note: this.noteInput.value};
    this.props.dispatch(addingNewReminder(values, this.props.id));
  }
  
  render(){
    console.log('re-render');
    const reminders = this.props.reminders.map((reminder, index)=>(
      <Reminder key={index} {...reminder}/>
    ));
  
    return(
      <article className="blurb reminders">
        <h2>Reminders</h2>
        <ul className = "reminders-list">
          {reminders}
          <li>
          <form className="new-reminder-form">
            <label htmlFor="new-reminder"></label>
            <input className="new-reminder-note" ref={input => this.noteInput = input} type="text" id="new-reminder" name="note" placeholder="Start typing..."/>

            <button type="button" className="more-options-button" onClick={()=>this.setState({showMoreOptions: true})}>More options</button>

            {this.state.showMoreOptions && 
            <div className="more-options">
              <p>Testing</p>
            </div>
            }

            <button className="add-reminder-button" type="submit" onClick={(e)=>this.onSubmit(e)}>Add</button>
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