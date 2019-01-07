import React from 'react';
import {connect} from 'react-redux';
import Input from '../input';
import {reduxForm, Field, Fieldset, SubmissionError, focus} from 'redux-form';
import {updatedUser} from '../../actions/user-crud';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';

import './settings-form.css'

const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('newPassword');

export class SettingsForm extends React.Component{
  onSubmit(values) {
    const {username, oldPassword, newPassword, firstName, lastName} = values;
    const user = {username, oldPassword, newPassword, firstName, lastName};
    return this.props.dispatch(updatedUser(user));
}

  render(){
  
    return(
      <main className="settings-main">
        <form
          className=""
          onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
          )}>
          <h2>Account Information</h2>
          <Field 
              component={Input} 
              type="text" 
              name="firstName" 
              label="First Name:"
              className="required"
              validate={[required, nonEmpty, isTrimmed]}
          />
          <Field 
              component={Input} 
              type="text" 
              name="lastName" 
              label="Last Name:"
              className="required"
              validate={[required, nonEmpty, isTrimmed]}
          />
          <Field
              component={Input}
              type="text"
              name="username"
              label = "Username:"
              className="required"
              validate={[required, nonEmpty, isTrimmed]}
          />

          <Field
              component={Input}
              type="password"
              name="oldPassword"
              label="Old Password:"
              className="required"
              validate={[required, passwordLength, isTrimmed]}
          />

          <Field
              component={Input}
              type="password"
              name="newPassword"
              label="New Password:"
              className="required"
              validate={[required, passwordLength, isTrimmed]}
          />
          <Field
              component={Input}
              type="password"
              label="Confirm Password:"
              name="confirmPassword"
              className="required"
              validate={[required, nonEmpty, matchesPassword]}
          />
          <button
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Register
          </button>
        </form>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    // to get the initial values if the user is editing the form: 
    initialValues: {
      firstName: state.auth.currentUser.firstName,
      lastName: state.auth.currentUser.lastName,
      username: state.auth.currentUser.username,
      
    }
  }
}

export default connect(mapStateToProps)(reduxForm({
  form:'SettingsForm',
})(SettingsForm));