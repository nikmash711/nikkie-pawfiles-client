import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import MyPawfiles from './my-pawfiles';
import {changeSortingPetsMethod} from '../../actions/index';
import {fetchPawfiles, changePawfilesPending, changeError, } from '../../actions/pawfile-crud';

export class HomePage extends React.Component{
  componentDidMount(){
    console.log('homepage mounting');
    document.title = this.props.user ? `${this.props.user}'s Pets` : 'All Pets';
    this.props.dispatch(fetchPawfiles());
    this.props.dispatch(changeError(false));
  }

  componentWillUnmount(){
    console.log('homepage unmounting');
    this.props.dispatch(changePawfilesPending(true));
    this.props.dispatch(changeSortingPetsMethod(""));
  }

  componentDidUpdate(){
    document.title = this.props.user ? `${this.props.user}'s Pets` : 'All Pets';
  }

  render(){
    if(this.props.pawfilesPending){
      console.log('pending');
      return <p>Loading</p>
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
  pawfilesPending: state.pawfile.pawfilesPending
});

export default connect(mapStateToProps)(HomePage);