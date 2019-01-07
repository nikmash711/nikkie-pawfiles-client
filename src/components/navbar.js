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


  
    return( 
      <nav className="main-navbar">
        <Link className="logo" to="/home">Pawfiles</Link>
        <button onClick={()=>this.props.dispatch(toggleNavbar())} className="icon right"><i className="fa fa-bars"></i></button>
         <div className = "right">
         {this.props.loggedIn && <Link className={className} to ="/home">Home</Link>}
        <Link className={className} to ="/about">About</Link>
        { this.props.loggedIn && <Link className={className} to ="/settings">Settings</Link>}
         {this.props.loggedIn && <button id="logout" className={className} onClick={() => this.logOut()}>Log out</button>}

         {!this.props.loggedIn && <Link className={className} to ="/">Log In</Link>}
         {!this.props.loggedIn && <Link className={className} to ="/register">Register</Link>}
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