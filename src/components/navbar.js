import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {toggleNavbar} from '../actions/index';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import './navbar.css'

export class Navbar extends React.Component{
  componentWillUnmount(){
    this.props.dispatch(toggleNavbar(false));
  }

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render(){
    let className = this.props.toggleNavbar ? "show link" : "dontshow link";

    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
        logOutButton = (
            <button className={className} onClick={() => this.logOut()}>Log out</button>
        );
    }
  
    return( 
      <nav className="main-navbar">
        <Link className="logo" to="/home">Pawfiles</Link>
        <button onClick={()=>this.props.dispatch(toggleNavbar())} className="icon right"><i className="fa fa-bars"></i></button>
         <div className = "right">
         <Link className={className} to ="/home">Home</Link>
         <Link className={className} to ="/about">About</Link>
         <Link className={className} to ="#">Settings</Link>
         {logOutButton}
       </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  toggleNavbar: state.pawfile.toggleNavbar,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Navbar);