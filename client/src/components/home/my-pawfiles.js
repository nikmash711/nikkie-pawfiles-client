import React from 'react';
import {connect} from 'react-redux';
import PawfilesList from './pawfiles-list';
import AddNewPawfileButton from './add-new-pawfile-button';
import PawfileForm from './pawfile-form';
import SortBySelect from './sort-by-select';
import Header from './header';
import './my-pawfiles.css'

export function MyPawfiles(props){
  let className = props.pawfiles.length===0 ? "no-pets" : ""; //if there are no pets listed, make main stretch to 100% of viewport - still looks awk if there's 1 pet that's short, FIX

  console.log('re-rendering mypawfiles with props', props.editingPetId);

  return(
    <main className={className}>
      <div className="center-me">
        <Header/>
        {props.pawfiles.length>1 && <SortBySelect/>} 
        <PawfilesList/>
        <AddNewPawfileButton/>
        {(props.showPawfileForm && <PawfileForm/>)} {/*|| (props.currentPetId>=0 && <PawfileForm/>)  */}
      </div>
    </main>
  );
}

const mapStateToProps = state => ({
  pawfiles: state.pawfile.pawfiles,
  showPawfileForm: state.pawfile.showPawfileForm,
  currentPetId: state.pawfile.currentPetId,
});

export default connect(mapStateToProps)(MyPawfiles);