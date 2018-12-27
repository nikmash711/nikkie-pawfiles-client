import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './pawfile-blurb.css';
import {changeCurrentPetId} from '../../actions/index';


export class PawfileBlurb extends React.Component{
  calculateAge(birthday){
    let bday = new Date(birthday);
    var diff_ms = Date.now() - bday.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  render(){
    return(
      <article className= {`${this.props.gender.toLowerCase()} blurb`}>
        <Link to={`/${this.props.name}/${this.props.id}`}>
          <img src= {this.props.img} alt={this.props.name} className="prof-pic"/>
        </Link>
  
        <Link to={`/${this.props.name}/${this.props.id}`}>
          <h2>{this.props.name}</h2>
        </Link>
  

        <div className="option-icons">
          <Link to={`/${this.props.name}/${this.props.id}`}>
            <i className="fas fa-external-link-alt"></i>
          </Link>
          <i className="fas fa-edit"></i>
          <i className="fas fa-trash-alt"></i>
        </div>
  
        <p><strong>Species:</strong> {this.props.species}</p>
  
        {this.props.breed && <p><strong>Breed:</strong> {this.props.breed}</p>}
  
        <p><strong>Gender:</strong> {this.props.gender}</p>
        
        { this.props.birthday && 
          <p><strong>Birthday:</strong> {new Date(this.props.birthday).toLocaleDateString()}</p> 
        }

        {
        this.props.birthday && 
        <p><strong>Age:</strong> {this.calculateAge(this.props.birthday)}</p>
        }
        {this.props.bio && <p><strong>Bio:</strong> {this.props.bio}</p>}
      </article>
    );
  }
}

export default connect()(PawfileBlurb);