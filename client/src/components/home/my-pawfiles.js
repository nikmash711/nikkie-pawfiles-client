import React from 'react';
import {connect} from 'react-redux';
import PawfilesList from './pawfiles-list';
import './my-pawfiles.css'

export function MyPawfiles(props){
  return(
    <main>
      <div className="center-me">
        <header> <h1 className="section"> {props.user}'s Pawfiles</h1></header>
        <PawfilesList/>
        {/* <AddNewPawfileButton/>
        <AddNewPawfileForm/> */}
      </div>
    </main>
  );
}

const mapStateToProps = state => ({
  user: state.pawfile.user.firstName,
});

export default connect(mapStateToProps)(MyPawfiles);