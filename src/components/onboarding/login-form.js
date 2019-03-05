import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../common/input';
import {login} from '../../actions/auth';
import {loadingAnimationToggle} from '../../actions/index'
import {required, nonEmpty} from '../common/validators';
import {Link} from 'react-router-dom';
import LoadingAnimation from '../common/loading-animation'
import './onboarding-form.css'

export class LoginForm extends React.Component {
    
    componentDidMount(){
        document.title = "Login";
    }

    onSubmit(values) {
        //start showing an animation 
        this.props.dispatch(loadingAnimationToggle(true))
        return this.props.dispatch(login(values.username, values.password));
    }

    componentWillUnmount(){
        this.props.dispatch(loadingAnimationToggle(false))
    }

    render() {
        //general error that shows on top of form, _error
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
                id = "login"
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
                <button>
                    Log in
                </button>

                {this.props.loadingAnimation && <LoadingAnimation/>}

                <h5>
                    Don't have an account? <Link to="/register">Register Here!</Link>
                </h5>
                
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
    form: 'login',
    onSubmitFail: (error, dispatch) => {
        dispatch(loadingAnimationToggle(false))
        //jump to username input if there's a problem logging in:
        dispatch(focus('login', 'username'));
    }
})(LoginForm));