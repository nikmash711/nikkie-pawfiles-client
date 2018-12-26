import React from 'react';
import {connect} from 'react-redux';
import PawfileBlurb from './pawfile-blurb';
import './pawfiles-list.css';

export function PawfilesList(props){

  const pawfiles_list = props.pawfiles.map((pawfile,index)=>(
    <PawfileBlurb {...pawfile} key={index}/>
    //forgot how to do this - should I pass state? Key? 
  ));

  //sort the pawfile blurbs pased on how old they are - oldest on top 
  pawfiles_list.sort((a,b)=> new Date(a.props.birthday) - new Date(b.props.birthday))
  
  return(
    <section className="section">
      {pawfiles_list}
    </section>
  );
}

const mapStateToProps = state => ({
  pawfiles: state.pawfile.pawfiles,
});

export default connect(mapStateToProps)(PawfilesList);