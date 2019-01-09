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
            Well fur-tunately Pawfiles is here to help you keep track of your pet's most important moments! Whether it's what the vet said at their last appointment or a cute memory you just don't want to forget, this is the purr-fect place to document it all!
          </p>
          <h3>What You Can Do:</h3>
          <ul>
            <li>Create medical posts to document symptoms, vet diagnosis, medications, and vaccinations</li>
            <li>Create memory posts with a cute picture to remember the moment</li>
            <li>Create reminders for each pet, with an optional time or date</li>
            <li>Search for a memory or medical post conveniently</li>
            <li>Easily keep track of each pet's doctors, vaccination schedule, and medical history</li>
            <li>Have as many personalized Pawfiles as you do pets!</li>
          </ul>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(AboutPage);