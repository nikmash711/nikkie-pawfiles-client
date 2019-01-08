import React from 'react';
import {connect} from 'react-redux';
import './brief-about.css'

export class AboutPage extends React.Component{

  render(){

    return(
      <div className="brief-about">
        <div className="center-me">
          <h1>Welcome To Pawfiles</h1>
          <p>
            Wouldn't it be nice to keep a timeline of your pet's life? From their medical records to remembering something hilarious they did the other day, it can be easy to forget important things about your furry best friend.
            <br/><br/>
            Well Pawfiles is here to help you keep track of your pet's most important moments! Whether it's what the vet said at their last appointment, a record of their vaccination schedule, or a cute memory you just don't want to forget, this is the place to document it all!
          </p>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(AboutPage);