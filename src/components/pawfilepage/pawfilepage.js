import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import Sidebar from './sidebar';
import MainSection from './main-section';
import PawfileForm from '../pawfile-form';
import MedicalForm from './medical-form'
import MemoryForm from './memory-form'
import {Redirect} from 'react-router-dom'
import {showMedicalForm, showMemoryForm, changeSearchTerm, changeCategoryFilter, changeCurrentPetId} from '../../actions/index';
import { fetchPawfiles } from '../../actions/pawfile-crud';
import {changeSuccessMessage} from '../../actions/auth'
import requiresLogin from '../requires-login';


export class PawfilePage extends React.Component{
  componentDidMount(){
    console.log('mounting pawfilepage');
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
    console.log('in validId, return', this.props.pawfiles.find(pawfile=> pawfile.id==paramsId))
    return this.props.pawfiles.find(pawfile=> pawfile.id==paramsId)
  }

  render(){    
    console.log('pawfile page props are', this.props)
    if(this.props.pawfilesPending){
      console.log('PENDING pawfilepage!!!!!!');
      return(
        <div className="pawfile-page">
          <Navbar/>
          <Footer/>
        </div>
      )
    }

    if(this.props.error){
      console.log('in pawfile page the error is', this.props.error);
      return <Redirect to="/home" /> 
    }

    // if user is trying to access a pet that no longer exists or never did, or just deleted the pawfile from within the pawfile itself, then redirect them
    if(!this.validId(this.props.match.params.pawfileId)){
      return <Redirect to="/home" /> 
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

//still problematic bc unless homepage fetched the data, we have to refetch it on pawfile page. cant depend on homepage. made its own

//have default values 