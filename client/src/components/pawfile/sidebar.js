import React from 'react';
import {connect} from 'react-redux';
import PawfileBlurb from '../home/pawfile-blurb';
import ReminderBlurb from './reminder-blurb';

import './sidebar.css'

export function Sidebar(props){
  console.log(props);
  return(
      <aside className="sidebar left"> 
        <PawfileBlurb {...props.pawfile}/>
        <ReminderBlurb {...props.pawfile.reminders} />
      </aside>      
    );
}

const mapStateToProps = (state, props) => ({
  pawfile: state.pawfile.pawfiles[props.id],
});

export default connect(mapStateToProps)(Sidebar);