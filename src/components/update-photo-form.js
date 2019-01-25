import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, focus} from 'redux-form';
import Input from './input';
import {showUpdatePhotoForm} from '../actions/index';
import {submitPawfile} from '../actions/pawfile-crud';
import {required, sizeLimit, imageNotEmpty} from './validators';
import './update-photo-form.css'
// HAVE BETTER PHOTO VALIDATION: implement size in validators, implement the accept attribute even in redux form. fix the action in pawfile-crud
export class UpdatePhotoForm extends React.Component{

  componentWillUnmount(){
    this.props.dispatch(showUpdatePhotoForm(false, undefined));
  }

  onSubmit(values){
    values.img = values.img[0];
    //dispatch an action (need to create it) to update image
    // if(values.img){
      console.log('VALURS', values);
      console.log('here');
      return this.props.dispatch(submitPawfile(values, this.props.currentPawfileFormId));
    // }
  }

  render(){
    let error;
    if (this.props.error) {
        error = (
            <div className="form-error" aria-live="polite">
                {this.props.error}
            </div>
        );
    }
    
    return(
      <div className='form-modal upload-photo-form'>
          <form className="form blurb" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>

            {error}
            <h2> {this.props.individualPawfile.name}</h2>
  
           <Field
              component={Input}
              name="img" 
              id="imgUpdate"
              type= "file"
              validate={[required, sizeLimit, imageNotEmpty]}
            />

            <div className="buttons">
              <button type="submit" disabled={this.props.pristine || this.props.submitting}>Update Photo</button>
              <button onClick={()=>this.props.dispatch(showUpdatePhotoForm(false, undefined))} type="button">Cancel</button>
            </div>

            <button aria-label="close pawfile blurb" type="button" className = "close" onClick={()=>this.props.dispatch(showUpdatePhotoForm(false, undefined))}>X</button>
            
          </form>
        </div>
    );
  }
}

function mapStateToProps(state) {
  let currentPawfileFormId = state.pawfile.currentPawfileFormId;
  // let individualPawfile = state.pawfile.pawfiles.find(pawfile=>pawfile.id==currentPawfileFormId);
  return {
    currentPawfileFormId: state.pawfile.currentPawfileFormId,
    individualPawfile: state.pawfile.pawfiles.find(pawfile=>pawfile.id==currentPawfileFormId),
    }
}

export default connect(mapStateToProps)(reduxForm({
  form:'UpdatePhotoForm',
  onSubmitFail: (error, dispatch) => {
    dispatch(focus('UpdatePhotoForm', Object.keys(error)[0]));
  },
  onSubmitSuccess: (result, dispatch) => {
    dispatch(showUpdatePhotoForm(false, undefined));
  }
})(UpdatePhotoForm));