import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import MyPawfiles from './my-pawfiles';
import {changeSortingPetsMethod} from '../../actions/index';
import {fetchPawfiles} from '../../actions/pawfile-crud';
import {changeSuccessMessage} from '../../actions/auth'
import requiresLogin from '../requires-login';

export class HomePage extends React.Component{
  componentDidMount(){
    document.title = this.props.firstName ? `${this.props.firstName}'s Pets` : 'All Pets';
    this.props.dispatch(fetchPawfiles());
    this.props.dispatch(changeSuccessMessage(null));
  }

  componentWillUnmount(){
    this.props.dispatch(changeSortingPetsMethod(""));
  }

  componentDidUpdate(){
    document.title = this.props.firstName ? `${this.props.firstName}'s Pets` : 'All Pets';  
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
  firstName: state.auth.currentUser.firstName,
});

export default requiresLogin()(connect(mapStateToProps)(HomePage));