import React from 'react';
import {connect} from 'react-redux';
import PawfilesList from './pawfiles-list';
import AddNewPawfileButton from './add-new-pawfile-button';
import PawfileForm from '../pawfile-form';
import SortBySelect from './sort-by-select';
import Header from './header';
import {changePawfilesPending} from '../../actions/pawfile-crud';
import './my-pawfiles.css'

export class MyPawfiles extends React.Component{
  componentWillUnmount(){
    this.props.dispatch(changePawfilesPending(true));
  }

  render(){
    let className = this.props.pawfiles.length===0 ? "no-pets" : ""; //if there are no pets listed, make main stretch to 100% of viewport - still looks awk if there's 1 pet that's short, FIX
    
    if(this.props.pawfilesPending){
      console.log('pending');
      return <p>Loading</p>
    }

    console.log('mypawfiles.js props are', this.props.pawfiles);
    return(
      <main className={className}>
        <div className="center-me">
          <Header/>
          {this.props.pawfiles.length>1 && <SortBySelect/>} 
          {/* only allow user to sort if there's more than one pet */}
          <PawfilesList/>
          <AddNewPawfileButton/>
          {(this.props.showPawfileForm && <PawfileForm/>)}
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  pawfiles: state.pawfile.pawfiles,
  showPawfileForm: state.pawfile.showPawfileForm,
});

export default connect(mapStateToProps)(MyPawfiles);