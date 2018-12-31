import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import MyPawfiles from './my-pawfiles';
import {fetchPawfiles, changePawfilesPending} from '../../actions/index';

export class HomePage extends React.Component{
  componentDidMount(){
    console.log('homepage mounting');
    document.title = this.props.user ? `${this.props.user}'s Pets` : 'All Pets';
    this.props.dispatch(fetchPawfiles());
  }

  componentWillUnmount(){
    console.log('homepage unmounting');
    this.props.dispatch(changePawfilesPending(true));
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