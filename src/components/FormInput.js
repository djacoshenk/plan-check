import React from 'react';

const FormInput = ({ onChange }) => {
  return (
    <form onSubmit={onChange} noValidate>
      <div className="firstName">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className=""
          placeholder="First Name"
          name="firstName"
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          noValidate
        />
      </div>
    </form>
  );
};

export default FormInput;
