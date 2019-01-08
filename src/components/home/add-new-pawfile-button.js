import React from 'react';
import {connect} from 'react-redux';
import {showPawfileForm, changeCurrentPetId} from '../../actions/index';

export class AddNewPawfileButton extends React.Component{
  handleClick(){
    //since im not updated currentPetId, need to set it to undefined here
    // this.props.dispatch(changeCurrentPetId(undefined));
    this.props.dispatch(showPawfileForm(true, undefined));
  }
  render(){
    return(
      <button onClick={()=>this.handleClick()} className="tape">Add New Pawfile</button>
    );
  }
}

export default connect()(AddNewPawfileButton);