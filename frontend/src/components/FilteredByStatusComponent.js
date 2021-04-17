import React from 'react';
import ProfileHeaderComponent from './ProfileHeaderComponent.js';
import DisplayCollection from './DisplayCollection.js';
import './FilteredByStatusComponent.css';
import {connect} from 'react-redux';

class FilteredByStatusComponent extends React.Component{

  state = {
    status: this.props.status,
    platformName: 'All',
    gamesByStatus: []
  }

  render()
  {

    let backlogPFSort = this.props.myBacklogPF.sort();
    let beatenPFSort = this.props.myBeatenPF.sort();
    let completedPFSort = this.props.myCompletedPF.sort();

    let displayByPlatform;

    if(this.props.status === "Backlog/Unfinished")
    {
      displayByPlatform = this.props.myBacklogGames;
      if(this.state.platformName !== 'All')
      displayByPlatform = this.props.myBacklogGames.filter(game =>{
        return game.platform === this.state.platformName;
      });
    }
    else if(this.props.status === "Beaten/Finished")
    {
      displayByPlatform = this.props.myBeatenGames;
      if(this.state.platformName !== 'All')
      displayByPlatform = this.props.myBeatenGames.filter(game =>{
        return game.platform === this.state.platformName;
      });
    }
    else if(this.props.status === "Completed")
    {
      displayByPlatform = this.props.myCompletedGames;
      if(this.state.platformName !== 'All')
      displayByPlatform = this.props.myCompletedGames.filter(game =>{
        return game.platform === this.state.platformName;
      });
    }

    return(
      <div id ="FilteredGamesContainer">
        <ProfileHeaderComponent/>
        <div id ="FilteredDisplayBox">
          {
            this.props.status === "Backlog/Unfinished" ?
            (
              <>
                <h1>My Backlog/Unfinished Games</h1>
                <ul id ="ListPlatformBox">
                  <li>
                    <button
                    onClick = {e =>{this.setState({
                      platformName: 'All',
                      gamesByStatus: this.props.myBacklogGames
                    })}}
                    >All</button>
                  </li>
                  {
                    backlogPFSort.map(pf =>{
                      return(
                        <li key = {pf}>
                          <button
                          onClick = {e =>{this.setState({platformName: pf})}}
                          >{pf}</button>
                        </li>
                      );
                    })
                  }
                </ul>
                <div id = "displayBox">
                  {
                    this.state.platformName === 'All' ?
                    (<h3>All Games: </h3>)
                    :
                    (<h3>{this.state.platformName}</h3>)
                  }
                
                  {
                    this.props.myBacklogGames.length === 0 ? (
                      <h3 id="zeroPlatformMsg">No added games yet</h3>
                    )
                    :
                    (
                      displayByPlatform.map(myColl =>{
                        return(
                          <DisplayCollection
                            key ={myColl._id}
                            coll = {myColl}
                            userID = {this.props.acc._id}
                          />
                        );
                      })
                    )
                  }
                </div>
              </>
            )
            :
            this.props.status === "Beaten/Finished" ?
            (
              <>
                <h1>My Beaten/Finished Games</h1>
                <ul id ="ListPlatformBox">
                  <li>
                    <button
                    onClick = {e =>{this.setState({
                      platformName: 'All',
                      gamesByStatus: this.props.myBeatenGames
                    })}}
                    >All</button>
                  </li>
                  {
                    beatenPFSort.map(pf =>{
                      return(
                        <li key = {pf}>
                          <button
                          onClick = {e =>{this.setState({platformName: pf})}}
                          >{pf}</button>
                        </li>
                      );
                    })
                  }
                </ul>
                <div id = "displayBox">
                  {
                    this.state.platformName === 'All' ?
                    (<h3>All Games: </h3>)
                    :
                    (<h3>{this.state.platformName}</h3>)
                  }
                
                  {
                    this.props.myBeatenGames.length === 0 ? (
                      <h3 id="zeroPlatformMsg">No added games yet</h3>
                    )
                    :
                    (
                      displayByPlatform.map(myColl =>{
                        return(
                          <DisplayCollection
                            key ={myColl._id}
                            coll = {myColl}
                            userID = {this.props.acc._id}
                          />
                        );
                      })
                    )
                  }
                </div>
              </>
            )
            :
            this.props.status === "Completed" ?
            (
              <>
                <h1>My Completed Games</h1>
                <ul id ="ListPlatformBox">
                  <li>
                    <button
                    onClick = {e =>{this.setState({
                      platformName: 'All',
                      gamesByStatus: this.props.myCompletedGames
                    })}}
                    >All</button>
                  </li>
                  {
                    completedPFSort.map(pf =>{
                      return(
                        <li key = {pf}>
                          <button
                          onClick = {e =>{this.setState({platformName: pf})}}
                          >{pf}</button>
                        </li>
                      );
                    })
                  }
                </ul>
                <div id = "displayBox">
                  {
                    this.state.platformName === 'All' ?
                    (<h3>All Games: </h3>)
                    :
                    (<h3>{this.state.platformName}</h3>)
                  }
                
                 {
                    this.props.myCompletedGames.length === 0 ? (
                      <h3 id="zeroPlatformMsg">No added games yet</h3>
                    )
                    :
                    (
                      displayByPlatform.map(myColl =>{
                        return(
                          <DisplayCollection
                            key ={myColl._id}
                            coll = {myColl}
                            userID = {this.props.acc._id}
                          />
                        );
                      })
                    )                  
                  }
                </div>
              </>
            )
            :
            (
              ''
            )
          }
        </div>
      </div>
    );
  }

}

const mapStateToProps = state =>
{
  return{
    acc: state.acc,
    allPlatforms: state.allPlatforms,
    myPlatforms: state.myPlatforms,
    myBacklogPF: state.myBacklogPF,
    myBeatenPF: state.myBeatenPF,
    myCompletedPF: state.myCompletedPF,
    myBacklogGames: state.myBacklogGames,
    myBeatenGames: state.myBeatenGames,
    myCompletedGames: state.myCompletedGames,
  };
}

export default connect(mapStateToProps)(FilteredByStatusComponent);