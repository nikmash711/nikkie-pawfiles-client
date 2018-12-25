import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './navbar.css'

export default function Navbar(){
  return(
    <nav className="main-navbar">
      <Link className="logo" to="#">Pawfiles</Link>
      <Link className="icon right" to="#"><i className="fa fa-bars"></i></Link>
      <div className = "right">
        <Link className="link" to ="/home">Home</Link>
        <Link className="link" to ="/about">About</Link>
        <Link className="link" to ="#">Settings</Link>
        <Link className="link" to ="#">Logout</Link> 
      </div>
    </nav>
  );
}