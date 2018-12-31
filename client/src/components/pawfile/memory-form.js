import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, Fieldset, SubmissionError, focus} from 'redux-form';
import Input from '../input';
import {submitMemoryForm, showMemoryForm} from '../../actions/index';
import {required, nonEmpty} from '../validators';
import {stringToArrayList, formatDate} from '../helper-functions';
import '.././home/pawfile-form.css';
import './memory-form.css';

export class MemoryForm extends React.Component{
  componentWillUnmount(){
    this.props.dispatch(showMemoryForm(false));
  }

  onSubmit(values){
    values.type="memory";
    values.date = formatDate(values.date).toDateString();
    this.props.dispatch(submitMemoryForm(values, this.props.currentPetId));
    this.props.dispatch(showMemoryForm(false));
  }

  render(){
    return(
      <div className='form-modal mem'>
          <form className="form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <button type="button" className = "close" onClick={()=>this.props.dispatch(showMemoryForm(false))}>X</button>

            <Field
              component={Input}
              label="Title:" 
              type="text" 
              name="title" 
              id="title"
              validate={[required, nonEmpty]}
            /> 

            <Field
              component={Input} 
              label = "Date:"
              name="date" 
              id="date"
              type = "date"
              validate={[required, nonEmpty]}
            />

            <Field
              component={Input}
              label="Description:" 
              type="textarea" 
              name="description" 
              id="description"
              validate={[required, nonEmpty]}
            /> 

            <Field
              component={Input}
              label="Image URL:" 
              type="url" 
              name="memory_img" 
              id="memory_img"
              >
            </Field>
            
            <div className="buttons">
              <button type="submit">Save</button>
              <button onClick={()=>this.props.dispatch(showMemoryForm(false))} type="cancel">Cancel</button>
            </div>
          </form>
        </div>
    );
  }
}

function mapStateToProps(state) {
  let currentPetId = state.pawfile.currentPetId;
  return {
    // to get the initial values if the user is editing the form: 
    currentPetId: state.pawfile.currentPetId,
    // initialValues: {
    //   name: currentPetId>=0 ? state.pawfile.pawfiles[currentPetId].name : "",
    // }
  }
}

export default connect(mapStateToProps)(reduxForm({
  form:'MemoryForm',
})(MemoryForm));