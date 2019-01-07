import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import BasicAccountInfoForm from './basic-account-info-form'
import ChangePasswordForm from './change-password-form'
import requiresLogin from '../requires-login';
import './settings-form.css'


export class SettingsPage extends React.Component{
  componentDidMount(){
    console.log('settings mounting with props', this.props);
    document.title = 'Settings';
  }

  render(){
  
    return(
      <div className="settings">
        <Navbar/>
        <main className="settings-main">
          <BasicAccountInfoForm/>
          <ChangePasswordForm/>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default requiresLogin()(connect()(SettingsPage));