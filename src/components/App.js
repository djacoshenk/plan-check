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
    this.handleErrors(e);
    this.formValid(this.state.formErrors);
  };

  handleChange = (e) => {
    e.preventDefault();
  };

  handleErrors = (e) => {
    const { value, input } = e.target;
    let formErrors = this.state.formErrors;

    switch (value) {
      case 'firstName':
        formErrors.firstName =
          input.length < 1 || input === null
            ? 'Please provide valid input'
            : '';
        break;
      case 'lastName':
        formErrors.lastName =
          input.length < 1 || input === null
            ? 'Please provide valid input'
            : '';
        break;
      case 'email':
        formErrors.email =
          input.length < 1 || input === null
            ? 'Please provide valid input'
            : '';
        break;
      case 'password':
        formErrors.password =
          input.length < 1 || input === null
            ? 'Please provide valid input'
            : '';
        break;
      default:
        break;
    }
    this.setState((state) => state.formErrors[value]);
  };

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <FormInput
            onChange={this.handleChange}
            Submit={this.handleSubmit}
            formErrors={Object.values(this.state.formErrors).map((val) => val)}
          />
          <CreateAccount Submit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default App;
