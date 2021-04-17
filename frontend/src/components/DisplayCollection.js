import React from 'react';
import './DisplayCollection.css';
import AddProgressNotesForm from './AddProgressNotesForm.js';
import {connect} from 'react-redux';
import axios from 'axios';

class DisplayCollection extends React.Component{

  state =
  {
    toUpdate: false,
    showProgressNotesForm : false,

    game: this.props.coll.game,
    platform: this.props.coll.platform,
    ownership: this.props.coll.ownership,
    status: this.props.coll.status,
    boxart: this.props.coll.boxart,
    userLogged: this.props.userID,
    game_id: this.props.coll._id
  }

  btnDeleteGame = () =>
  {
    if(window.confirm(`Are you sure you want to delete ${this.props.coll.game}?`))
    {
      axios.put(`${this.props.backend}/profile/mygames/delete/${this.props.coll._id}`, {_id: this.props.userID}).then(res =>{
        alert(`${this.props.coll.game} is now deleted from your collection`);
        this.props.loadAccInfo(res.data);  
      });
    }
    else
    {
      alert('Deletion canceled');
    }
    
  }

  btnUpdateGame = () =>
  {
    axios.put(`${this.props.backend}/profile/mygames/update/${this.props.coll._id}`, this.state)
    .then(res =>
      {
          alert(`${this.props.coll.game} has been updated`)
          this.props.loadAccInfo(res.data);
      });

      this.setState({
        toUpdate: false
      })
  }

  btnProgressNotes = () =>
  {
    if(this.state.showProgressNotesForm)
    {
      this.setState({
        showProgressNotesForm: false
      })
    }
    else
    {
      this.setState({
        showProgressNotesForm: true
      })
    }
  }

  btnDeleteNotes = (event) =>
  {
    if(window.confirm(`Are you sure you want to delete this task on ${this.props.coll.game}?`))
    {
      axios.put(`${this.props.backend}/profile/mygames/${this.props.coll._id}/deletenotes/${event.target.name}`, this.state).then(res =>{
        alert(`You have deleted a task on ${this.props.coll.game}`);
        this.props.loadAccInfo(res.data);  
      });
    }
    else
    {
      alert('Deletion canceled');
      this.setState({
        showProgressNotesForm: false
      })
    }

  }


  render()
  {

    let apf;
    apf = this.props.allPlatforms.map(cons => {
      return cons.platform;
    });
    let sortedAPF = apf.sort();

    return(
      <>
        { this.state.toUpdate ? 
          (
            <div id = "DisplayGamesContainer">
              <div id = "updateDetailsBox">
                <label>Name: </label>
                <input 
                  type = "text"
                  value = {this.state.game}
                  disabled
                  onChange = {e=>{this.setState({game: e.target.value})}}
                ></input>
                <label>Console: </label>
                <select 
                  type ="text" 
                  name="platform"
                  disabled
                  value = {this.state.platform}
                  onChange = { e => {
                    this.setState({platform: e.target.value});
                  }}
                >
                  <option>Select</option>
                  {
                    sortedAPF.map(consoles =>{
                      return(
                        <option key ={consoles}>{consoles}</option>
                      );
                    })
                  }
                </select>
                <label>Ownership: </label>
                <select
                  value ={this.state.ownership}
                  onChange = {e =>{
                    this.setState({ownership: e.target.value});
                  }}
                >
                  <option disabled="disabled">Select</option>
                  <option>Owned Physical</option>
                  <option>Owned Digital</option>
                  <option>Online Subscription</option>
                  <option>Borrowed</option>
                </select>
                <label>Status: </label>
                <select
                  value ={this.state.status}
                  onChange ={ e =>{
                    this.setState({status: e.target.value});
                  }}
                >
                  <option disabled="disabled">Select</option>
                  <option>Backlog/Unfinished</option>
                  <option>Beaten/Finished</option>
                  <option>Completed</option>
                </select>
                <label>Boxart: </label>
                <input 
                  type = "text"
                  value = {this.state.boxart}
                  onChange = {e=>{this.setState({boxart: e.target.value})}}
                ></input>
              </div>
              <div id = "updateManageBox">
                <button 
                id="mbUpdate"
                onClick = {this.btnUpdateGame}
                >Save</button>
                <button 
                id="mbCancel"
                onClick = {e =>{this.setState({
                  toUpdate: false,
                  game: this.props.coll.game,
                  platform: this.props.coll.platform,
                  ownership: this.props.coll.ownership,
                  status: this.props.coll.status,
                })}}
                >Cancel</button>
              </div>
            </div>
          ) 
          : 
          (
            <div id= "DisplayGamesContainer">
              <div id="detailsBox">
                <div id="info">
                  <label>Name: </label><span>{this.props.coll.game}</span>{' '}
                  <label>Console: </label><span>{this.props.coll.platform}</span>{' '}
                  <label>Ownership: </label><span>{this.props.coll.ownership}</span>{' '}
                  <label>Status: </label><span>{this.props.coll.status}</span>{' '}
                </div>
                <div id ="detailsBoxart">
                  <img alt = {this.props.coll.boxart}src = {this.props.coll.boxart}></img>
                </div>
              </div>
             
              <div id = "manageBox">
                <button 
                id="mbUpdate"
                onClick = {e =>{this.setState({toUpdate: true})}}
                >Update</button>
                <button 
                id="mbDelete"
                onClick = {this.btnDeleteGame}
                >Delete</button>
              </div>
              <div id = "manageNotesContainer">
                <button
                onClick = {this.btnProgressNotes}
                >
                  Progress Notes
                </button>
              </div>
              { // showing progress notes form.
                this.state.showProgressNotesForm ?
                (
                  <div class = "displayProgressNotesForm">
                    { this.props.coll.progressnotes.length === 0 ?

                      (
                        <div className = "displayNotes">
                          <p>No tasks / notes added yet</p>
                          <AddProgressNotesForm
                            myGameID = {this.props.coll._id}
                            myGame = {this.props.coll.game}
                          />
                        </div>
                      )
                      :
                      (
                        <div className = "displayNotes">
                          <h4>Tasks / Notes:</h4>               
                          <ol>
                            {this.props.coll.progressnotes.map(notes => 
                                {
                                    return(
                                      <li key ={notes._id}>
                                        <span>{notes.description}</span>
                                        <div>
                                          <button
                                           name = {notes._id}
                                           onClick =
                                            {
                                              (e) =>{ this.btnDeleteNotes(e)}
                                            }
                                          >
                                            delete
                                          </button>
                                        </div>
                                      </li>
                                    );
                                }
                              )
                            }
                          </ol>
                         <AddProgressNotesForm
                            myGameID = {this.props.coll._id}
                            myGame = {this.props.coll.game}
                          />
                        </div>
                      )

                    }
                  </div>
                )
                :
                ('')

              }

            </div>
          )
        }

      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCollection);