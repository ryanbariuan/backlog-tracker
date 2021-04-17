import React from 'react';
import {connect} from 'react-redux';
import './ProfileComponent.css';
import {Link} from 'react-router-dom';
import axios from 'axios';


class ProfileComponent extends React.Component{

  state = {
    showAddGameForm: false,
    showAddPlatform: false,
    game: '',
    platform: '',
    ownership: 'Owned Physical',
    status: 'Backlog/Unfinished',
    boxart: '',
    //--- for Platform ---
    addPlatform: '',
    //myPlatforms: {}
  }

  componentDidMount()
  {
    axios.get(`${this.props.backend}/profile`).then(res =>{
      this.props.loadPlatform(res.data);
    });
  }

  addGame = () =>
  {

    let gname = this.state.game;
    let pname = this.state.platform;

    if(pname.trim() === "" || gname.trim() === "")
    {
      alert(`Please fill up all the fields. For Platform, add a platform first before adding a game.`);
    }
    else
    {
      axios.post(`${this.props.backend}/profile/addgame`, {
        game: this.state.game,
        platform: this.state.platform,
        ownership: this.state.ownership,
        status: this.state.status,
        boxart: this.state.boxart,
        userLogged: this.props.user
      }).then(res => {

        if(res.data.error)
        {
          alert(res.data.error);
        }
        else
        {
          alert('Game added Successfully!');
  
          let loadedAccountDetails = {
            _id: res.data.user._id,
            mygames: res.data.user.mygames,
            username: res.data.user.username,
            email: res.data.user.email
          }
          this.props.loadAccInfo(loadedAccountDetails);
        }

      });

      this.setState({
        game: '',
        platform: '',
        ownership: 'Owned Physical',
        status: 'Backlog/Unfinished',
        boxart: '',
        description: ''
      });

    }

    

  }

  addPlatform = () =>
  {

    let addPF = this.state.addPlatform;

    if(addPF.trim() === "")
    {
      alert(`Please fill up all the fields!`);
    }
    else
    {
      axios.post(`${this.props.backend}/profile/addplatform`, {platform: this.state.addPlatform})
      .then(res =>{
        if(res.data.error)
        {
          alert(res.data.error);
        }
        else
        {
          alert(`${this.state.addPlatform} has succesfully added`);
          axios.get(`${this.props.backend}/profile`).then(res =>{
            this.props.loadPlatform(res.data);
          });

          this.setState({
            addPlatform: ''
          });
        } 
      });
    }

  }

  hidePlatformForm = (toggle) =>
  {
    this.setState(
      {
        showAddPlatform: toggle
      }
    )
  }




  render()
  {
    let backlogCount;
    backlogCount = this.props.acc.mygames.filter( (game) =>{
      return game.status === 'Backlog/Unfinished';
    });
    let beatenCount;
    beatenCount = this.props.acc.mygames.filter( (game) =>{
      return game.status === 'Beaten/Finished';
    });
    let completeCount;
    completeCount = this.props.acc.mygames.filter( (game) =>{
      return game.status === 'Completed';
    });

    let apf;
    apf = this.props.allPlatforms.map(cons => {
      return cons.platform;
    });
    let sortedAPF = apf.sort();

    return(
      <div id = "profileContainer">
        <div id = "profileContentBox">
          <div id="profileHeader">
            <div id="profileHeaderTop">
              <h1>{this.props.user}'s Profile Page</h1>
              <img alt="gamepadIcon" src ="https://www.flaticon.com/svg/vstatic/svg/3516/3516069.svg?token=exp=1613383575~hmac=c2a38885cae19769cb1d8dc2653ef40c"></img>
            </div>
            <div id="recentlyAdded">
              <h4>Email: <span>{this.props.acc.email}</span></h4>
              <h4>Total Number of Game Collection: <span>{this.props.acc.mygames.length}</span></h4>
              <h3>Your recently added game:</h3>
              {
                this.props.acc.mygames.length === 0 ? (
                  <p>No added games yet</p>
                ) : (
                  <fieldset>
                    <legend>Recently Added</legend>
                    <label>Game: </label><span>{this.props.acc.mygames[this.props.acc.mygames.length - 1].game}</span>
                    <br/>
                    <label>Platform/System: </label><span>{this.props.acc.mygames[this.props.acc.mygames.length - 1].platform}</span>
                    <br/>
                    <label>Ownership: </label><span>{this.props.acc.mygames[this.props.acc.mygames.length - 1].ownership}</span>
                    <br/>
                    <label>Status: </label><span>{this.props.acc.mygames[this.props.acc.mygames.length - 1].status}</span>
                    <div>
                      <img alt = {this.props.acc.mygames[this.props.acc.mygames.length - 1].boxart} src = {this.props.acc.mygames[this.props.acc.mygames.length - 1].boxart}></img>
                    </div>
                  </fieldset>
                  
                )
              }
              
            </div>
            <div id = "statusBox">
              <ul>
                <li>Backlog/Unfinished: 
                    <span className ="spanBacklog">
                     {' '}<Link to ="/profile/mygames/backlog">{backlogCount.length}</Link>{' '}
                    </span> 
                </li>
                <li>Beaten/Finished:
                    <span className ="spanFinished">
                    {' '}<Link to ="/profile/mygames/beaten">{beatenCount.length}</Link>{' '}
                    </span> 
                </li>
                <li>Completed: 
                    <span className="spanCompleted">
                    {' '}<Link to ="/profile/mygames/completed">{completeCount.length}</Link>{' '}
                    </span>
                </li>
              </ul>
            </div>

            <div id = "profileFormBox">

              <h1>Management</h1>

              {this.state.showAddPlatform ? (
                
                <div id = "AddPlatformBox">
                  <h3>Add Platform / Console Catalog:</h3>
                  <form>
                    <fieldset>
                      <legend>
                        Platform / Video Game Console
                      </legend>
                      <input
                        type = "text"
                        value ={this.state.addPlatform}
                        placeholder = "Name of Platform / System"
                        onChange = {e => {
                          this.setState({addPlatform: e.target.value});
                        }}
                      />
                    </fieldset>
                  </form>
                  <div className ="actionBox">
                    <button id="btnAddPlatform"
                      onClick = {this.addPlatform}
                    >Submit Platform</button>
                    <button id="btnCancelPlatform"
                      onClick = { e => {this.setState({showAddPlatform: false})}}
                    >Cancel</button>
                  </div>
                </div>
              
              ) : (

                <div id ="ShowPlatformBox">
                  <button id="btnShowAddPlatform"
                    onClick = { e => {this.setState({showAddPlatform: true})}}
                  >
                    Add Your Platform
                  </button>
                </div>

              ) } 

              {this.state.showAddGameForm ? (
                <div id ="AddGamesFormBox">
                  <h3>Add Game:</h3>
                  <form>
                    <fieldset>
                      <legend>Game Information</legend>
                      <label>Game Name:</label>{' '}
                      <input 
                        type ="text" 
                        name="game"
                        value = {this.state.game}
                        placeholder = "Game/Software Name"
                        onChange = { e => {
                          this.setState({game: e.target.value});
                        }}
                      />
                      <label>Platform / System:</label>{' '}
                      <select 
                        type ="text" 
                        name="platform"
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
                      <label>Ownership:</label>{' '}
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
                      <label>Box Art:</label>{' '}
                      <input 
                        type ="text" 
                        name="boxart"
                        value = {this.state.boxart}
                        placeholder = "link of box art"
                        onChange = { e => {
                          this.setState({boxart: e.target.value});
                        }}
                      />
                    </fieldset>
                    <fieldset>
                      <legend>Progress Information</legend>
                      <label>Status:</label>{' '}
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
                      
                    </fieldset>
                  </form>

                  <div className="actionBox">
                    <button id="btnAddGame"
                      onClick = {this.addGame}
                    >Submit Add Game</button>
                    <button id="btnCancelAddForm"
                      onClick = { e => {this.setState({showAddGameForm: false})}}
                    >Cancel</button>
                  </div>

                </div>
              ) : (
                <div id = "ShowAddGamesFormBox">
                  <button id="btnShowAddForm"
                    onClick = { e => {this.setState({showAddGameForm: true})}}
                  >
                    Add Game
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
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
    },

    loadPlatform: (platformInfo) =>
    {
      let action = {
        type: 'LOAD_PLATFORM',
        payload: platformInfo
      };
      dispatch(action);
    }


  };

  
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);