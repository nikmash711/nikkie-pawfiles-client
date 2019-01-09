import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, Fieldset, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {showPawfileForm} from '../actions/index';
import {submitPawfile} from '../actions/pawfile-crud';
import {required, nonEmpty, unSelected} from './validators';
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
    this.props.dispatch(submitPawfile(values, this.props.currentPawfileFormId));
    this.props.dispatch(showPawfileForm(false, undefined));
  }

  render(){
    return(
      <div className='form-modal'>
          <form className="form blurb" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>

            <h2>{this.props.initialValues.name ? this.props.initialValues.name : "New Pawfile"}</h2>

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

            <Field
              component={Input}
              className="required"
              label="Image URL:" 
              type="url" 
              name="img" 
              id="img"
              validate={[required, nonEmpty]}
            />
            
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
              <button type="submit">Save Pawfile</button>
              <button onClick={()=>this.props.dispatch(showPawfileForm(false, undefined))} type="button">Cancel</button>
            </div>

            <button aria-label="close pawfile blurb" type="button" className = "close" onClick={()=>this.props.dispatch(showPawfileForm(false, undefined))}>X</button>
            
          </form>
        </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state is', state);
  let currentPawfileFormId = state.pawfile.currentPawfileFormId;
  console.log('currentPawfileFormId is', currentPawfileFormId);
  let individualPawfile = state.pawfile.pawfiles.find(pawfile=>pawfile.id==currentPawfileFormId);
  console.log('individual pawfile is', individualPawfile);

  return {
    // to get the initial values if the user is editing the form: 
    currentPawfileFormId: state.pawfile.currentPawfileFormId,
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
})(PawfileForm));