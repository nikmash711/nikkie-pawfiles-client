import React from 'react';
import {connect} from 'react-redux';
import {formatDate} from '../helper-functions';

import './memory-post.css'

export function MemoryPost(props){
  return(
    <li key={props.index} className={`${props.type.toLowerCase()} post`}>
      <div className="all-post-info">
        <h3 className="post-title">{props.title}</h3>
        <span className="post-date">{formatDate(props.date).toDateString()}</span>
        <p className="post-description">{props.description}</p>
      </div>
      {props.memory_img && <img className="post-img" src={props.memory_img} alt={props.title}/>}
    </li>
  );
}

export default connect()(MemoryPost);