import React from 'react';
import {connect} from 'react-redux';
import PawfileBlurb from '../home/pawfile-blurb';
import ReminderBlurb from './reminder-blurb';

import './sidebar.css'

export function Sidebar(props){
  console.log('rendering sidebar with props', props)
  return(
      <aside className="sidebar left"> 
        <PawfileBlurb {...props.specificPawfile}/>
        <ReminderBlurb {...props.specificPawfile} />
      </aside>      
    );
}

const mapStateToProps = (state, props) => ({
  //find the pawfile with an id equal to the one passed down in props
  specificPawfile: state.pawfile.pawfiles.find(pawfile=> pawfile.id==props.id)
});

export default connect(mapStateToProps)(Sidebar);