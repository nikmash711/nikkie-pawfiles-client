import React from 'react';
import {connect} from 'react-redux';
import {changeSortingPetsMethod} from '../../actions/index';

export function SortBySelect(props){
  return(
    <select className="tape sort" onChange={e=>props.dispatch(changeSortingPetsMethod(e.target.value))}>
      <option value="">Sort By:</option>
      <option value="oldest">Oldest</option>
      <option value="youngest">Youngest</option>
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
    </select>
  );
}

export default connect()(SortBySelect);