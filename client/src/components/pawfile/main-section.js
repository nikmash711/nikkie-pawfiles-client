import React from 'react';
import {connect} from 'react-redux';

import './main-section.css'

export function MainSection(props){
    return(
      <main>
        <nav className="options">
            <div className="add-buttons">
              <button className="new-memory">New Memory</button>
              <button className="new-medical">New Medical</button>
            </div>
            <div className="filters">
              <select className="filter-category" name="" id="">
                <option value="">Select Category</option>
                <option value="">Memories</option>
                <option value="">Medical</option>
              </select>
              <select className="filter-date" name="" id="">
                <option value="">Select Date</option>
              </select>
            </div>
            <div className="search-input">
              <input className="search" type="search" placeholder="Search Posts"/>
            </div>
          </nav>
          <div>
            <p>testing</p>
          </div>
      </main>
    );
}

const mapStateToProps = (state,props) => ({
  pawfile: state.pawfile.pawfiles[props.id],
});

export default connect(mapStateToProps)(MainSection);