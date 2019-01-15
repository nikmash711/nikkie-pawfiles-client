import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import MemoryPost from './memory-post'
import MedicalPost from './medical-post'
import {showMedicalForm, showMemoryForm, changeSearchTerm, changeCategoryFilter} from '../../actions/index';
import LoadingAnimation from '../loading-animation'
import {filterBySearch, sortNewestToOldest, filterByCategory} from '../helper-functions';
import './main-section.css'

export class MainSection extends React.Component{
  render(){
    if(this.props.pawfilesPending){
      return (<LoadingAnimation/>)
    }

    //if the id was wrong and there is no such pawfile: 
    if(!this.props.individualPawfile.name){
     return <Redirect to="/home"/>;
    }

    let error;
    if (this.props.error) {
        error = (
            <div className="error-message" aria-live="polite">
                {this.props.error}
            </div>
        );
        window.scrollTo(0, 0);
    }
  
    let posts;
    
    //if this pet has some pre-existing posts: 
    if(this.props.individualPawfile.posts){
       posts = this.props.individualPawfile.posts.map((post,index)=>(
        post.type==="memory" ?
          <MemoryPost key={index} postId={post.id} {...post}/>
        :
          <MedicalPost key={index} postId={post.id} {...post}/>
      ))
  
      //automatically sort posts newest to oldest
      sortNewestToOldest(posts);
  
      if(this.props.currentSearchTerm){
        posts = filterBySearch(this.props.currentSearchTerm, posts);
      }
  
      if(this.props.categoryFilter){
        posts = filterByCategory(this.props.categoryFilter, posts)
      }
    }
  
      return(
        <main>
          {error}
          <nav className="options">
  
              <div className="filters">
                <select onChange={e=>this.props.dispatch(changeCategoryFilter(e.target.value))} className="tape" name="filter" id="filter">
                  <option value="">Show All Categories</option>
                  <option value="memory">Memories</option>
                  <option value="medical">Medical</option>
                </select>
              </div>
  
              <div className="search-input">
                <input onChange={e=>this.props.dispatch(changeSearchTerm(e.target.value))} className="tape" placeholder='Search Posts'/>
              </div>
  
              <div className="add-buttons">
                <button onClick={()=>this.props.dispatch(showMemoryForm(true, undefined))} className="new-memory tape">New Memory</button>
                <button onClick={()=>this.props.dispatch(showMedicalForm(true, undefined))} className="new-medical tape">New Medical</button>
              </div>
  
            </nav>
            <ul className="posts">
                {posts}
            </ul>
        </main>
      );
  }
  
}

//make a default props mock object with empty or null values for everything needed. then dont use pawfilepending
MainSection.defaultProps= {
  individualPawfile: {}
}

const mapStateToProps = (state,props) => ({
  individualPawfile: state.pawfile.pawfiles.find(pawfile=>pawfile.id==props.id),
  currentSearchTerm: state.pawfile.currentSearchTerm,
  categoryFilter: state.pawfile.categoryFilter,
  pawfilesPending: state.pawfile.pawfilesPending,
  error: state.pawfile.error,
});

export default connect(mapStateToProps)(MainSection);