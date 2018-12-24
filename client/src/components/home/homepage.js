import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import MyPawfiles from './my-pawfiles';

export default function HomePage(){
  return(
    <div className="home">
      <Navbar/>
      <MyPawfiles/>
      <Footer/>
    </div>
  );
}