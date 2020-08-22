import React from 'react';

const FormInput = ({ Submit, onChange, formErrors }) => {
  return (
    <form onSubmit={Submit} noValidate>
      <div className="firstName">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className={formErrors.firstName.length > 0 ? 'error' : null}
          placeholder="First Name"
          name="firstName"
          onChange={onChange}
          noValidate
        />
        {formErrors.firstName.length > 0 && (
          <span className="errorMessage">{formErrors.firstName}</span>
        )}
      </div>
      <div className="lastName">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className={formErrors.lastName.length > 0 ? 'error' : null}
          placeholder="Last Name"
          name="lastName"
          onChange={onChange}
          noValidate
        />
        {formErrors.lastName.length > 0 && (
          <span className="errorMessage">{formErrors.lastName}</span>
        )}
      </div>
      <div className="email">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className={formErrors.email.length > 0 ? 'error' : null}
          placeholder="Email"
          name="email"
          onChange={onChange}
          noValidate
        />
        {formErrors.email.length > 0 && (
          <span className="errorMessage">{formErrors.email}</span>
        )}
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className={formErrors.password.length > 0 ? 'error' : null}
          placeholder="Password"
          name="password"
          onChange={onChange}
          noValidate
        />
        {formErrors.password.length > 0 && (
          <span className="errorMessage">{formErrors.password}</span>
        )}
      </div>
      <div className="createAccount">
        <button type="submit">Create Account</button>
        <small>Already Have an Account?</small>
      </div>
    </form>
  );
};

export default FormInput;
