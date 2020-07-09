import React from 'react';

const CreateAccount = ({ Submit }) => {
  return (
    <div className="createAccount" onClick={Submit}>
      <button type="submit">Create Account</button>
      <small>Already Have an Account?</small>
    </div>
  );
};

export default CreateAccount;
