import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../../actions/user-crud';
import {login} from '../../actions/auth';
import Input from '../input';
import {formatName} from '../helper-functions'
import {loadingAnimationToggle} from '../../actions/index'
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import LoadingAnimation from '../loading-animation'
import './onboarding-form.css'
import './registration-form.css'

const passwordLength = length({min: 6, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {

    componentDidMount(){
        document.title = "Register"
    }

    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        user.firstName = formatName(user.firstName);
        //start showing an animation 
        this.props.dispatch(loadingAnimationToggle(true))
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    componentWillUnmount(){
        this.props.dispatch(loadingAnimationToggle(false))
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }

        return (
            <form
                className="onboarding-form register form blurb"
                id="register"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <h2>Register</h2>

                {error}

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
                {this.props.loadingAnimation && <LoadingAnimation/>}
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        loadingAnimation: state.pawfile.loadingAnimation
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'registration',
    onSubmitFail: (error, dispatch) => {
        console.log("ERROR", error)
        dispatch(loadingAnimationToggle(false))
        dispatch(focus('registration', Object.keys(error)[0]));
    }
})(RegistrationForm));