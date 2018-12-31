import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import MyPawfiles from './my-pawfiles';
import {fetchPawfiles} from '../../actions/index';


export class HomePage extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchPawfiles());
    document.title = this.props.user ? `${this.props.user}'s Pets` : 'All Pets';
  }

  componentDidUpdate(){
    document.title = this.props.user ? `${this.props.user}'s Pets` : 'All Pets';
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