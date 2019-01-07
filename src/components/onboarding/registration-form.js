import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../../actions/user-crud';
import {login} from '../../actions/auth';
import Input from '../input';
import {formatName} from '../helper-functions'
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import './onboarding-form.css'
import './registration-form.css'

const passwordLength = length({min: 6, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        user.firstName = formatName(user.firstName);
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <form
                className="onboarding-form register form blurb center-me"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <h2>Register</h2>
                <Field 
                    component={Input} 
                    type="text" 
                    name="firstName" 
                    label="First Name:"
                    className="required"
                    maxLength="12"
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
                    name="password"
                    label="Password:"
                    className="required"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="password"
                    label="Confirm Password:"
                    name="passwordConfirm"
                    className="required"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);