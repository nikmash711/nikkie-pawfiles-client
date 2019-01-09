import React from 'react';
import {connect} from 'react-redux';
import {deletePost} from '../../actions/post-crud';
import {showMemoryForm} from '../../actions/index';
import {formatDate} from '../helper-functions';
import './memory-post.css'

export function MemoryPost(props){
  return(
    <li key={props.index} className={`${props.type.toLowerCase()} post`}>
      <div className="all-post-info">
        <h3 className="post-title">{props.title}</h3>
        <span className="post-date">{formatDate(props.date).toDateString()}</span>
        {props.description && <p className="post-description">{props.description}</p>}
      </div>
      {props.memory_img && 
      <a className="post-img-a" href={`${props.memory_img}`} target="_blank">
         <img className="post-img" src={props.memory_img} alt={props.title}/>
      </a>
     }

      <div className="option-icons">
        <button className="edit-button" aria-label = "edit" onClick={()=>props.dispatch(showMemoryForm(true, props.postId))}><i className="fas fa-edit"></i></button>
        <span className = "edit-span">Edit</span>

        <button className="delete-button" aria-label = "delete" onClick={()=>props.dispatch(deletePost(props.currentPetId, props.postId))}><i className="fas fa-trash-alt"></i></button>
        <span className = "delete-span js-delete-span">Delete</span>

      </div>
   
    </li>
  );
}

function mapStateToProps(state) {
  return {
    currentPetId: state.pawfile.currentPetId,
  }
}

export default connect(mapStateToProps)(MemoryPost);