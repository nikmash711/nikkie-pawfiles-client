import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './home/homepage';
import PawfilePage from './pawfile/pawfilepage';


import './App.css';


export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="routes">
          <Route exact path="/home" component={HomePage}></Route>
          <Route exact path="/:pawfileName/:pawfileId" component={PawfilePage}></Route>
        </div>
      </Router>
    );
  }
}
