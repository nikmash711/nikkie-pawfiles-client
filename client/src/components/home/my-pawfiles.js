import React from 'react';
import {connect} from 'react-redux';
import PawfilesList from './pawfiles-list';
import AddNewPawfileButton from './add-new-pawfile-button';
import Header from './header';
import './my-pawfiles.css'

export default function MyPawfiles(){
  return(
    <main>
      <div className="center-me">
        <Header/>
        <PawfilesList/>
        <AddNewPawfileButton/>
        {/* <AddNewPawfileForm/> */}
      </div>
    </main>
  );
}