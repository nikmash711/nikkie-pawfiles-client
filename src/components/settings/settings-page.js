import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import BasicAccountInfoForm from './basic-account-info-form'
import ChangePasswordForm from './change-password-form'
import requiresLogin from '../requires-login';
import './settings-page.css'


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
        <header className="sticky"> 
          <h1 className="section"> Settings</h1>
        </header>
          <BasicAccountInfoForm/>
          <ChangePasswordForm/>
        </main>
        <Footer/>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   currentUser: state.auth.currentUser,
//   firstName: state.auth.currentUser.firstName,
// });

export default requiresLogin()(connect()(SettingsPage));