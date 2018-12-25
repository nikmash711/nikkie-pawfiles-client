import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './pawfile-blurb.css';

export function PawfileBlurb(props){
  console.log('in pawfile burb props are',props);
  return(
    <article className= {`${props.gender.toLowerCase()} blurb`}>
      <Link to={`/${props.name}/${props.id}`}>
        <img src= {props.img} alt={props.name} className="prof-pic"/>
      </Link>
      <Link to={`/${props.name}/${props.id}`}>
        <h2>{props.name}</h2>
      </Link>
      <div className="option-icons">
        <Link to={`/${props.name}/${props.id}`}>
          <i className="fas fa-external-link-alt"></i>
        </Link>
        <i className="fas fa-edit"></i>
        <i className="fas fa-trash-alt"></i>
      </div>
      <p><strong>Species:</strong> {props.species}</p>
      <p><strong>Breed:</strong> {props.breed}</p>
      <p><strong>Gender:</strong> {props.gender}</p>
      <p><strong>Birthday:</strong> {props.birthday}</p>
      <p><strong>Bio:</strong> {props.bio}</p>
    </article>
  );
}

export default connect()(PawfileBlurb);