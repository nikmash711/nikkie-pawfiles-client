import React from 'react';
import {connect} from 'react-redux';
import {formatDate} from '../helper-functions';
import {Link} from 'react-router-dom';

import './medical-post.css'

export function MedicalPost(props){
  console.log('in medical post, props.type is', props.type);
  return(
    <li key={props.index} className={`${props.type.toLowerCase()} post`}>
      <strong><h3 className="post-title">{props.title}</h3></strong>
      <span className="post-date">{props.date}</span>
      {props.symptoms && <ul className="post-list">
        <strong>Symptoms:</strong>
        {props.symptoms.map((symptom, index)=>(
        <li key={index}>{symptom}</li>
        ))}
      </ul>}

      {props.vaccinations && <ul className="post-list">
        <strong>Vaccinations:</strong>
        {props.vaccinations.map((vaccination, index)=>(
        <li key={index}>{vaccination}</li>
        ))}
      </ul>}

      {props.prescriptions && <ul className="post-list">
        <strong>Prescriptions:</strong>
        {props.prescriptions.map((prescription, index)=>(
        <li key={index}>{prescription}</li>
        ))}
      </ul>}

      {props.notes && <p> <strong>Notes:</strong> {props.notes}</p> }
        {
          props.doctor && <p><strong>Doctor: </strong> 
          {
            (props.office && <Link to={props.office}> {props.doctor}</Link>) ||   props.doctor
          } 
          </p>
        }
    </li>
  );
}

export default connect()(MedicalPost);