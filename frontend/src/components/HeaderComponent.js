import React from 'react';
import {Link} from 'react-router-dom';
import './HeaderComponent.css';

class HeaderComponent extends React.Component {

  render()
  {
    return(
      <header>
        <div id='logoContainer'>
          <h1>
            <span id="blue">Game</span>{' '} 
            <span id="yellow">Backlog</span>{' '} 
            <span id="red">Tracker</span>
          </h1>
        </div>
        <nav id='navContainer'>
          <ul>
            <li><Link to ="/about">About</Link></li>
            {this.props.userLogged ? (
            <>
              <li><Link to="/games">Games</Link></li>
              <li><Link to="/profile/mygames">MyGames</Link></li>
              <li><Link to ="/profile">MyProfile</Link></li>
              <li>
                <button onClick = {this.props.logoutUser}>
                  Logout
                </button>
              </li>
            
            </>) : (
            <>
              <li><Link to ="/games">Games</Link></li>
              <li><Link to ="/register">Register</Link></li>
              <li><Link to ="/login">Login</Link></li>    
            </>
            )}
           
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderComponent;