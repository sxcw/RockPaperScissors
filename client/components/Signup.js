import React from 'react';

export default class Signup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // maybe, we pass them as props, instead of login component states? 
      // user: '',
      // password: ''
    };
  }
  // need to fix if we are passing username and password as props
  onUsernameChange(e) {
    this.setState({username: e.currentTarget.value});
  }

  onPasswordChange(e) {
    this.setState({password: e.currentTarget.value});
  }

  hanleSignUp(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="signup">
          <input 
            type="text" 
            placeholder="Enter your username"
            value={this.props.username}
            // TOFIX: onChange function
            onChange={this.handleUsernameChange}
          />
          <input 
            type="password" 
            placeholder="Enter your password"
            value={this.props.password}
            // TOFIX: onChange function
            onChange={this.handleUsernameChange}
          />
        <button type="submit" onClick={this.handleSignUp.bind(this)}>Sign Up</button>
      </form>
    )
  }
}
