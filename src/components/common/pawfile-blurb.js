import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {showPawfileForm, showUpdatePhotoForm} from '../../actions/index';
import {submitPawfile} from '../../actions/pawfile-crud';
import {deletePawfile} from '../../actions/pawfile-crud';
import {formatDate, calculateAge} from './helper-functions';
import './pawfile-blurb.css';

export class PawfileBlurb extends React.Component{

  constructor(props) {
    super(props);
    // Handles the image being shown only after it's loaded: 
    this.state = { 
      image: "none",
      placeholder: "block",
    };
  }

  handleImageLoaded() {
    this.setState({ 
      image: "block",
      placeholder: "none"
    });
  }

  onSubmit(e){
    e.preventDefault();
    if(this.img && this.img.files.length!==0){
      let values={};
      values.img = this.img.files[0];
      return this.props.dispatch(submitPawfile(values, this.props.id));    
    }
  }

  render(){
    return(
      <article className= {`${this.props.gender.toLowerCase()} blurb`}>
        <h6 className="form-error">{this.state.photoError}</h6>  
        <div className="top">
          <div className="prof-pic" style={{display: this.state.placeholder}}></div>

          {this.props.img && <img style={{display: this.state.image}} onLoad={()=>this.handleImageLoaded()} src= {this.props.img.url} alt={this.props.name} className="prof-pic"/>}
        
        {/* <button 
          onClick={()=>this.props.dispatch(showUpdatePhotoForm(true, this.props.id))} 
          className="update-photo">Update Profile Picture
        </button> */}

        <button 
          type="button"
          className="update-photo"
          onClick={()=>this.img.click()}
        >
          <i className="fas fa-camera"></i> Update Pawfile Picture 
        </button>
        <input 
            type="file"
            accept="image/*"
            className="image-input"
            name="img"
            id="img"
            onChange={(e)=>this.onSubmit(e)}
            ref={input => this.img = input} 
        />
      </div>
        <Link to={`/${this.props.id}`}>
          <h2 className="text-shadow">{this.props.name}</h2>
        </Link>
    
        <div className="option-icons">
          <button type="button" className="edit-button" aria-label = "edit" onClick={()=>this.props.dispatch(showPawfileForm(true,this.props.id))}><i className="fas fa-edit"></i></button>
          <span className = "edit-span">Edit</span>
          <button type="button" className="delete-button" aria-label = "delete" onClick={()=>this.props.dispatch(deletePawfile(this.props.id))}><i className="fas fa-trash-alt"></i></button>
          <span className = "delete-span js-delete-span">Delete</span>
        </div>
    
        <p><strong>Species:</strong> {this.props.species}</p>

        <p><strong>Gender:</strong> {this.props.gender}</p>
  
        {this.props.breed && <p><strong>Breed:</strong> {this.props.breed}</p>}

        {this.props.weight && <p><strong>Weight:</strong> {this.props.weight}</p>}
          
        { 
          this.props.birthday && 
          <p><strong>Birthday:</strong> {formatDate(this.props.birthday).toLocaleDateString()}</p> 
        }

        {
          this.props.birthday && 
          <p><strong>Age:</strong> {calculateAge(this.props.birthday)}</p>
        }
        
        {
          this.props.bio && 
          <p><strong>Bio:</strong> {this.props.bio}</p>
        }

        <Link to={`/${this.props.id}`} className="view-pawfile">
          View Pawfile
        </Link>
      </article>
    );
  }
}

function mapStateToProps(state){
  return{
    currentPawfileFormId: state.pawfile.currentPawfileFormId,
  }
}

export default connect(mapStateToProps)(PawfileBlurb);
//needs to be connected so it can have access to dispatch