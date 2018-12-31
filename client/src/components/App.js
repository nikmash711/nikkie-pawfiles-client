import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './home/homepage';
import PawfilePage from './pawfile/pawfilepage';
import {Redirect, Switch} from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/home" component={HomePage}></Route>
          <Route exact path="/:pawfileName/:pawfileId" component={PawfilePage}></Route>
          <Redirect exact from="*" to="/home" />
          {/* if user tries to access a route that doesn't exist, they will be redirected to home page */}
        </Switch>
      </Router>
    );
  }
}
