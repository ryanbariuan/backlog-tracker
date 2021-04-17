import React from 'react';
import './AddProgressNotesForm.css';
import {connect} from 'react-redux';
import axios from 'axios';


class AddProgressNotesForm extends React.Component {

 state = {
   description: '',
   gameCollID: this.props.myGameID,
   userLogged: this.props.acc._id
 }

addNotes = () =>
{

  if(this.state.description.trim() === "")
  {
    alert(`Please input something on the field!`);
  }
  else
  {
    axios.put(`${this.props.backend}/profile/mygames/${this.props.myGameID}/addnotes`, this.state)
    .then(res =>{
      alert(`A progress note has been added on ${this.props.myGame}`);
      this.props.loadAccInfo(res.data);
    });

    this.setState({
      description: ''
    });
  }

}

  render()
  {

    return(
      <div id = "addNotesContainer">
        <label>Progress Notes: </label>
        <br/>
        <textarea
          value = {this.state.description}
          onChange = {e => this.setState({description: e.target.value})}
        >
        </textarea>{' '}
        <br/>
        <button onClick={this.addNotes}>Add Notes</button>
      </div>
    );
  }
}

const mapStateToProps = state =>
{
  return{
    user: state.user,
    acc: state.acc,
    allPlatforms: state.allPlatforms,
    myPlatforms: state.myPlatforms,
    backend: state.backend
  };
}

const mapDispatchToProps = dispatch =>
{
  return{

    loadAccInfo: (accountInfo) =>
    {
      let action = {
        type: 'LOAD_INFO',
        payload: accountInfo
      };
      dispatch(action);
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProgressNotesForm);