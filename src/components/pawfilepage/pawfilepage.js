import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../common/navbar';
import Footer from '../common/footer'
import Sidebar from './sidebar';
import MainSection from './main-section';
import PawfileForm from '../common/pawfile-form';
import MedicalForm from './medical-form'
import MemoryForm from './memory-form'
import {showMedicalForm, showMemoryForm, changeSearchTerm, changeCategoryFilter, changeCurrentPetId} from '../../actions/index';
import { fetchPawfiles } from '../../actions/pawfile-crud';
import {changeSuccessMessage} from '../../actions/auth'
import requiresLogin from '../common/requires-login';


export class PawfilePage extends React.Component{
  componentDidMount(){
    window.scrollTo(0, 0); //make it jump to top
    this.props.dispatch(changeCurrentPetId(this.props.match.params.pawfileId));
    this.props.dispatch(fetchPawfiles());
    this.props.dispatch(changeSuccessMessage(null));
  }

  componentWillUnmount(){
    //set everything back to default when this component ummounts
    this.props.dispatch(showMedicalForm(false));
    this.props.dispatch(showMemoryForm(false));
    this.props.dispatch(changeSearchTerm(""));
    this.props.dispatch(changeCategoryFilter(""));
  }

  validId(paramsId){
    return this.props.pawfiles.find(pawfile=> pawfile.id===paramsId)
  }

  render(){    
    // if user is trying to access a pet that no longer exists or never did, or just deleted the pawfile from within the pawfile itself, then redirect them
    if(!this.validId(this.props.match.params.pawfileId)){
      return(
        <div className="pawfile-page">
          <Navbar/>
          <Sidebar/>
          <MainSection/>
          <Footer/>
        </div>
      );
    }

    return(
      <div className="pawfile-page">
        <Navbar/>
        <Sidebar id={this.props.match.params.pawfileId}/>
        <MainSection id={this.props.match.params.pawfileId}/>
        {this.props.showPawfileForm && <PawfileForm/>} 
        {this.props.showMedicalForm && <MedicalForm/>} 
        {this.props.showMemoryForm && <MemoryForm/>}
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pawfilesPending: state.pawfile.pawfilesPending,
    pawfiles: state.pawfile.pawfiles,
    showPawfileForm: state.pawfile.showPawfileForm,
    showMedicalForm: state.pawfile.showMedicalForm,
    showMemoryForm: state.pawfile.showMemoryForm,
    error: state.pawfile.error,
    }
  }

export default requiresLogin()(connect(mapStateToProps)(PawfilePage));