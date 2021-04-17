import React from 'react';
import './RegisterForm.css';
import axios from 'axios';
import {connect} from 'react-redux';

class RegisterForm extends React.Component
{

  state = {
    username: '',
    password: '',
    confirmpw: '',
    email: ''
  }

  register = () =>
  {
    
    let user =  this.state.username;
    let pw =  this.state.password;
    let cpw = this.state.confirmpw;
    let email = this.state.email;
    

    if(user.trim() === "" || pw.trim() === "" || email.trim() === "" || cpw.trim() === "")
    {
      alert('Please input data onn the fields!');
    }
    else
    {
      if(pw === cpw)
      {
        axios.post(`${this.props.backend}/register`, this.state).then(res =>{
          if(res.data.error)
          {
            alert(res.data.error);
          }
          else
          {
            alert('You have successfully registered an account');
            this.setState({
              username: '',
              password: '',
              confirmpw: '',
              email: ''
            });
          }
        });
      }
      else
      {
        alert('Password did not match!');
        
        this.setState({
          username: '',
          password: '',
          confirmpw: '',
          email: ''
        });
      }

      
    }
  }

  render()
  {
    return(
      <div id = "registerContainer">
        <h1>Register Account:</h1>
        <div id = "registerFormBox">
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
          <label htmlFor="password">Confirm Password:</label>{' '}
          <input 
            type = "password" 
            name = "confirmPassword"
            placeholder = "Confirm Password"
            value = {this.state.confirmpw}
            onChange = {
              e =>{
                this.setState({confirmpw: e.target.value});
              }
            }
          />
          <label htmlFor="email">Email Address:</label>{' '}
          <input
            type = "email"
            name = "email"
            placeholder = "Ex: example@email.com"
            value = {this.state.email}
            onChange = {
              e =>{
                this.setState({email: e.target.value});
              }
            }
          />
        </div>
        <div id = "registerFormBtnBox">
          <button
            onClick = {this.register}
          >
            Register
          </button>

          <button 
            onClick = { 
              e => {
                this.setState({username: '', password: '', confirmpw: '', email: ''});
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

export default connect(mapStateToProps)(RegisterForm);