import React from 'react';
import ProfileHeaderComponent from './ProfileHeaderComponent.js';
import DisplayCollection from './DisplayCollection.js';
import './MyGamesComponent.css'
import {connect} from 'react-redux';



class MyGamesComponent extends React.Component {

  state =
  {
    platformName: 'All'
  }

  render()
  {
    let mpf = JSON.parse(localStorage.getItem('mySystem')).map(pf =>{
      return pf;
    });

    let sortedMPF = mpf.sort();

    let displayByPlatform = this.props.acc.mygames;
    if(this.state.platformName !== 'All')
    displayByPlatform = this.props.acc.mygames.filter(game =>{
      return game.platform === this.state.platformName;
    });

    return(
      <div id ="MyGamesContainer">
         <ProfileHeaderComponent/>
         <div id ="MyGamesDisplayBox">
          <h1>My Game Collection: </h1>
          <ul id ="ListPlatformBox">
            <li>
              <button
              onClick = {e =>{this.setState({platformName: 'All'})}}
              >All</button>
            </li>
            {
              sortedMPF.map(pf =>{
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

              displayByPlatform.length === 0 ? (
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
    myPlatforms: state.myPlatforms
  };
}


export default connect(mapStateToProps,null)(MyGamesComponent);