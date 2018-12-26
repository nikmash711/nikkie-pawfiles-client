import React from 'react';
import {connect} from 'react-redux';
import {addingNewForm} from '../../actions/index';


import './add-new-pawfile-button.css'

export function AddNewPawfileButton(props){
  return(
    <button onClick={()=>props.dispatch(addingNewForm(true))} className="tape">Add New Pawfile</button>
  );
}

export default connect()(AddNewPawfileButton);