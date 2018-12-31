import React from 'react';
import {connect} from 'react-redux';
import {showPawfileForm} from '../../actions/index';
import './add-new-pawfile-button.css'

export function AddNewPawfileButton(props){
  return(
    <button onClick={()=>props.dispatch(showPawfileForm(true, undefined))} className="tape">Add New Pawfile</button>
  );
}

export default connect()(AddNewPawfileButton);