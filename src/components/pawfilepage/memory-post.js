import React from 'react';
import {connect} from 'react-redux';
import {deletePost} from '../../actions/post-crud';
import {showMemoryForm} from '../../actions/index';
import {formatLongDate} from '../common/helper-functions';
import './memory-post.css'

export class MemoryPost extends React.Component{
  constructor(props) {
    super(props);
    // Handles the image being shown only after it's loaded: 
    this.state = { visibility: "hidden" };
  }

  handleImageLoaded() {
    this.setState({ visibility: "visible"});
  }

  render(){
    return(
      <li key={this.props.index} className={`${this.props.type.toLowerCase()} post`}>
        <div className="all-post-info">
          <h3 className="post-title">{this.props.title}</h3>
          <span className="post-date">{formatLongDate(this.props.date)}</span>
          {this.props.description && <p className="post-description">{this.props.description}</p>}
        </div>
        {this.props.memory_img && 
        <a className="post-img-a" href={`${this.props.memory_img.url}`} target="_blank" rel="noopener noreferrer">
           <img style={{visibility: this.state.visibility}} onLoad={()=>this.handleImageLoaded()}  className="post-img" src={this.props.memory_img.url} alt={this.props.title}/>
        </a>
       }
  
        <div className="option-icons">
          <button className="edit-button" aria-label = "edit" onClick={()=>this.props.dispatch(showMemoryForm(true, this.props.postId))}><i className="fas fa-edit"></i></button>
          <span className = "edit-span">Edit</span>
  
          <button 
            className="delete-button" 
            aria-label = "delete" 
            onClick={()=>{
              let confirmDelete = window.confirm('Are you sure you want to delete this pawfile?');
              if(confirmDelete){
                this.props.dispatch(deletePost(this.props.currentPetId, this.props.postId))
              }
              }}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <span className = "delete-span js-delete-span">Delete</span>
  
        </div>
     
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentPetId: state.pawfile.currentPetId,
  }
}

export default connect(mapStateToProps)(MemoryPost);