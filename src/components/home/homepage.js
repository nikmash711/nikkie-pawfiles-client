import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import MyPawfiles from './my-pawfiles';
import {changeSortingPetsMethod} from '../../actions/index';
import {fetchPawfiles, changeError, } from '../../actions/pawfile-crud';
import requiresLogin from '../requires-login';


export class HomePage extends React.Component{
  componentDidMount(){
    console.log('homepage mounting');
    document.title = this.props.user ? `${this.props.user}'s Pets` : 'All Pets';
    this.props.dispatch(fetchPawfiles());
    this.props.dispatch(changeError(false));
  }

  componentWillUnmount(){
    console.log('homepage UNmounting');
    this.props.dispatch(changeSortingPetsMethod(""));
  }

  componentDidUpdate(){
    document.title = this.props.user ? `${this.props.user}'s Pets` : 'All Pets';
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
  user: state.pawfile.user.firstName,
  username: state.auth.currentUser.username,
  pawfilesPending: state.pawfile.pawfilesPending
});

export default requiresLogin()(connect(mapStateToProps)(HomePage));