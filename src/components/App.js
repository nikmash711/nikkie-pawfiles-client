import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import HomePage from './home/homepage';
import PawfilePage from './pawfilepage/pawfilepage';
import SettingsPage from './settings/settings-page';
import {Redirect, Switch} from 'react-router-dom';
import LandingPage from './landing-page';
import RegistrationPage from './registration-page';
import {refreshAuthToken} from '../actions/auth';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
        // When we are logged in, refresh the auth token periodically
        this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
        // Stop refreshing when we log out
        this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
      this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
      this.refreshInterval = setInterval(
          () => this.props.dispatch(refreshAuthToken()),
          60 * 60 * 1000 // One hour
      );
  }

  stopPeriodicRefresh() {
      if (!this.refreshInterval) {
          return;
      }

      clearInterval(this.refreshInterval);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/home" component={HomePage}></Route>
          <Route exact path="/settings" component={SettingsPage}></Route>
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/:pawfileId" component={PawfilePage}></Route>
          <Redirect exact from="*" to="/home" />
          {/* if user tries to access a route that doesn't exist, they will be redirected to home page */}
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default connect(mapStateToProps)(App);