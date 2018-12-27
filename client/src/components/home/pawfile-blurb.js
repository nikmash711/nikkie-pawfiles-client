import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './pawfile-blurb.css';
import {changeCurrentPetId, showPawfileForm} from '../../actions/index';


export class PawfileBlurb extends React.Component{

isLeapYear(year) {
  let d = new Date(year, 1, 28);
  d.setDate(d.getDate() + 1);
  return d.getMonth() == 1;
}

calculateAge(date) {
  let d = new Date(date),
      now = new Date();
  let years = now.getFullYear() - d.getFullYear();
  d.setFullYear(d.getFullYear() + years);
  if (d > now) {
      years--;
      d.setFullYear(d.getFullYear() - 1);
  }
  let days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
  let weeks= Math.floor(days/7);
  let age_in_years= Math.floor(years + days / (this.isLeapYear(now.getFullYear()) ? 366 : 365))
  ;
  let final_age = age_in_years;

  if(age_in_years===0){
    final_age= `~ ${weeks} weeks`
  }
  if(weeks===0){
    final_age=` ~ ${Math.floor(days)} days`
  }
  return final_age;
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
          <button onClick={()=>this.props.dispatch(showPawfileForm(true,this.props.id))}><i className="fas fa-edit"></i></button>
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