import React from 'react';
import {connect} from 'react-redux';
import PawfileBlurb from '../pawfile-blurb';
import {sortByOldest, sortByYoungest, sortAtoZ, sortZtoA, filterPetsBySearch} from '../helper-functions';
import './pawfiles-list.css';

export class PawfilesList extends React.Component{
  render(){

    let pawfiles_list = this.props.pawfiles.map((pawfile,index)=>(
      <PawfileBlurb {...pawfile} key={index}/>
      //Question: Is it okay that I'm passing state here from parent to child? Wasn't sure how else to do it 
    ));

    if(this.props.currentSearchTerm){
      pawfiles_list = filterPetsBySearch(this.props.currentSearchTerm, pawfiles_list);
    }

    //Sorting pets
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
  sortMethod: state.pawfile.sortingPetsMethod,
  currentSearchTerm: state.pawfile.currentSearchTerm,
});

export default connect(mapStateToProps)(PawfilesList);

//only show search bar if more than 2 pets like sort. make sure search term unmounts.