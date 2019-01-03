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


export class PawfilePage extends React.Component{
  componentDidMount(){
    console.log('mounting pawfilepage');
    this.props.dispatch(changeCurrentPetId(this.props.match.params.pawfileId));
    this.props.dispatch(fetchPawfiles())
  }

  componentWillUnmount(){
    //set everything back to default when this component ummounts
    this.props.dispatch(changeCurrentPetId(undefined));
    this.props.dispatch(showMedicalForm(false));
    this.props.dispatch(showMemoryForm(false));
    this.props.dispatch(changeSearchTerm(""));
    this.props.dispatch(changeCategoryFilter(""));
  }

  validId(paramsId){
    return this.props.pawfiles.find(pawfile=> pawfile.id==paramsId)
  }

  render(){
    console.log('props in pawfilepage are', this.props)
    
    if(this.props.pawfilesPending){
      console.log('pending pawfilepage');
      return <p>Pending</p>
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
    pawfiles: state.pawfile.pawfiles,
    showPawfileForm: state.pawfile.showPawfileForm,
    showMedicalForm: state.pawfile.showMedicalForm,
    showMemoryForm: state.pawfile.showMemoryForm,
    pawfilesPending: state.pawfile.pawfilesPending,
    error: state.pawfile.error,
    }
  }

export default connect(mapStateToProps)(PawfilePage);

//still problematic bc unless homepage fetched the data, we have to refetch it on pawfile page. cant depend on homepage. made its own

//have default values 