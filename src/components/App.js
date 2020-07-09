import React, { Component } from 'react';
import '../App.css';
import CreateAccount from './CreateAccount';
import FormInput from './FormInput';

class App extends Component {
  state = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    formErrors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  };

  formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach((val) =>
      val.length > 0 ? (valid = false) : (valid = true)
    );

    return valid;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.formValid(this.state.formErrors)) {
      console.log(`
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email: ${this.state.email}
      Password: ${this.state.password}
      `);
    } else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <FormInput onChange={this.handleChange} />
          <CreateAccount Submit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default App;
