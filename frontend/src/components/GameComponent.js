import React from 'react';
import './GameComponent.css';
import GameDisplayComponent from './GameDisplayComponent.js';
import {connect} from 'react-redux';
import axios from 'axios';

class GameComponent extends React.Component{

  state =
  {
    platformName: 'All',
    allLoadedGames: [],
  }

  componentDidMount()
  {
    axios.get(`${this.props.backend}/games`).then(res =>{
      this.props.loadPlatform(res.data.pfdata);
      this.setState({
        ...this.state,
        allLoadedGames: res.data.gamedata
      })

    });
  }

  btnViewGamesPerPlatform = (event) =>
  {
    this.setState({
      ...this.state,
      platformName: event.target.value
    });
    
  }


  render()
  {

    let apf;
    apf = this.props.allPlatforms.map(cons => {
      return cons.platform;
    });

    let sortedAPF = apf.sort();
    //console.log(this.props.allPlatforms);
    //console.log(this.state.allLoadedGames);
    let allGamesRecorded = this.state.allLoadedGames.slice(0);
    if(this.state.platformName !== 'All')
    allGamesRecorded = this.state.allLoadedGames.filter(game =>{
      return game.platform === this.state.platformName;
    });

    //console.log(allGamesRecorded);

    return(
    <div id ="AllGamesContainer">
      <h1>All Games</h1>
      <div id="AllPlatformsContainer">
        <button
          onClick = {e =>{this.setState({platformName: 'All'})}}
        >
          All
        </button>
        {
          sortedAPF.map(consolePlatform =>{
            return(
              <button 
                key ={consolePlatform}
                value = {consolePlatform}
                onClick = {e =>this.btnViewGamesPerPlatform(e)}
              >{consolePlatform}</button>
            );
          })
        }
      </div>
      <div id = "DisplayAllGames">
      {
        this.state.platformName === 'All' ?
        (<h3>All Games: </h3>)
        :
        (<h3>{this.state.platformName}</h3>)
      }
      {
        allGamesRecorded.map(games => {
          return (
            <GameDisplayComponent
              key = {games._id}
              gameInfo = {games}
            />
          );
        }) 
      }
      </div>
    </div>
    );
  }
};

const mapStateToProps = state =>
{
  return{
    allPlatforms: state.allPlatforms,
    backend: state.backend
    //allGames: state.allGames // ayaw pumasok sa reducer
  };
};

const mapDispatchToProps = dispatch =>
{

  return{
    loadPlatform: (platformInfo) =>
    {
      let action = {
        type: 'LOAD_PLATFORM',
        payload: platformInfo
      };
      dispatch(action);
    },

    // comment out na lang muna ayaw pumasok data dito
    // loadGames: (gamesInfo) =>
    // {
    //   let action = {
    //     type: 'LOAD_GAME',
    //     payload: gamesInfo
    //   };
    //   dispatch(action);
    // }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(GameComponent);