import React, {Component} from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input type="text" className="" placeholder="First Name" name="firstName" onChange={this.handleChange} noValidate/>
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" className="" placeholder="Last Name" name="lastName" onChange={this.handleChange} noValidate/>
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input type="email" className="" placeholder="Email" name="email" onChange={this.handleChange} noValidate/>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" className="" placeholder="Password" name="password" onChange={this.handleChange} noValidate/>
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
