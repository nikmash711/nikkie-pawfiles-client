import React from 'react';
import {connect} from 'react-redux';
import PawfileBlurb from '../home/pawfile-blurb';
import ReminderBlurb from './reminder-blurb';

import './sidebar.css'

export function Sidebar(props){
  console.log('rendering sidebar')
  // console.log('the currentId is', props.currentPetId);
  return(
      <aside className="sidebar left"> 
        <PawfileBlurb {...props.specificPawfile}/>
        <ReminderBlurb {...props.specificPawfile} />
      </aside>      
    );
}

const mapStateToProps = (state, props) => ({
  // currentPetId: state.pawfile.currentPetId,
  // pawfile: state.pawfile.pawfiles[state.pawfile.currentPetId],

  //I HAVE to include line 24 or else it doesn't realize the state has been updated (like when I add a reminder)...There's probably a better way to do this
  pawfiles: state.pawfile.pawfiles,
  specificPawfile: state.pawfile.pawfiles[props.id]
});

export default connect(mapStateToProps)(Sidebar);