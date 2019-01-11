import React from 'react';
import './loading-animation.css'

export default class LoadingAnimation extends React.Component{
  render(){
    return( 
      <main className ="loading-animation">
        <div className="loading-div center-me">
          <img id = "first-paw-animation" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Black_Paw.svg/852px-Black_Paw.svg.png" alt = "paw" />
          <img id = "second-paw-animation" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Black_Paw.svg/852px-Black_Paw.svg.png" alt = "paw" />
        </div>
      </main>
    );
  }
}
