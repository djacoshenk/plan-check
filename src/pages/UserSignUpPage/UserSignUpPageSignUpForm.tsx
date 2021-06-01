import { useState } from 'react';
import { HiExclamationCircle } from 'react-icons/hi';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';

import { firestore, auth } from 'setupFirebase';

type SignUpFormType = {
  [name: string]: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const defaultSignUpFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
};

const defaultSignUpFormErrorValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
};

export function UserSignUpPageSignUpForm() {
  const [signUpFormValues, setSignUpFormValues] = useState<SignUpFormType>(
    defaultSignUpFormValues
  );
  const [signUpFormErrorValues, setSignUpFormErrorValues] = useState<
    SignUpFormType
  >(defaultSignUpFormErrorValues);
  const history = useHistory();

  function checkEmptyFormValues(errors: SignUpFormType) {
    for (const name in signUpFormValues) {
      if (!signUpFormValues[name]) {
        errors[name] = 'Please fill out field';
      }
    }
  }

  function checkValidEmail(formValues: SignUpFormType, errors: SignUpFormType) {
    if (formValues.email) {
      if (!validator.isEmail(formValues.email)) {
        errors.email = 'Please provide a valid email';
      }
    }
  }

  function checkPasswordsMatch(
    formValues: SignUpFormType,
    errors: SignUpFormType
  ) {
    if (formValues.password && formValues.confirm_password) {
      if (formValues.password !== formValues.confirm_password) {
        errors.password = "Passwords don't match";
        errors.confirm_password = "Passwords don't match";
      }
    }
  }

  function checkStrongPassword(
    formValues: SignUpFormType,
    errors: SignUpFormType
  ) {
    if (formValues.password) {
      if (
        !validator.isStrongPassword(formValues.password, {
          minLength: 6,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        })
      ) {
        errors.password = 'Password must be a minimum of 6 characters';
      }
    }
  }

  function formHasErrors(errors: SignUpFormType) {
    const formErrorValues = Object.values(errors).filter(
      (val) => val.length > 0
    );

    return formErrorValues.length > 0;
  }

  async function trySigningUp(
    formValues: SignUpFormType,
    errors: SignUpFormType
  ) {
    if (!formHasErrors(errors)) {
      try {
        // if there are no errors and the email and password are both valid, then try to create a user and return the user data
        const { user } = await auth.createUserWithEmailAndPassword(
          formValues.email,
          formValues.password
        );

        // if a user is created, grab the user data and set the user info in the database
        if (user) {
          const { first_name, last_name, email } = formValues;

          await firestore.collection('users').doc(user.uid).set({
            uid: user.uid,
            first_name,
            last_name,
            email,
          });

          // if the user is stored and authenticated, get the user data and save it to local storage
          auth.onAuthStateChanged(async (user) => {
            if (user) {
              const snapshot = await firestore
                .collection('users')
                .doc(user.uid)
                .get();

              const data = snapshot.data();

              if (data) {
                localStorage.setItem('current_user', JSON.stringify(data));
              }
            }
          });

          history.push(`/user/${user.uid}`);
        }
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          errors.email = 'A user already exists with this email';
        }
      }
    }

    setSignUpFormErrorValues((prevState) => ({
      ...prevState,
      ...errors,
    }));
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const signUpFormErrors = {
      ...defaultSignUpFormErrorValues,
    };

    checkEmptyFormValues(signUpFormErrors);

    checkValidEmail(signUpFormValues, signUpFormErrors);

    checkPasswordsMatch(signUpFormValues, signUpFormErrors);

    checkStrongPassword(signUpFormValues, signUpFormErrors);

    trySigningUp(signUpFormValues, signUpFormErrors);
  }

  function renderInputStyles(error: string) {
    if (error) {
      return 'block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md';
    } else {
      return 'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md';
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;

    setSignUpFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Link to='/'>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
        </Link>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Create your account
        </h2>
      </div>

      <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleFormSubmit}>
            <div>
              <label
                htmlFor='first_name'
                className='block text-sm font-medium text-gray-700'
              >
                First name
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='text'
                  name='first_name'
                  id='first_name'
                  className={renderInputStyles(
                    signUpFormErrorValues.first_name
                  )}
                  aria-invalid='true'
                  aria-describedby='first_name_error'
                  value={signUpFormValues.first_name}
                  onChange={handleInputChange}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  {signUpFormErrorValues.first_name && (
                    <HiExclamationCircle
                      className='h-5 w-5 text-red-500'
                      aria-hidden='true'
                    />
                  )}
                </div>
              </div>
              <p className='mt-2 text-sm text-red-600' id='first_name_error'>
                {signUpFormErrorValues.first_name}
              </p>
            </div>

            <div>
              <label
                htmlFor='last_name'
                className='block text-sm font-medium text-gray-700'
              >
                Last name
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='text'
                  name='last_name'
                  id='last_name'
                  className={renderInputStyles(signUpFormErrorValues.last_name)}
                  aria-invalid='true'
                  aria-describedby='last_name_error'
                  value={signUpFormValues.last_name}
                  onChange={handleInputChange}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  {signUpFormErrorValues.last_name && (
                    <HiExclamationCircle
                      className='h-5 w-5 text-red-500'
                      aria-hidden='true'
                    />
                  )}
                </div>
              </div>
              <p className='mt-2 text-sm text-red-600' id='last_name_error'>
                {signUpFormErrorValues.last_name}
              </p>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email address
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='text'
                  name='email'
                  id='email'
                  className={renderInputStyles(signUpFormErrorValues.email)}
                  aria-invalid='true'
                  aria-describedby='email_error'
                  value={signUpFormValues.email}
                  onChange={handleInputChange}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  {signUpFormErrorValues.email && (
                    <HiExclamationCircle
                      className='h-5 w-5 text-red-500'
                      aria-hidden='true'
                    />
                  )}
                </div>
              </div>
              <p className='mt-2 text-sm text-red-600' id='email_error'>
                {signUpFormErrorValues.email}
              </p>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className={renderInputStyles(signUpFormErrorValues.password)}
                  aria-invalid='true'
                  aria-describedby='password_error'
                  autoComplete='new-password'
                  value={signUpFormValues.password}
                  onChange={handleInputChange}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  {signUpFormErrorValues.password && (
                    <HiExclamationCircle
                      className='h-5 w-5 text-red-500'
                      aria-hidden='true'
                    />
                  )}
                </div>
              </div>
              <p className='mt-2 text-sm text-red-600' id='password_error'>
                {signUpFormErrorValues.password}
              </p>
            </div>

            <div>
              <label
                htmlFor='confirm_password'
                className='block text-sm font-medium text-gray-700'
              >
                Confirm password
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='password'
                  name='confirm_password'
                  id='confirm_password'
                  className={renderInputStyles(
                    signUpFormErrorValues.confirm_password
                  )}
                  aria-invalid='true'
                  aria-describedby='confirm_password_error'
                  autoComplete='new-password'
                  value={signUpFormValues.confirm_password}
                  onChange={handleInputChange}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  {signUpFormErrorValues.confirm_password && (
                    <HiExclamationCircle
                      className='h-5 w-5 text-red-500'
                      aria-hidden='true'
                    />
                  )}
                </div>
              </div>
              <p
                className='mt-2 text-sm text-red-600'
                id='confirm_password_error'
              >
                {signUpFormErrorValues.confirm_password}
              </p>
            </div>

            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
