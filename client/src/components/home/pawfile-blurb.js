import React from 'react';
import {connect} from 'react-redux';
import './pawfile-blurb.css';

export function PawfileBlurb(props){
  console.log(props);
  return(
    <article className= {`${props.gender.toLowerCase()} blurb`}>
      <img src= {props.img} alt={props.name} className="prof-pic"/>
      <h2>{props.name}</h2>
      <p><strong>Species:</strong> {props.species}</p>
      <p><strong>Breed:</strong> {props.breed}</p>
      <p><strong>Gender:</strong> {props.gender}</p>
      <p><strong>Birthday:</strong> {props.birthday}</p>
      <p><strong>Bio:</strong> {props.bio}</p>
    </article>
  );
}

export default connect()(PawfileBlurb);