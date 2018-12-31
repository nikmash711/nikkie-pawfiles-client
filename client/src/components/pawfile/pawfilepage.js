import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import Sidebar from './sidebar';
import MainSection from './main-section';
import PawfileForm from '../home/pawfile-form';
import MedicalForm from './medical-form'
import MemoryForm from './memory-form'
import {Redirect} from 'react-router-dom'
import {showMedicalForm, showMemoryForm, changeSearchTerm, changeCategoryFilter, changeCurrentPetId, fetchIndividualPawfile, changeIndividualPawfilePending} from '../../actions/index';


export class PawfilePage extends React.Component{
  componentDidMount(){
    console.log('mounting pawfilepage');
    this.props.dispatch(changeCurrentPetId(this.props.match.params.pawfileId));
    this.props.dispatch(fetchIndividualPawfile(this.props.match.params.pawfileId))
  }

  componentWillUnmount(){
    //set everything back to default when this component ummounts
    this.props.dispatch(changeCurrentPetId(undefined));
    this.props.dispatch(showMedicalForm(false));
    this.props.dispatch(showMemoryForm(false));
    this.props.dispatch(changeSearchTerm(""));
    this.props.dispatch(changeCategoryFilter(""));
    this.props.dispatch(changeIndividualPawfilePending(true));
  }

  //I no longer need to check validId this way.
  validId(paramsId){
    console.log('paramsId in the fn is', paramsId, 'length of pawfiles', this.props.pawfiles.length);
    //  this.props.pawfiles.map(pawfile=> console.log(pawfile.id == paramsId))
    return this.props.pawfiles.find(pawfile=> pawfile.id==paramsId)
  }

  render(){
    console.log('props in pawfilepage are', this.props)
    console.log('paramId in render is', this.props.match.params.pawfileId)
    // console.log('the return value of fn validId is', this.validId(this.props.match.params.pawfileId))

    //if user is trying to access a pet that no longer exists or never did: 
    // if(!this.validId(this.props.match.params.pawfileId)){
      console.log('invalid id', this.props.match.params.pawfileId);
      // return <Redirect to="/home" /> 
    // }
    
    if(this.props.pawfilesPending){
      console.log('pending pawfilepage');
      return <p>Pending</p>
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

const mapStateToProps = state => ({
  showPawfileForm: state.pawfile.showPawfileForm,
  showMedicalForm: state.pawfile.showMedicalForm,
  showMemoryForm: state.pawfile.showMemoryForm,
  pawfilesPending: state.pawfile.pawfilesPending,
});

export default connect(mapStateToProps)(PawfilePage);

//still problematic bc unless homepage fetched the data, we have to refetch it on pawfile page. cant depend on homepage 