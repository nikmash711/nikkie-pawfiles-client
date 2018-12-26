import React from 'react';
import {connect} from 'react-redux';
import {sortingAllPets} from '../../actions/index';

export function SortBySelect(props){
  return(
    <select onChange={e=>props.dispatch(sortingAllPets(e.target.value))}>
      <option value="">Sort By:</option>
      <option value="oldest">Oldest</option>
      <option value="youngest">Youngest</option>
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
    </select>
  );
}

export default connect()(SortBySelect);