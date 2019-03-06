import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, focus} from 'redux-form';
import Input from '../common/input';
import {showMedicalForm} from '../../actions/index';
import {submitPost} from '../../actions/post-crud';
import {required, nonEmpty} from '../common/validators';
import {stringToArrayList, arrayToString} from '../common/helper-functions';
import {todaysDate} from '../common/helper-functions';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import './medical-form.css'

export class MedicalForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = { address: this.props.initialValues.office, finalOffice: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => this.setState({finalOffice:results[0].formatted_address}))
      .catch(error => {
        //add error handling
      });
  };
  
  componentWillUnmount(){
    this.props.dispatch(showMedicalForm(false));
  }

  onSubmit(values){
    console.log('THE VALUES ARE', values);
    values.type="medical";
    values.office = this.state.finalOffice;
    values.vaccinations = stringToArrayList(values.vaccinations);
    values.prescriptions = stringToArrayList(values.prescriptions);
    values.symptoms = stringToArrayList(values.symptoms);
    console.log('THE VALUES ARE', values);
    return this.props.dispatch(submitPost(values, this.props.currentPetId, this.props.currentPostId));
  }

  render(){
    console.log('ADDRESS IS ', this.props.initialValues.office);
    let error;
    if (this.props.error) {
        error = (
            <div className="form-error" aria-live="polite">
                {this.props.error}
            </div>
        );
    }

    return(
      <div className='form-modal med'>
          <form className="form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>

          <h2 className="post-heading">{this.props.initialValues.title ? this.props.initialValues.title : "New Medical Post"}</h2>
          
          {error}

            <Field
              component={Input}
              className="required"
              label="Title:" 
              type="text" 
              name="title" 
              id="title"
              validate={[required, nonEmpty]}
            /> 

            <Field
              component={Input} 
              className="required"
              label = "Date:"
              name="date" 
              id="date"
              type = "date"
              max= {todaysDate()}
              validate={[required, nonEmpty]}
            />

            <div id="instructions">
                Please type the symptoms (if any) as a comma-seperated list.
            </div>

            <Field
              component={Input}
              label="Symptoms:" 
              element="textarea"
              maxLength = '180'
              name="symptoms" 
              id="symptoms"
              aria-describedby="instructions"
            /> 

            <div id="instructions">
                Please type the prescriptions (if any) as a comma-seperated list.
            </div>

            <Field
              component={Input}
              label="Prescriptions:" 
              element="textarea"
              maxLength = '180'
              name="prescriptions" 
              id="prescriptions"
              aria-describedby="instructions"
            /> 
            
            <div id="instructions">
                Please type the vaccinations (if any) as a comma-seperated list.
            </div>
            
            <Field
              component={Input}
              label="Vaccinations:" 
              element="textarea"
              maxLength = '180'
              name="vaccinations" 
              id="vaccinations"
              aria-describedby="instructions"
            /> 

            <Field
              component={Input}
              label="Notes:" 
              element="textarea"
              maxLength = '180'
              name="notes" 
              id="notes"
            /> 

            <Field
              component={Input} 
              label = "Doctor:"
              name="doctor" 
              id="doctor"
              type = "text"
            />

            <div className='office-input'>
                <label htmlFor="office" >Office:</label>
                <PlacesAutocomplete
                  value={this.state.address}
                  onChange={this.handleChange}
                  onSelect={this.handleSelect}
                  // defaultValue={this.props.initialValues.office}
                >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                      <React.Fragment>
                        <input
                          {...getInputProps({
                            placeholder: 'Search For Vet Address',
                            className: 'location-search-input',
                            name: 'office'
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {suggestions.map(suggestion => {
                            const className = 'suggestion-item';
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                  </React.Fragment>
                )}
              </PlacesAutocomplete>
            </div>

            <div className="buttons">
              <button  
                type="submit">
                Save
              </button>
              <button onClick={()=>this.props.dispatch(showMedicalForm(false, undefined))} type="button">Cancel</button>
            </div>

            <button type="button" className = "close" onClick={()=>this.props.dispatch(showMedicalForm(false, undefined))}>X</button>

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
      date: individualPost ? individualPost.date : todaysDate(),
      doctor: individualPost ? individualPost.doctor : "",
      office: individualPost ? individualPost.office : "",
      symptoms: individualPost ? arrayToString(individualPost.symptoms) : "",
      prescriptions:individualPost ? arrayToString(individualPost.prescriptions) : "",
      vaccinations:individualPost ? arrayToString(individualPost.vaccinations) : "",
      notes: individualPost ? individualPost.notes : "",
    }
  }
}

export default connect(mapStateToProps)(reduxForm({
  form:'MedicalForm',
  onSubmitFail: (error, dispatch) => {
    dispatch(focus('MedicalForm', Object.keys(error)[0]));
  },
  onSubmitSuccess: (result, dispatch) => {
    dispatch(showMedicalForm(false, undefined));
  }
})(MedicalForm));