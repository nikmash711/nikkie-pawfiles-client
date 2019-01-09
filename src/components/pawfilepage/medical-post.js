import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deletePost} from '../../actions/post-crud';
import {showMedicalForm} from '../../actions/index';
import {formatDate} from '../helper-functions';

import './medical-post.css'

export class MedicalPost extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    //if nextProps or nextState has relevant changes, then return true, Else false.
    return false;
  }

  render(){
    console.log('in medpost, propa are', this.props);
    return(
      <li key={this.props.index} className={`${this.props.type.toLowerCase()} post`}>
        <div className="all-post-info">
        <h3 className="post-title">{this.props.title}</h3>
        <span className="post-date">{formatDate(this.props.date).toDateString()}</span>
      </div>

        {this.props.symptoms.length>0 && <ul className="post-list">
          <strong>Symptoms:</strong>
          {this.props.symptoms.map((symptom, index)=>(
          <li key={index}>{symptom}</li>
          ))}
        </ul>}
  
        {this.props.vaccinations.length>0 && <ul className="post-list">
          <strong>Vaccinations:</strong>
          {this.props.vaccinations.map((vaccination, index)=>(
          <li key={index}>{vaccination}</li>
          ))}
        </ul>}
  
        {this.props.prescriptions.length>0 && <ul className="post-list">
          <strong>Prescriptions:</strong>
          {this.props.prescriptions.map((prescription, index)=>(
          <li key={index}>{prescription}</li>
          ))}
        </ul>}
  
        {this.props.notes && <p> <strong>Notes:</strong> {this.props.notes}</p> }
          {
            this.props.doctor && <p><strong>Doctor: </strong> 
            {
              (this.props.office && <Link to={this.props.office}> {this.props.doctor}</Link>) ||   this.props.doctor
            } 
            </p>
          }
          <div className="option-icons">
            <button onClick={()=>this.props.dispatch(showMedicalForm(true, this.props.postId))}><i className="fas fa-edit"></i></button>
            <button onClick={()=>this.props.dispatch(deletePost(this.props.currentPetId, this.props.postId))}><i className="fas fa-trash-alt"></i></button>
  
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

export default connect(mapStateToProps)(MedicalPost);