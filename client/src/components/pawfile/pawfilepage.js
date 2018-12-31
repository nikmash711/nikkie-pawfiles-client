import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import Sidebar from './sidebar';
import MainSection from './main-section';
import PawfileForm from '../home/pawfile-form';
import MedicalForm from './medical-form'
import MemoryForm from './memory-form'
import {Redirect} from 'react-router-dom';
import {showMedicalForm, showMemoryForm, changeSearchTerm, changeCategoryFilter, changeCurrentPetId} from '../../actions/index';


export class PawfilePage extends React.Component{
  componentDidMount(){
    this.props.dispatch(changeCurrentPetId(this.props.match.params.pawfileId));
    //where do I put the above line of code for it to properly change the currentId before trying to render sidebar or main section? As of now Sidebar and MainSection don't get the id from currentPetId in the state, but instead are passed an id from this parent element. 
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
    console.log('paramsId in the fn is', paramsId, 'length of pawfiles', this.props.pawfiles.length);
    //  this.props.pawfiles.map(pawfile=> console.log(pawfile.id == paramsId))
    return this.props.pawfiles.find(pawfile=> pawfile.id==paramsId)
  }

  render(){
    console.log('paramId in render is', this.props.match.params.pawfileId)
    console.log('the return value of fn validId is', this.validId(this.props.match.params.pawfileId))

    if(this.props.pawfilePending){
      return <p>Loading</p>
    }

    //if user is trying to access a pet that no longer exists or never did: 
    if(!this.validId(this.props.match.params.pawfileId)){
      console.log('invalid id', this.props.match.params.pawfileId);
      return <p>REDIRECT </p>
      return <Redirect to="/home" /> 
    } 

    console.log('in pawfile page props are', this.props);
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

const mapStateToProps = state => ({
  pawfiles: state.pawfile.pawfiles,
  // specificPawfile: state.pawfile.pawfiles.find(pawfile=> pawfile.id== this.props.match.params.pawfileId),
  showPawfileForm: state.pawfile.showPawfileForm,
  showMedicalForm: state.pawfile.showMedicalForm,
  showMemoryForm: state.pawfile.showMemoryForm,
  pawfilePending: state.pawfile.pawfilesPending,
});

export default connect(mapStateToProps)(PawfilePage);