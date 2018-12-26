import React from 'react';
import {connect} from 'react-redux';import {reduxForm, Field, Fieldset, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {addingNewPawfile, addingNewForm} from '../../actions/index';
import {required, nonEmpty, unSelected} from './validators';

import './add-new-pawfile-form.css';

export  class AddNewPawfileForm extends React.Component{

  componentWillUnmount(){
    this.props.dispatch(addingNewForm(false));
  }

  onSubmit(values){
    this.props.dispatch(addingNewPawfile(values));
    this.props.dispatch(addingNewForm(false));
  }

  render(){
    return(
      <div className='new-pawfile-form-modal'>
          <form className="new-pawfile-form blurb" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <button type="button" className = "close" onClick={()=>this.props.dispatch(addingNewForm(false))}>X</button>
          <h2>New Pawfile</h2>

            <Field
              component={Input}
              label="Name:" 
              type="text" 
              name="name" 
              id="name"
              validate={[required, nonEmpty]}
              /> 
            
            <Field
              component={Input} 
              label = "Species:"
              name="species" 
              id="species"
              type = "text"
              validate={[required, nonEmpty]}
              >
            </Field>
            
            <Field
              component={Input} 
              label = "Breed:"
              name="breed" 
              id="breed"
              type = "text"
              >
            </Field>

            <Field
              component={Input} 
              label = "Gender:"
              name="gender" 
              id="gender"
              element="select"
              type = "text"
              validate={[unSelected]}
              >
              <option value=""> Select a Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Field>

            <Field
              component={Input} 
              label = "Birthday:"
              name="birthday" 
              id="birthday"
              type = "text"
              >
            </Field>

            <Field
              component={Input} 
              element="textarea"
              label = "Bio:"
              name="bio" 
              id="bio"
              type = "textarea"
              className="test"
              >
            </Field>

            <Field
              component={Input} 
              label = "Image URL:"
              name="img" 
              id="img"
              type = "text"
              >
            </Field>

            <button type="submit">Save Pawfile</button>
            <button onClick={()=>this.props.dispatch(addingNewForm(false))} type="cancel">Cancel</button>
          </form>
        </div>
    );
  }
}

export default reduxForm({
  form: 'addingPawfileForm',
})(AddNewPawfileForm);

// ADD IN VALIDATIONS TODAY 