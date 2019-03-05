import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, focus} from 'redux-form';
import Input from '../common/input';
import {showMemoryForm} from '../../actions/index';
import {submitPost} from '../../actions/post-crud';
import {required, nonEmpty} from '../common/validators';
import {todaysDate} from '../common/helper-functions';
import './memory-form.css';

export class MemoryForm extends React.Component{
  componentWillUnmount(){
    this.props.dispatch(showMemoryForm(false, undefined));
  }

  onSubmit(values){
    values.type="memory";
    return this.props.dispatch(submitPost(values, this.props.currentPetId, this.props.currentPostId));
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
      <div className='form-modal mem'>
          <form className="form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>

          <h2 className="post-heading">{this.props.initialValues.title ? this.props.initialValues.title : "New Memory"}</h2>

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

            <Field
              component={Input}
              label="Description:" 
              element="textarea" 
              maxLength = '180'
              name="description" 
              id="description"
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
              <button disabled={this.props.pristine || this.props.submitting} type="submit">Save</button>
              <button onClick={()=>this.props.dispatch(showMemoryForm(false, undefined))} type="button">Cancel</button>
            </div>

            <button type="button" className = "close" onClick={()=>this.props.dispatch(showMemoryForm(false, undefined))}>X</button>

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
      description: individualPost ? individualPost.description : "",
      memory_img: individualPost ? individualPost.memory_img : "",
    }
  }
}

export default connect(mapStateToProps)(reduxForm({
  form:'MemoryForm',
  onSubmitFail: (error, dispatch) => {
    dispatch(focus('MemoryForm', Object.keys(error)[0]));
  },
  onSubmitSuccess: (result, dispatch) => {
    dispatch(showMemoryForm(false, undefined));
  }
})(MemoryForm));