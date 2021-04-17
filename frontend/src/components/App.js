import React from 'react';
import './App.css';
import HeaderComponent from './HeaderComponent.js';
import HomeComponent from './HomeComponent.js';
import FooterComponent from './FooterComponent.js';
import RegisterForm from './RegisterForm.js';
import LoginForm from './LoginForm.js';
import ProfileComponent from './ProfileComponent.js';
import MyGamesComponent from './MyGamesComponent.js';
import GamesComponent from './GameComponent.js';
import FilteredByStatusComponent from './FilteredByStatusComponent.js';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';


class App extends React.Component {

  state = {
    game_id: '',
    game: '',
    progressNote_id: ''
  }

  progressNotes = (userID, gameID) =>
  {
    alert(`Hi ${userID} your game ID is ${gameID}`);
  }

  render()
  {
    
    return (
      <div className="App">

        {
        this.props.user ? (

          <>
            <HeaderComponent 
              userLogged = {this.props.user}
              logoutUser = {this.props.logoutUser}
            />
            <main>
              <Route exact path="/about">
                <HomeComponent/>
              </Route>
              <Route exact path="/register">
                {this.props.user && <Redirect to ="/profile"/>}
              </Route>
              <Route exact path="/login">
                {this.props.user && <Redirect to ="/profile"/>}
              </Route>
              <Route exact path="/profile">
                {/* Checks if the account is loaded then mount the ProfileComponent*/}
                {this.props.acc ? (
                  <>
                    <ProfileComponent/>
                  </>
                  
                ) : (
                  <></>
                )}
              </Route>
              <Route exact path="/profile/mygames">
                <MyGamesComponent/>
              </Route>
              <Route exact path="/profile/mygames/backlog">
                <FilteredByStatusComponent status = "Backlog/Unfinished"/>
              </Route>
              <Route exact path="/profile/mygames/beaten">
                <FilteredByStatusComponent status = "Beaten/Finished"/>
              </Route>
              <Route exact path="/profile/mygames/completed">
                <FilteredByStatusComponent status = "Completed"/>
              </Route>
              <Route exact path="/">
                <Redirect to ="/about"/>
              </Route>
              <Route exact path="/games">
                <GamesComponent/>
              </Route>

            </main>
          </>

        ) 
        : (

          <>
            <HeaderComponent/>
            <main>
              <Route exact path="/about">
                <HomeComponent/>
              </Route>
              <Route exact path="/register">
                <RegisterForm/>
              </Route>
              <Route exact path="/login">
                <LoginForm/>
              </Route>
              <Route exact path="/profile">
                <Redirect to ="/login"/>
              </Route>
              <Route exact path="/profile/mygames">
                <Redirect to ="/login"/>
              </Route>
              <Route exact path="/profile/mygames/backlog">
                <Redirect to ="/login"/>
              </Route>
              <Route exact path="/profile/mygames/beaten">
                <Redirect to ="/login"/>
              </Route>
              <Route exact path="/profile/mygames/completed">
                <Redirect to ="/login"/>
              </Route>
              <Route exact path="/profile/mygames/progressnotes">
                <Redirect to = "/login"/>
              </Route>
              <Route exact path="/">
                <Redirect to ="/about"/>
              </Route>
              <Route exact path="/games">
                <GamesComponent/>
              </Route>      
            </main>
          </>

        )
        }
        
        <FooterComponent/>
      </div>
    );

  }
}

const mapStateToProps = state =>
{
  return{
    user: state.user,
    acc: state.acc
  };
}

const mapDispatchToProps = dispatch =>
{
  return{
    logoutUser: () =>
    {
      let action = {
        type: 'LOGOUT'
      }
      dispatch(action);
    }
  };
}


export default  connect(mapStateToProps, mapDispatchToProps)(App);

