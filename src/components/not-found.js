import React from 'react';
import { Redirect } from 'react-router-dom'

import './not-found.css'

//if any nonexistent link is input, this shows
export default class NotFound extends React.Component{

  constructor(props) {
    super(props);
    // Handles the image being shown only after it's loaded: 
    this.state = { 
      redirect: false,
    };
  }

  componentDidMount(){
    setTimeout(
      function() {
        this.setState({
          redirect: true,
        })
      }
      .bind(this),
      5000
  );
  }

  render(){
    return( 
      <main className ="error-page">
        {this.state.redirect && <Redirect to="/home"/>}
        <p>THERE HAS BEEN AN ERROR. REDIRECTING TO HOME</p>
      </main>
    );
  }
}
