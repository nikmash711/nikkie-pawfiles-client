import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import MyPawfiles from './my-pawfiles';

export class HomePage extends React.Component{
  componentDidMount(){
    document.title = `${this.props.user}'s Pets`;
  }

  render(){
    console.log('home page props are', this.props);
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
  sortingPetsMethod: state.pawfile.sortingPetsMethod,
  pawfiles: state.pawfile.pawfiles,
  form: state.form.addingPawfileForm,
});

export default connect(mapStateToProps)(HomePage);