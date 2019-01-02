import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deletePost} from '../../actions/post-crud';
import {showMedicalForm} from '../../actions/index';
import {formatDate} from '../helper-functions';

import './medical-post.css'

export function MedicalPost(props){
  return(
    <li key={props.index} className={`${props.type.toLowerCase()} post`}>
      <strong><h3 className="post-title">{props.title}</h3></strong>
      <span className="post-date">{formatDate(props.date).toDateString()}</span>
      {props.symptoms.length>0 && <ul className="post-list">
        <strong>Symptoms:</strong>
        {props.symptoms.map((symptom, index)=>(
        <li key={index}>{symptom}</li>
        ))}
      </ul>}

      {props.vaccinations.length>0 && <ul className="post-list">
        <strong>Vaccinations:</strong>
        {props.vaccinations.map((vaccination, index)=>(
        <li key={index}>{vaccination}</li>
        ))}
      </ul>}

      {props.prescriptions.length>0 && <ul className="post-list">
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
        <button onClick={()=>props.dispatch(deletePost(props.currentPetId, props.postId))}><i className="fas fa-trash-alt"></i></button>
        <button onClick={()=>props.dispatch(showMedicalForm(true, props.postId))}><i className="fas fa-edit"></i></button>


    </li>
  );
}

function mapStateToProps(state) {
  return {
    currentPetId: state.pawfile.currentPetId,
  }
}

export default connect(mapStateToProps)(MedicalPost);