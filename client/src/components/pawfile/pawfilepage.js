import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../navbar';
import Footer from '../footer'
import Sidebar from './sidebar';
import MainSection from './main-section';
import {Link, Redirect} from 'react-router-dom';

export class PawfilePage extends React.Component{
  componentDidMount(){
    document.title = `${this.props.match.params.pawfileName}`;
  }

  validId(paramsId, paramsName){
    return this.props.pawfiles.find(pawfile=> {
      // console.log('the typed id is', typedId, 'and the id in props is,', pawfile.id);
      return pawfile.id==paramsId && pawfile.name==paramsName;
    })
  }

  render(){
    //if user is trying to access a pet that no longer exists or never did: 
    if(!this.validId(this.props.match.params.pawfileId, this.props.match.params.pawfileName)){
      return <Redirect to="/home" /> 
    } 

    console.log('in pawfile page props are', this.props);
    return(
      <div className="pawfile-page">
        <Navbar/>
        <Sidebar id={this.props.match.params.pawfileId}/>
        <MainSection id={this.props.match.params.pawfileId}/>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pawfiles: state.pawfile.pawfiles,
});

export default connect(mapStateToProps)(PawfilePage);

// export default connect ()(PawfilePage);