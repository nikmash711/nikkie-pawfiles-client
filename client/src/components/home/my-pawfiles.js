import React from 'react';
import {connect} from 'react-redux';
import PawfilesList from './pawfiles-list';
import AddNewPawfileButton from './add-new-pawfile-button';
import AddNewPawfileForm from './add-new-pawfile-form';
import Header from './header';
import './my-pawfiles.css'

export function MyPawfiles(props){
  return(
    <main>
      <div className="center-me">
        <Header/>
        <AddNewPawfileButton/>
        <PawfilesList/>
        {props.addingNewPawfile && <AddNewPawfileForm/>} 
      </div>
    </main>
  );
}

const mapStateToProps = state => ({
  addingNewPawfile: state.pawfile.addingNewPawfile,
});

export default connect(mapStateToProps)(MyPawfiles);