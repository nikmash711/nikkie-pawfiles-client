import React from 'react';
import {connect} from 'react-redux';
import './medical-post.css'

export function MedicalPost(props){
  return(
    <li key={props.index} className={`${props.type.toLowerCase()} post`}>
      <h3 className="post-title">{props.title}</h3>
      <span className="post-date">{props.date}</span>
      <ul className="post-symptoms">
        <strong>Symptoms:</strong>
        {props.symptoms && props.symptoms.map((symptom, index)=>(
        <li key={index}>{symptom}</li>
        ))}
      </ul>
      {props.diagnosis && <p> <strong>Diagnosis:</strong> {props.diagnosis}</p> }
      {props.doctor && <p><strong>Doctor:</strong> {props.doctor}</p>}
      {props.office && <p><strong>Office:</strong> {props.office}</p>}
    </li>
  );
}

export default connect()(MedicalPost);