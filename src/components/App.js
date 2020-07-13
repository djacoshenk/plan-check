import React, { Component } from 'react';
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

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <FormInput
            onChange={this.handleChange}
            Submit={this.handleSubmit}
            formErrors={this.state.formErrors}
          />
        </div>
      </div>
    );
  }
}

export default App;
