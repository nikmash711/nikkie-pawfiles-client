import React from 'react';
import {connect} from 'react-redux';
import PawfileBlurb from './pawfile-blurb';
import {sortByOldest, sortByYoungest, sortAtoZ, sortZtoA} from '../helper-functions';

import './pawfiles-list.css';

export class PawfilesList extends React.Component{

  render(){

    const pawfiles_list = this.props.pawfiles.map((pawfile,index)=>(
      <PawfileBlurb {...pawfile} key={index}/>
      //forgot how to do this - should I pass state? Key? 
    ));

    //how to sort the pets - better way to do this?
    switch(this.props.sortMethod){
      case "oldest":
        sortByOldest(pawfiles_list)
        break;
      case "youngest":
        sortByYoungest(pawfiles_list)
        break;
      case "A-Z":
        sortAtoZ(pawfiles_list)
        break;
      case "Z-A":
        sortZtoA(pawfiles_list)
        break;
      default: 
        console.log('in switch case default');
        break;
    }
  
    return(
      <section className="section">
        {pawfiles_list}
      </section>
    );
  }
}
 
const mapStateToProps = state => ({
  pawfiles: state.pawfile.pawfiles,
  sortMethod: state.pawfile.sortingPetsMethod
});

export default connect(mapStateToProps)(PawfilesList);