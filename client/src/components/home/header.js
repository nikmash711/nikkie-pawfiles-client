import React from 'react';
import {connect} from 'react-redux';

import './header.css'

export function Header(props){
  return(
    <header className="sticky"> 
      <h1 className="section"> {props.user}'s Pets</h1>
    </header>
  );
}

const mapStateToProps = state => ({
  user: state.pawfile.user.firstName,
});

export default connect(mapStateToProps)(Header);