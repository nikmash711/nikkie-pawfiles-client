import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Navbar from './navbar'
import Footer from './footer'
import LoadingAnimation from './loading-animation'

export default () => Component => {
    function RequiresLogin(props) {
        const {authenticating, loggedIn, error, ...passThroughProps} = props;
        if (authenticating) {
            return(
            <div>
                <Navbar/>
                <LoadingAnimation/>
                <Footer/>
            </div>
            )
        } else if (!loggedIn || error) {
            return <Redirect to="/" />;
        }

        return <Component {...passThroughProps} />;
    }

    const displayName = Component.displayName || Component.name || 'Component';
    RequiresLogin.displayName = `RequiresLogin(${displayName})`;

    const mapStateToProps = (state, props) => ({
        authenticating: state.auth.loading,
        loggedIn: state.auth.currentUser !== null,
        error: state.auth.error
    });

    return connect(mapStateToProps)(RequiresLogin);
};