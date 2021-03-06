import React from 'react';
import {connect} from 'react-redux';
import PawfileBlurb from '../common/pawfile-blurb';
import ReminderBlurb from './reminder-blurb';
import './sidebar.css'

export class Sidebar extends React.Component{

  componentDidMount(){
    document.title = this.props.individualPawfile.name ? `${this.props.individualPawfile.name}` : "Pawfile";
  }

  componentDidUpdate(){
    document.title = this.props.individualPawfile.name ? `${this.props.individualPawfile.name}` : "Pawfile";
  }

  render(){
    if(this.props.pawfilesPending){
      return(<aside className="sidebar left"></aside>); 
    }

    //if the id was wrong and there is no such pawfile: 
    if(!this.props.individualPawfile.name){
      return (
        <p></p>
      );
    }
    
    return(
        <aside className="sidebar left"> 
          <div className="center-me">
            <PawfileBlurb {...this.props.individualPawfile}/>
            <ReminderBlurb {...this.props.individualPawfile} />
          </div>
        </aside>      
      );
  }
}

Sidebar.defaultProps= {
  individualPawfile: {}
}

const mapStateToProps = (state, props) => ({
  //find the pawfile with an id equal to the one passed down in props
  individualPawfile: state.pawfile.pawfiles.find(pawfile=>pawfile.id===props.id),
  pawfilesPending: state.pawfile.pawfilesPending,
});

export default connect(mapStateToProps)(Sidebar);