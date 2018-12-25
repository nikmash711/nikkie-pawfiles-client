import React from 'react';
import {connect} from 'react-redux';
import MemoryPost from './memory-post'
import MedicalPost from './medical-post'

import './main-section.css'

export function MainSection(props){
  const posts = props.pawfile.posts.map((post,index)=>(
      post.type==="memory" ?
        <MemoryPost key={index} {...post}/>
     :
      <MedicalPost key={index} {...post}/>
    ))

    return(
      <main>
\        <nav className="options">
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
              <input className="search" type="search" placeholder='Search Posts'/>
            </div>
          </nav>
          <ul className="posts">
              {posts}
          </ul>
      </main>
    );
}

const mapStateToProps = (state,props) => ({
  pawfile: state.pawfile.pawfiles[props.id],
});

export default connect(mapStateToProps)(MainSection);