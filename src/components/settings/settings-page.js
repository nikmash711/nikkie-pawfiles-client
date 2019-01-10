import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import BasicAccountInfoForm from './basic-account-info-form'
import ChangePasswordForm from './change-password-form'
import requiresLogin from '../requires-login';
import {changeSuccessMessage} from '../../actions/auth';
import './settings-page.css'


export class SettingsPage extends React.Component{
  componentDidMount(){
    console.log('settings mounting with props', this.props);
    document.title = 'Settings';
  }

  componentWillUnmount(){
    console.log('settings unmounting')
  }

  componentDidUpdate(){
    window.scrollTo(0, 0); //make it jump to top
    if(this.props.successMessage){
    
      //set a timer that changes the message back to null after seven seconds of displaying it
    setTimeout(
        function() {
          this.props.dispatch(changeSuccessMessage(null));
        }
        .bind(this),
        7000
    );
    }
  }

  render(){

    return(
      <div className="settings">
        <Navbar/>
        <main className="settings-main">
          {this.props.successMessage && 
          <div className="updated-message" aria-live="polite">
            {this.props.successMessage}
          </div>
          }

          <BasicAccountInfoForm/>
          <ChangePasswordForm/>
        </main>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  successMessage: state.auth.successMessage,
});

export default requiresLogin()(connect(mapStateToProps)(SettingsPage));