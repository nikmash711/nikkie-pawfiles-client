import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, Fieldset, SubmissionError, focus} from 'redux-form';
import Input from '../input';
import {submitPawfile, showPawfileForm, createNewPawfile} from '../../actions/index';
import {required, nonEmpty, unSelected} from '../validators';
import './pawfile-form.css';

export class PawfileForm extends React.Component{

  componentWillUnmount(){
    this.props.dispatch(showPawfileForm(false, undefined));
  }

  onSubmit(values){
    this.props.dispatch(submitPawfile(values, this.props.currentPetId));
    this.props.dispatch(showPawfileForm(false, undefined));
  }

  render(){
    return(
      <div className='form-modal'>
          <form className="form blurb" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>

            <button type="button" className = "close" onClick={()=>this.props.dispatch(showPawfileForm(false, undefined))}>X</button>

            <h2>{this.props.initialValues.name ? this.props.initialValues.name : "New Pawfile"}</h2>

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
              label="Image URL:" 
              type="url" 
              name="img" 
              id="img"
              validate={[required, nonEmpty]}
            />
            
            <Field
              component={Input} 
              label = "Species:"
              name="species" 
              id="species"
              type = "text"
              element="select"
              validate={[unSelected]}
              >
              <option value="" className="bold"> Select a Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
            </Field>

            <Field
              component={Input} 
              label = "Breed:"
              name="breed" 
              id="breed"
              type = "text"
            />

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
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </Field>

            <Field
              component={Input} 
              label = "Weight:"
              name="weight" 
              id="weight"
              type = "text"
            />

            <Field
              component={Input} 
              label = "Birthday:"
              name="birthday" 
              id="birthday"
              type = "date"
              // max= {new Date().toLocaleDateString()}
            />

            <Field
              component={Input} 
              element="textarea"
              label = "Bio:"
              name="bio" 
              id="bio"
              type = "textarea"
              className="test"
            />

            <div className="buttons">
              <button type="submit">Save Pawfile</button>
              <button onClick={()=>this.props.dispatch(showPawfileForm(false, undefined))} type="button">Cancel</button>
            </div>
            
          </form>
        </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state is', state);
  let currentPetId = state.pawfile.currentPetId;
  console.log('currentPetId is', currentPetId);
  let individualPawfile = state.pawfile.pawfiles.find(pawfile=>pawfile.id==currentPetId);
  console.log('individual pawfile is', individualPawfile);

  return {
    // to get the initial values if the user is editing the form: 
    currentPetId: state.pawfile.currentPetId,
    initialValues: {
      name: currentPetId ? individualPawfile.name : "",
      img: currentPetId ? individualPawfile.img : "",
      species: currentPetId ? individualPawfile.species : "",
      gender: currentPetId ?individualPawfile.gender : "",
      breed: currentPetId ? individualPawfile.breed : "",
      birthday: currentPetId ? individualPawfile.birthday : "",
      bio: currentPetId ? individualPawfile.bio : "",
    }
  }
}

export default connect(mapStateToProps)(reduxForm({
  form:'PawfileForm',
})(PawfileForm));