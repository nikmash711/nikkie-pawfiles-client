import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../input';
import {login} from '../../actions/auth';
import {required, nonEmpty} from '../validators';
import {Link} from 'react-router-dom';
import './onboarding-form.css'

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
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
                className="onboarding-form login form blurb"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <h2>Login</h2>

                {error}
                <Field
                    component={Input}
                    label="Username:"
                    className="required"
                    type="text"
                    name="username"
                    id="username"
                    validate={[required, nonEmpty]}
                />
                <Field
                    component={Input}
                    label="Password:"
                    className="required"
                    type="password"
                    name="password"
                    id="password"
                    validate={[required, nonEmpty]}
                />
                <button disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
                <h5>
                    Don't have an account? <Link to="/register">Register Here!</Link>
                </h5>
                
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);