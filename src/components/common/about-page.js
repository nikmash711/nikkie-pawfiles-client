import React from 'react';
import {connect} from 'react-redux';
import Navbar from './navbar';
import Footer from './footer'
import './about-page.css'

export class AboutPage extends React.Component{
  componentDidMount(){
    document.title = 'about pawfiles'
  }

  render(){

    return(
      <div className="about">
        <Navbar/>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(AboutPage);