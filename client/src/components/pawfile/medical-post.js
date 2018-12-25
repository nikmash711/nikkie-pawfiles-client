import React from 'react';
import {connect} from 'react-redux';
import './medical-post.css'

export function MedicalPost(props){
  console.log('hehre');
  return(
    <li key={props.index} className={`${props.type.toLowerCase()} post`}>
      <h3 className="post-title">{props.title}</h3>
      <p>{props.doctor}</p>
    </li>
  );
}

export default connect()(MedicalPost);