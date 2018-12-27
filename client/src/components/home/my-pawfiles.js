import React from 'react';
import {connect} from 'react-redux';
import PawfilesList from './pawfiles-list';
import AddNewPawfileButton from './add-new-pawfile-button';
import AddNewPawfileForm from './add-new-pawfile-form';
import SortBySelect from './sort-by-select';
import Header from './header';
import './my-pawfiles.css'

export function MyPawfiles(props){
  let className = props.pawfiles.length<=1 ? "no-pets" : ""; //if there are no pets listed, make main stretch to 100% of viewport 

  return(
    <main className={className}>
      <div className="center-me">
        <Header/>
        {props.pawfiles.length>1 && <SortBySelect/>} 
        <PawfilesList/>
        <AddNewPawfileButton/>
        {props.addingNewPawfile && <AddNewPawfileForm/>} 
      </div>
    </main>
  );
}

const mapStateToProps = state => ({
  pawfiles: state.pawfile.pawfiles,
  addingNewPawfile: state.pawfile.addingNewPawfile,
});

export default connect(mapStateToProps)(MyPawfiles);