import React from 'react';
import {connect} from 'react-redux';
import MemoryPost from './memory-post'
import MedicalPost from './medical-post'
import {showMedicalForm, showMemoryForm, changeSearchTerm, changeCategoryFilter} from '../../actions/index';
import {filterBySearch, sortNewestToOldest, filterByCategory} from '../helper-functions';
import './main-section.css'

export function MainSection(props){
  if(props.pawfilesPending){
    return (<main></main>)
  }

  let posts;

  console.log('the posts are', props.individualPawfile.posts);

  //if this pet has some pre-existing posts: 
  if(props.individualPawfile.posts){
     posts = props.individualPawfile.posts.map((post,index)=>(
      post.type==="memory" ?
        <MemoryPost key={index} postId={post.id} {...post}/>
      :
        <MedicalPost key={index} postId={post.id} {...post}/>
    ))
    console.log('the posts are2', posts); //why does it look weird 

    //automatically sort posts newest to oldest
    sortNewestToOldest(posts);

    if(props.currentSearchTerm){
      posts = filterBySearch(props.currentSearchTerm, posts);
    }

    if(props.categoryFilter){
      posts = filterByCategory(props.categoryFilter, posts)
    }
  }

    return(
      <main>
        <nav className="options">
            <div className="add-buttons">
              <button onClick={()=>props.dispatch(showMemoryForm(true, undefined))} className="new-memory">New Memory</button>
              <button onClick={()=>props.dispatch(showMedicalForm(true, undefined))} className="new-medical">New Medical</button>
            </div>
            <div className="filters">
              <select onChange={e=>props.dispatch(changeCategoryFilter(e.target.value))} className="filter-category" name="filter" id="filter">
                <option value="">Show All Categories</option>
                <option value="memory">Memories</option>
                <option value="medical">Medical</option>
              </select>
            </div>
            <div className="search-input">
              <input onChange={e=>props.dispatch(changeSearchTerm(e.target.value))} className="search" type="search" placeholder='Search Posts'/>
            </div>
          </nav>
          <ul className="posts">
              {posts}
          </ul>
      </main>
    );
}

//make a default props mock object with empty or null values for everything needed. then dont use pawfilepending
//MainSection.defaultProps= {}

const mapStateToProps = (state,props) => ({
  individualPawfile: state.pawfile.pawfiles.find(pawfile=>pawfile.id==props.id),
  currentSearchTerm: state.pawfile.currentSearchTerm,
  categoryFilter: state.pawfile.categoryFilter,
  pawfilesPending: state.pawfile.pawfilesPending,
});

export default connect(mapStateToProps)(MainSection);