import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {showPawfileForm} from '../actions/index';
import {deletePawfile} from '../actions/pawfile-crud';
import {formatDate, calculateAge} from './helper-functions';
import './pawfile-blurb.css';

export class PawfileBlurb extends React.Component{

  render(){
    console.log('in pawfile blurb, props are', this.props);
    return(
      <article className= {`${this.props.gender.toLowerCase()} blurb`}>
        <div className="top">
            <img src= {this.props.img} alt={this.props.name} className="prof-pic"/>
            <h2>{this.props.name}</h2>
        </div>
    
        <div className="option-icons">
          <button onClick={()=>this.props.dispatch(showPawfileForm(true,this.props.id))}><i className="fas fa-edit"></i></button>
          <button onClick={()=>this.props.dispatch(deletePawfile(this.props.id))}><i className="fas fa-trash-alt"></i></button>
        </div>
    
        <p><strong>Species:</strong> {this.props.species}</p>
  
        {this.props.breed && <p><strong>Breed:</strong> {this.props.breed}</p>}

        {this.props.weight && <p><strong>Weight:</strong> {this.props.weight}</p>}
  
        <p><strong>Gender:</strong> {this.props.gender}</p>
        
        { 
          this.props.birthday && 
          <p><strong>Birthday:</strong> {formatDate(this.props.birthday).toLocaleDateString()}</p> 
        }

        {
          this.props.birthday && 
          <p><strong>Age:</strong> {calculateAge(this.props.birthday)}</p>
        }
        
        {
          this.props.bio && 
          <p><strong>Bio:</strong> {this.props.bio}</p>
        }

        <Link to={`/${this.props.id}`} className="view-pawfile">
          View Pawfile
        </Link>
      </article>
    );
  }
}

export default connect()(PawfileBlurb);