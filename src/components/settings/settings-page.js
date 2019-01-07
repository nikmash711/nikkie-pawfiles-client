import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import BasicAccountInfoForm from './basic-account-info-form'
import ChangePasswordForm from './change-password-form'
import requiresLogin from '../requires-login';
import {changeSuccessMessage, refreshProfileAuthToken} from '../../actions/auth';
import './settings-page.css'


export class SettingsPage extends React.Component{
  componentDidMount(){
    console.log('settings mounting with props', this.props);
    document.title = 'Settings';
  }

  componentWillUnmount(){
    console.log('settings unmounting')
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

const mapStateToProps = state => ({
  successMessage: state.auth.successMessage
});

export default requiresLogin()(connect(mapStateToProps)(SettingsPage));