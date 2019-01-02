import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, Fieldset, SubmissionError, focus} from 'redux-form';
import Input from '../input';
import {showMedicalForm} from '../../actions/index';
import {submitPost} from '../../actions/post-crud';
import {required, nonEmpty} from '../validators';
import {stringToArrayList, arrayToString} from '../helper-functions';
import '../pawfile-form.css';
import './medical-form.css'

export class MedicalForm extends React.Component{
  componentWillUnmount(){
    this.props.dispatch(showMedicalForm(false));
  }

  onSubmit(values){
    values.type="medical";
    if(values.vaccinations){
      values.vaccinations = stringToArrayList(values.vaccinations);
    }
    if(values.prescriptions){
      values.prescriptions = stringToArrayList(values.prescriptions);
    }
    if(values.symptoms){
      values.symptoms = stringToArrayList(values.symptoms);
    }

    this.props.dispatch(submitPost(values, this.props.currentPetId, this.props.currentPostId));
    this.props.dispatch(showMedicalForm(false, undefined));
  }

  render(){
    return(
      <div className='form-modal med'>
          <form className="form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <button type="button" className = "close" onClick={()=>this.props.dispatch(showMedicalForm(false, undefined))}>X</button>
          
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
              <button onClick={()=>this.props.dispatch(showMedicalForm(false, undefined))} type="cancel">Cancel</button>
            </div>
          </form>
        </div>
    );
  }
}

function mapStateToProps(state) {
  //see if there's a postId (editing), or no id means new post. Is this efficient?
  let currentPostId = state.pawfile.currentPostId;
  let currentPetId = state.pawfile.currentPetId;
  let individualPawfile = state.pawfile.pawfiles.find(pawfile=>pawfile.id==currentPetId);
  let individualPost = individualPawfile.posts.find(post=>post.id==currentPostId);

  return {
    currentPostId: state.pawfile.currentPostId,
    currentPetId: state.pawfile.currentPetId,
    // to get the initial values if the user is editing the form: 
    initialValues: {
      title: individualPost ? individualPost.title : "",
      date: individualPost ? individualPost.date : "",
      doctor: individualPost ? individualPost.doctor : "",
      office: individualPost ? individualPost.office : "",
      symptoms:individualPost ? arrayToString(individualPost.symptoms) : "",
      prescriptions:individualPost ? arrayToString(individualPost.prescriptions) : "",
      vaccinations:individualPost ? arrayToString(individualPost.vaccinations) : "",
      notes: individualPost ? individualPost.notes : "",
    }
  }
}

export default connect(mapStateToProps)(reduxForm({
  form:'MedicalForm',
})(MedicalForm));