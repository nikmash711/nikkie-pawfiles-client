import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import Sidebar from './sidebar';
import MainSection from './main-section';

export class PawfilePage extends React.Component{
  componentDidMount(){
    document.title = `${this.props.match.params.pawfileName}`;
  }

  render(){
    return(
      <div className="pawfile-page">
        <Navbar/>
        <Sidebar id={this.props.match.params.pawfileId}/>
        <MainSection/>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pawfiles: state.pawfile.pawfiles,
});

export default connect(mapStateToProps)(PawfilePage);