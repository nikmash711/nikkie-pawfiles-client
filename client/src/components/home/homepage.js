import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import MyPawfiles from './my-pawfiles';

export class HomePage extends React.Component{
  componentDidMount(){
    document.title = `${this.props.user}'s Pawfiles`;
  }

  render(){
    return(
      <div className="home">
        <Navbar/>
        <MyPawfiles/>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.pawfile.user.firstName,
});

export default connect(mapStateToProps)(HomePage);