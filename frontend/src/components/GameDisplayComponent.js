import React from 'react';
import './GameComponent.css';

class GameDisplayComponent extends React.Component{
  render()
  {
    return(
      <div id = "GameBoxDetails">
        <div id="GameBoxInfo">
          <label>Name: </label><span>{this.props.gameInfo.game}</span>
          <label>Platform: </label><span>{this.props.gameInfo.platform}</span>
          <label>Game Reviews: </label><span>{this.props.gameInfo.gamereviews.length}</span>
        </div>
        
        <div id="GameBoxArt">
          <img alt = {this.props.gameInfo.boxart} src = {this.props.gameInfo.boxart}></img>
        </div>
      </div>
    );
  }
}

export default GameDisplayComponent;