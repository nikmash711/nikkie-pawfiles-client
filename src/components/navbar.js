import React from 'react';
import {connect} from 'react-redux';
import {toggleNavbar} from '../actions/index';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
// import {Link} from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
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
        <Link className="logo" to="/home">
          <span className="red">P</span> 
          <span className="blue">A</span> 
          <span className="pink">W</span> 
          <span className="green">F</span> 
          <span className="yellow">I</span> 
          <span className="purple">L</span> 
          <span className="red">E</span> 
          <span className="blue">S</span> 
        </Link>
        <button 
          onClick={()=>this.props.dispatch(toggleNavbar())} className="icon right">
          <i className="fa fa-bars"></i>
        </button>
         <div className = "right">
         {this.props.loggedIn && 
          <Link 
            className={className} 
            to ="/home">HOME
          </Link>}
          { this.props.loggedIn && 
          <Link 
            className={className} 
            to ="/settings">SETTINGS
          </Link>}
         {this.props.loggedIn && 
          <button id="logout" 
          className={className} 
          onClick={() => this.logOut()}>LOGOUT
          </button>}

         {!this.props.loggedIn && 
          <Link 
            onClick={()=>this.props.dispatch(toggleNavbar(false))}
            className={className} 
            to ="/#login">LOGIN
          </Link>}
         {!this.props.loggedIn && 
          <Link 
            className={className} 
            to ="/register/#register">REGISTER
          </Link>}

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