import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './home/homepage';
// import Pawfile from './pawfile';

import './App.css';


export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/home" component={HomePage}></Route>
        {/* <Route exact path="/pawfile/:pawfileId" component={Pawfile}></Route> */}
      </Router>
    );
  }
}
