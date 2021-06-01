import { useState } from 'react';
import { HiExclamationCircle } from 'react-icons/hi';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';

import { firestore, auth } from 'setupFirebase';

type SignInFormType = {
  [name: string]: string;
  email: string;
  password: string;
};

const defaultSignInFormValues = {
  email: '',
  password: '',
};

const defaultSignInFormErrorValues = {
  email: '',
  password: '',
};

export function UserSignInPageSignInForm() {
  const [signInFormValues, setSignInFormValues] = useState<SignInFormType>(
    defaultSignInFormValues
  );
  const [signInFormErrorValues, setSignInFormErrorValues] = useState<
    SignInFormType
  >(defaultSignInFormErrorValues);
  const history = useHistory();

  function checkEmptyFormValues(
    formValues: SignInFormType,
    errors: SignInFormType
  ) {
    for (const name in formValues) {
      if (!formValues[name]) {
        errors[name] = 'Please fill out field';
      }
    }
  }

  function checkValidEmail(formValues: SignInFormType, errors: SignInFormType) {
    if (formValues.email) {
      if (!validator.isEmail(formValues.email)) {
        errors.email = 'Please provide a valid email';
      }
    }
  }

  function formHasErrors(errors: SignInFormType) {
    const formErrorValues = Object.values(errors).filter(
      (val) => val.length > 0
    );

    return formErrorValues.length > 0;
  }

  async function trySigningIn(
    formValues: SignInFormType,
    errors: SignInFormType
  ) {
    if (!formHasErrors(errors)) {
      try {
        // if the email and password are both valid, then try to sign in and return the user info
        const { user } = await auth.signInWithEmailAndPassword(
          formValues.email,
          formValues.password
        );

        // if a user is signed in successfully, grab the user info from the database and store in local storage
        if (user) {
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
        if (error.code === 'auth/invalid-email') {
          errors.email = 'Please provide a valid email';
        } else if (error.code === 'auth/wrong-password') {
          errors.password = 'Incorrect password';
        } else if (error.code === 'auth/user-not-found') {
          errors.email = 'An account does not exist with the provided email';
        }
      }
    }

    setSignInFormErrorValues((prevState) => ({
      ...prevState,
      ...errors,
    }));
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const signInFormErrors = {
      ...defaultSignInFormErrorValues,
    };

    checkEmptyFormValues(signInFormValues, signInFormErrors);

    checkValidEmail(signInFormValues, signInFormErrors);

    trySigningIn(signInFormValues, signInFormErrors);
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

    setSignInFormValues((prevState) => ({
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
          Sign in to your account
        </h2>
      </div>

      <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleFormSubmit}>
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
                  className={renderInputStyles(signInFormErrorValues.email)}
                  aria-invalid='true'
                  aria-describedby='email_error'
                  autoComplete='email'
                  value={signInFormValues.email}
                  onChange={handleInputChange}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  {signInFormErrorValues.email && (
                    <HiExclamationCircle
                      className='h-5 w-5 text-red-500'
                      aria-hidden='true'
                    />
                  )}
                </div>
              </div>
              <p className='mt-2 text-sm text-red-600' id='email_error'>
                {signInFormErrorValues.email}
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
                  className={renderInputStyles(signInFormErrorValues.password)}
                  aria-invalid='true'
                  aria-describedby='password_error'
                  autoComplete='current-password'
                  value={signInFormValues.password}
                  onChange={handleInputChange}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  {signInFormErrorValues.password && (
                    <HiExclamationCircle
                      className='h-5 w-5 text-red-500'
                      aria-hidden='true'
                    />
                  )}
                </div>
              </div>
              <p className='mt-2 text-sm text-red-600' id='password_error'>
                {signInFormErrorValues.password}
              </p>
            </div>

            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
