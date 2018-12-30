import React from 'react';
import {connect} from 'react-redux';
import {formatDate} from '../helper-functions';
import './medical-post.css'

export function MedicalPost(props){
  return(
    <li key={props.index} className={`${props.type.toLowerCase()} post`}>
      <h3 className="post-title">{props.title}</h3>
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
      {props.doctor && <p><strong>Doctor:</strong> {props.doctor}</p>}
    </li>
  );
}

export default connect()(MedicalPost);