import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, Fieldset, SubmissionError, focus} from 'redux-form';
import Input from '../input';
import {submitMedicalForm, showMedicalForm} from '../../actions/index';
import {required, nonEmpty, unSelected} from '../validators';
import {stringToArrayList, formatDate} from '../helper-functions';
import '.././home/pawfile-form.css';
import './medical-form.css'

export class MedicalForm extends React.Component{
  componentWillUnmount(){
    this.props.dispatch(showMedicalForm(false));
  }

  onSubmit(values){
    values.type="medical";
    values.date = formatDate(values.date).toDateString();
    if(values.vaccinations){
      values.vaccinations = stringToArrayList(values.vaccinations);
    }
    if(values.prescriptions){
      values.prescriptions = stringToArrayList(values.prescriptions);
    }
    if(values.symptoms){
      values.symptoms = stringToArrayList(values.symptoms);
    }

    this.props.dispatch(submitMedicalForm(values, this.props.currentPetId));
    this.props.dispatch(showMedicalForm(false));
  }

  render(){
    return(
      <div className='form-modal med'>
          <form className="form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <button type="button" className = "close" onClick={()=>this.props.dispatch(showMedicalForm(false))}>X</button>
          
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
              label = "Doctor:"
              name="doctor" 
              id="doctor"
              type = "text"
            />

            <Field
              component={Input} 
              label = "Doctor's Office:"
              name="office" 
              id="office"
              type = "url"
            />

            <Field
              component={Input}
              label="Symptoms:" 
              element="textarea"
              name="symptoms" 
              id="symptoms"
              aria-describedby="instructions"
            /> 
            <div id="instructions">
                Please type the symptoms (if any) as a comma-seperated list.
            </div>

            <Field
              component={Input}
              label="Prescriptions:" 
              element="textarea"
              name="prescriptions" 
              id="prescriptions"
              aria-describedby="instructions"
            /> 
            <div id="instructions">
                Please type the prescriptions (if any) as a comma-seperated list.
            </div>

            <Field
              component={Input}
              label="Vaccinations:" 
              element="textarea"
              name="vaccinations" 
              id="vaccinations"
              aria-describedby="instructions"
            /> 
            <div id="instructions">
                Please type the vaccinations (if any) as a comma-seperated list.
            </div>

            <Field
              component={Input}
              label="Notes:" 
              element="textarea"
              name="notes" 
              id="notes"
            /> 
            
            <div className="buttons">
              <button type="submit">Save</button>
              <button onClick={()=>this.props.dispatch(showMedicalForm(false))} type="cancel">Cancel</button>
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
  form:'MedicalForm',
})(MedicalForm));