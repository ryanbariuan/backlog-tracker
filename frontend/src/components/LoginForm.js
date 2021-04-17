import React from 'react';
import './LoginForm.css';
import axios from 'axios';
import {connect} from 'react-redux';

class LoginForm extends React.Component
{

  state = {
    username: '',
    password: '',
  }

  login = () =>
  {
    
    let user =  this.state.username;
    let pw =  this.state.password;
    

    if(user.trim() === "" || pw.trim() === "")
    {
      alert('Please fill up the form completely!');
    }
    else
    {
      axios.post(`${this.props.backend}/login`, this.state).then(res => {
        if(res.data.error)
        {
          alert(res.data.error);
        }
        else
        {
          alert('Login successful!');
          this.props.loginUser(res.data.username);

          let loadedAccountDetails = {
            _id: res.data._id,
            mygames: res.data.mygames,
            username: res.data.username,
            email: res.data.email
          }

          this.props.loadAccInfo(loadedAccountDetails);
        }
      });
    }
  }

  render()
  {
    return(
      <div id = "loginContainer">
        <h1>Please login your account below:</h1>
        <div id = "loginFormBox">
          <label htmlFor="username">Username:</label>{' '}
          <input 
            type = "text" 
            name = "username"
            placeholder = "Username"
            value = {this.state.username}
            onChange = {
              e =>{
                this.setState({username: e.target.value});
              }
            }
          />
          <label htmlFor="password">Password:</label>{' '}
          <input 
            type = "password" 
            name = "password"
            placeholder = "Password"
            value = {this.state.password}
            onChange = {
              e =>{
                this.setState({password: e.target.value});
              }
            }
          />
        </div>
        <div id = "loginFormBtnBox">
          <button
            onClick = {this.login}
          >
            Login
          </button>

          <button 
            onClick = { 
              e => {
                this.setState({username: '', password: ''});
              }
            }
          >
            Clear Fields
          </button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state =>
{
  return{
    backend: state.backend
  };
}

const mapDispatchToProps = dispatch =>{
  return{

    loginUser: (user) =>
    {
      let action = {
        type: 'LOGIN',
        payload: user,
      };
      dispatch(action);
    },

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


export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);