import React from 'react';
import {connect} from 'react-redux';
import PawfileBlurb from './pawfile-blurb';
import './pawfiles-list.css';

export class PawfilesList extends React.Component{
  sortByOldest(pawfiles_list){
    pawfiles_list.sort((a,b)=> new Date(a.props.birthday) - new Date(b.props.birthday))
  }

  sortByYoungest(pawfiles_list){
    pawfiles_list.sort((a,b)=> new Date(b.props.birthday) - new Date(a.props.birthday))
  }

  sortAtoZ(pawfiles_list){
    pawfiles_list.sort((a,b)=> a.props.name < b.props.name ? -1 : a.props.name < b.props.name ? 1 : 0)
  }

  sortZtoA(pawfiles_list){
    pawfiles_list.sort((a,b)=> a.props.name > b.props.name ? -1 : a.props.name > b.props.name ? 1 : 0)
  }

  render(){

    const pawfiles_list = this.props.pawfiles.map((pawfile,index)=>(
      <PawfileBlurb {...pawfile} key={index}/>
      //forgot how to do this - should I pass state? Key? 
    ));

    console.log('pawfiles list is', pawfiles_list);

    //see how to sort the pets
    switch(this.props.sortMethod){
      case "oldest":
        this.sortByOldest(pawfiles_list)
        break;
      case "youngest":
        this.sortByYoungest(pawfiles_list)
        break;
      case "A-Z":
        this.sortAtoZ(pawfiles_list)
        break;
      case "Z-A":
        this.sortZtoA(pawfiles_list)
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