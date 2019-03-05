import React from 'react';
import {connect} from 'react-redux';
import {SubmissionError} from 'redux-form';
import {reduxForm, Field, focus} from 'redux-form';
import Input from './input';
import {showPawfileForm} from '../../actions/index';
import {submitPawfile} from '../../actions/pawfile-crud';
import {required, nonEmpty, unSelected} from './validators';
import {todaysDate, formatName} from './helper-functions';

export class PawfileForm extends React.Component{
  constructor(props){
    super(props);

    this.first = React.createRef();
    this.state = {
      uploadedFile: false,
      border: '1px solid black',
    }
  }

  componentWillUnmount(){
    this.props.dispatch(showPawfileForm(false, undefined));
  }

  checkIfFile(){
    if(this.img.files.length!==0){
        this.setState({uploadedFile: true});
    }
    else{
        this.setState({uploadedFile: false});
    }
  }

onSubmit(values) {
    if(this.img && this.img.files.length!==0){
        values.img = this.img.files[0];
    }
    else{
      this.setState({border: '1px solid red',})
      this.img.focus();
      return Promise.reject(
        new SubmissionError({
            _error: 'Please upload a profile picture'
        })
    );
    }
    values.name = formatName(values.name);
    console.log('values being sent', values);
    return this.props.dispatch(submitPawfile(values, this.props.currentPawfileFormId));
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

            {!this.props.currentPawfileFormId && 
              <React.Fragment>
                <button 
                  style={{border: this.state.border}}
                  type="button"
                  className="upload-photo required"
                  onClick={()=>this.img.click()}
                >
                   <i className="fas fa-camera"></i> Upload Pawfile Picture {this.state.uploadedFile && <i className="fas fa-file"></i>}
                </button>
                <input 
                  type="file"
                  accept="image/*"
                  className="image-input"
                  id="img"
                  onChange={()=>this.checkIfFile(this.img)}
                  ref={input => this.img = input} 
                />
              </React.Fragment>
            }
            <div className="buttons">
              <button 
                type="submit" 
              >
                Save Pawfile
              </button>
              <button 
                onClick={()=>this.props.dispatch(showPawfileForm(false, undefined))} 
                type="button">Cancel
              </button>
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