import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import MyPawfiles from './my-pawfiles';
import {changeSortingPetsMethod} from '../../actions/index';
import {fetchPawfiles, changeError, } from '../../actions/pawfile-crud';
import {changeSuccessMessage} from '../../actions/auth'
import requiresLogin from '../requires-login';

export class HomePage extends React.Component{
  componentDidMount(){
    console.log('homepage mounting with props', this.props);
    document.title = this.props.firstName ? `${this.props.firstName}'s Pets` : 'All Pets';
    this.props.dispatch(fetchPawfiles());
    this.props.dispatch(changeError(false));
    this.props.dispatch(changeSuccessMessage(null));

  }

  componentWillUnmount(){
    console.log('homepage UNmounting');
    this.props.dispatch(changeSortingPetsMethod(""));
  }

  componentDidUpdate(){
    document.title = this.props.firstName ? `${this.props.firstName}'s Pets` : 'All Pets';  
  }

  render(){
  
    if(this.props.pawfilesPending){
      console.log('pending');
      return(
        <div className="home">
          <Navbar/>
          <Footer/>
      </div>
      )
    }

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
  pawfilesPending: state.pawfile.pawfilesPending
});

export default requiresLogin()(connect(mapStateToProps)(HomePage));