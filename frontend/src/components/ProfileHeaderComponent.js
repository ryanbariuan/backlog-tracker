import React from 'react';
import {connect} from 'react-redux';
import './ProfileComponent.css';
import axios from 'axios';
import {Link} from 'react-router-dom';


class ProfileHeaderComponent extends React.Component{


  componentDidMount()
  {
    axios.get(`${this.props.backend}profile`).then(res =>{
      this.props.loadPlatform(res.data);
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeaderComponent);