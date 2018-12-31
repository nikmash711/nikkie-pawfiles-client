import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {showPawfileForm, deletePawfile} from '../../actions/index';
import {formatDate, calculateAge} from '../helper-functions';
import './pawfile-blurb.css';

export class PawfileBlurb extends React.Component{

  render(){
    console.log('in pawfile blurb, props are', this.props);
    return(
      <article className= {`${this.props.gender.toLowerCase()} blurb`}>
        <div className="top">
          <Link to={`/${this.props.id}`}>
              <img src= {this.props.img} alt={this.props.name} className="prof-pic"/>
          </Link>
    
          <Link to={`/${this.props.id}`}>
            <h2>{this.props.name}</h2>
          </Link>
        </div>
    
        <div className="option-icons">
          <Link to={`/${this.props.id}`}>
            <i className="fas fa-external-link-alt"></i>
          </Link>
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
      </article>
    );
  }
}

export default connect()(PawfileBlurb);