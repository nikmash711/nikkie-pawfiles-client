import React from 'react';
import Navbar from '../common/navbar';
import Footer from '../common/footer';
import BriefAbout from '../common/brief-about'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import LoginForm from './login-form';
import './landing-page.css'

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's homepage
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }

    return (
        <div className="landing-page">
            <Navbar/>
            <main className="landing-page-main">
                <BriefAbout/>
                <LoginForm />
            </main>
            <Footer/>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);