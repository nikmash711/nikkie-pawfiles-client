import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, focus} from 'redux-form';
import Input from './input';
import {showPawfileForm} from '../actions/index';
import {submitPawfile} from '../actions/pawfile-crud';
import {required, nonEmpty, unSelected, sizeLimit, imageNotEmpty} from './validators';
import {todaysDate, formatName} from './helper-functions';

export class PawfileForm extends React.Component{
  constructor(props){
    super(props);

    this.first = React.createRef();
  }

  componentWillUnmount(){
    this.props.dispatch(showPawfileForm(false, undefined));
  }

  onSubmit(values){
    values.name = formatName(values.name);
    //only submit the image info if this is a new pafile
    if(!this.props.currentPawfileFormId){
      values.img = values.img[0];
    }
    console.log('values being sent', values);
    return this.props.dispatch(submitPawfile(values, this.props.currentPawfileFormId));
    //this is what tells redux form that the submit succeeded or failed
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
      <div className='form-modal'>
          <form className="form blurb" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>

            <h2>{this.props.initialValues.name ? this.props.initialValues.name : "New Pawfile"}</h2>

            {error}

            <Field
              component={Input}
              autoFocus
              className="required"
              label="Name:" 
              type="text" 
              name="name" 
              id="name"
              ref = {(input)=>this.first=input}
              maxLength = '12'
              validate={[required, nonEmpty]}
              /> 

            {/* if they're editing, the option to change image shouldn't be allowed on this form. will let them change profile photo separetely*/}   
            {!this.props.currentPawfileFormId && <Field
              component={Input}
              className="required"
              label="Image:" 
              name="img" 
              id="img"
              type= "file"
              validate={[required, sizeLimit, imageNotEmpty]}
            />}
            
            <Field
              component={Input} 
              className="required"
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
              <option value="Bunny">Bunny</option>
            </Field>

            <Field
              component={Input} 
              className="required"
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
              maxLength = '25'
              label = "Breed:"
              name="breed" 
              id="breed"
              type = "text"
            />

            <Field
              component={Input} 
              maxLength = '12'
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
              max= {todaysDate()}
            />

            <Field
              component={Input} 
              element="textarea"
              label = "Bio:"
              name="bio" 
              id="bio"
              maxLength = '180'
              className="test"
            />

            <div className="buttons">
              <button type="submit" disabled={this.props.pristine || this.props.submitting}>Save Pawfile</button>
              <button onClick={()=>this.props.dispatch(showPawfileForm(false, undefined))} type="button">Cancel</button>
            </div>

            <button aria-label="close pawfile blurb" type="button" className = "close" onClick={()=>this.props.dispatch(showPawfileForm(false, undefined))}>X</button>
            
          </form>
        </div>
    );
  }
}

function mapStateToProps(state) {
  let currentPawfileFormId = state.pawfile.currentPawfileFormId;
  let individualPawfile = state.pawfile.pawfiles.find(pawfile=>pawfile.id==currentPawfileFormId);

  return {
    // to get the initial values if the user is editing the form: 
    currentPawfileFormId: state.pawfile.currentPawfileFormId,
    individualPawfile: state.pawfile.pawfiles.find(pawfile=>pawfile.id==currentPawfileFormId),
    initialValues: {
      name: currentPawfileFormId ? individualPawfile.name : "",
      img: currentPawfileFormId ? individualPawfile.img : "",
      species: currentPawfileFormId ? individualPawfile.species : "",
      gender: currentPawfileFormId ?individualPawfile.gender : "",
      breed: currentPawfileFormId ? individualPawfile.breed : "",
      weight: currentPawfileFormId ? individualPawfile.weight : "",
      birthday: currentPawfileFormId ? individualPawfile.birthday : "",
      bio: currentPawfileFormId ? individualPawfile.bio : "",
    }
  }
}

export default connect(mapStateToProps)(reduxForm({
  form:'PawfileForm',
  onSubmitFail: (error, dispatch) => {
    dispatch(focus('PawfileForm', Object.keys(error)[0]));
  },
  onSubmitSuccess: (result, dispatch) => {
    dispatch(showPawfileForm(false, undefined));
  }
})(PawfileForm));