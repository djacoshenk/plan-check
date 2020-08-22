import React, { Component } from 'react';
<<<<<<< HEAD

class App extends Component {
=======
import '../App.css';
import FormInput from './FormInput';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

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

  formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach((val) => {
      val === null && (valid = false);
    });

    return valid;
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'firstName':
        formErrors.firstName =
          value.length < 3 ? 'Minimum 3 characters required' : '';
        break;
      case 'lastName':
        formErrors.lastName =
          value.length < 3 ? 'Minimum 3 characters required' : '';
        break;
      case 'email':
        formErrors.email = emailRegex.test(value)
          ? ''
          : 'Invalid email address';
        break;
      case 'password':
        formErrors.password =
          value.length < 6 ? 'Minimum 6 characters required' : '';
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

>>>>>>> 1db7b79b38fa94582a1512c9829f4f3b8d82c29a
  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
<<<<<<< HEAD
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className=""
                placeholder="First Name"
                name="firstName"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className=""
                placeholder="Last Name"
                name="lastName"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className=""
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className=""
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
=======
          <FormInput
            onChange={this.handleChange}
            Submit={this.handleSubmit}
            formErrors={this.state.formErrors}
          />
>>>>>>> 1db7b79b38fa94582a1512c9829f4f3b8d82c29a
        </div>
      </div>
    );
  }
}

export default App;
