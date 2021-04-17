import React from 'react';
import './HomeComponent.css';

class HomeComponent extends React.Component {
  render()
  {
    return(
      <div id = "homeContainer">
        <div id = "defaultContainer">
          <h2>What is Game Backlog Tracker?</h2>
          <p>
              A sample project system that is created for people who have massive video game backlogs to
              encourage them to play and finished their collection. This helps to have overview statistics
              of their gaming library, help you what to play next, and be able to hold back buying more 
              video games as there are still games from there collection that is needed to be played/finished.
          </p>
          
          <h2>Website Description:</h2>
          <ul>
              <li>
                List all the games you own <em>legally</em>. It can be digitally owned, secondhand, 
                online subscription, etc. It is advised to only include the games you own.
                user discretion is advised.
              </li>
              <li>
                Customizable support for every game entries including old/retro console platforms,
                PC games, modern consoles and other unfamiliar medium where you can play the game.
              </li>
              <li>
                Add game reviews to the catalog of games.(not yet implemented)
              </li>
              <li>
                Keep track of your progress in every game you own by setting up the status whether
                it is a backlog, unfinished, finished, or completed (where certain task or goals have met). 
              </li>
              <li>
                Can include to-do list for game completionist (ex: defeating a secret boss, DLC quest,
                get al items, etc.)
              </li>
              <li>
                Join the fight in battling all your unfinished games! and proceed to buy new ones :)
              </li>
          </ul>      
        </div>


      </div>
    );
  }
}

export default HomeComponent;