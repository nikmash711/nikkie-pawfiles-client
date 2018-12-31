import React from 'react';
import {connect} from 'react-redux';
import PawfileBlurb from './pawfile-blurb';
import {sortByOldest, sortByYoungest, sortAtoZ, sortZtoA} from '../helper-functions';
import './pawfiles-list.css';

export class PawfilesList extends React.Component{
  render(){
    const pawfiles_list = this.props.pawfiles.map((pawfile,index)=>(
      <PawfileBlurb {...pawfile} key={index}/>
      //Question: Is it okay that I'm passing state here from parent to child? Wasn't sure how else to do it 
    ));

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
  sortMethod: state.pawfile.sortingPetsMethod
});

export default connect(mapStateToProps)(PawfilesList);