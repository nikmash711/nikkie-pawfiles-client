import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {toggleNavbar} from '../actions/index';

import './navbar.css'

export function Navbar(props){
  console.log('re-rendering navbar');

  let className = props.toggleNavbar ? "show link" : "dontshow link";
  
  return( 
    <nav className="main-navbar">
      <Link className="logo" to="#">Pawfiles</Link>
      <button onClick={()=>props.dispatch(toggleNavbar())} className="icon right" to="#"><i className="fa fa-bars"></i></button>
       <div className = "right">
       <Link className={className} to ="/home">Home</Link>
       <Link className={className} to ="/about">About</Link>
       <Link className={className} to ="#">Settings</Link>
       <Link className={className} to ="#">Logout</Link> 
     </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  toggleNavbar: state.pawfile.toggleNavbar,
});

export default connect(mapStateToProps)(Navbar);