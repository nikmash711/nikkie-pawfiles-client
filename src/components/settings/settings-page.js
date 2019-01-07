import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import SettingsForm from './settings-form'
import requiresLogin from '../requires-login';

export class SettingsPage extends React.Component{
  componentDidMount(){
    console.log('settings mounting with props', this.props);
    document.title = 'Settings';
  }

  render(){
  
    return(
      <div className="settings">
        <Navbar/>
        <SettingsForm/>
        <Footer/>
      </div>
    );
  }
}

export default requiresLogin()(connect()(SettingsPage));