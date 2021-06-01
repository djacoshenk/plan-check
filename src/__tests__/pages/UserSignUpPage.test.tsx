import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { axe } from 'jest-axe';
import { when, resetAllWhenMocks } from 'jest-when';
import { BrowserRouter, Router } from 'react-router-dom';

import { auth, firestore } from 'setupFirebase';
import { fakeUserSignUpData } from '__tests__/fixtures/fakeUserSignUpData';
import { UserSignUpPage } from 'pages/UserSignUpPage/UserSignUpPage';

jest.mock('setupFirebase');

const mockedFirebaseAuth = auth as jest.Mocked<typeof auth>;
const mockedFirestore = firestore as jest.Mocked<typeof firestore>;

beforeEach(() => {
  resetAllWhenMocks();
});

describe('a11y violations', () => {
  test('if page has any a11y violations', async () => {
    const { container } = render(
      <BrowserRouter>
        <UserSignUpPage />
      </BrowserRouter>
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});

describe('error states', () => {
  test('if user submits form with empty fields', () => {
    render(
      <BrowserRouter>
        <UserSignUpPage />
      </BrowserRouter>
    );

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getAllByText(/please fill out field/i)).toHaveLength(5);
  });

  test('if user submits form with some empty fields', () => {
    render(
      <BrowserRouter>
        <UserSignUpPage />
      </BrowserRouter>
    );

    userEvent.type(
      screen.getByRole('textbox', { name: /first name/i }),
      fakeUserSignUpData.first_name
    );

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getAllByText(/please fill out field/i)).toHaveLength(4);

    userEvent.type(
      screen.getByRole('textbox', { name: /last name/i }),
      fakeUserSignUpData.last_name
    );

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getAllByText(/please fill out field/i)).toHaveLength(3);

    userEvent.type(
      screen.getByRole('textbox', { name: /email/i }),
      fakeUserSignUpData.email
    );

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getAllByText(/please fill out field/i)).toHaveLength(2);

    userEvent.type(
      screen.getByLabelText(/^password/i),
      fakeUserSignUpData.password
    );

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getAllByText(/please fill out field/i)).toHaveLength(1);
  });

  test('if user submits form with invalid email address', () => {
    render(
      <BrowserRouter>
        <UserSignUpPage />
      </BrowserRouter>
    );

    userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'daniel');

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      screen.getByText(/please provide a valid email/i)
    ).toBeInTheDocument();
  });

  test('if user submits form with password less than 6 characters in length', () => {
    render(
      <BrowserRouter>
        <UserSignUpPage />
      </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/^password/i), 'pass');

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      screen.getByText(/password must be a minimum of 6 characters/i)
    ).toBeInTheDocument();
  });

  test('if user submits form with non-matching passwords', () => {
    render(
      <BrowserRouter>
        <UserSignUpPage />
      </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/^password/i), 'password');
    userEvent.type(screen.getByLabelText(/^confirm password/i), 'pass');

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getAllByText(/passwords don't match/i)).toHaveLength(2);
  });

  test('if user submits form with previously registered email', async () => {
    when(mockedFirebaseAuth.createUserWithEmailAndPassword)
      .calledWith(fakeUserSignUpData.email, fakeUserSignUpData.password)
      .mockRejectedValue({
        code: 'auth/email-already-in-use',
      });

    render(
      <BrowserRouter>
        <UserSignUpPage />
      </BrowserRouter>
    );

    userEvent.type(
      screen.getByRole('textbox', { name: /first name/i }),
      fakeUserSignUpData.first_name
    );
    userEvent.type(
      screen.getByRole('textbox', { name: /last name/i }),
      fakeUserSignUpData.last_name
    );
    userEvent.type(
      screen.getByRole('textbox', { name: /email/i }),
      fakeUserSignUpData.email
    );
    userEvent.type(
      screen.getByLabelText(/^password/i),
      fakeUserSignUpData.password
    );
    userEvent.type(
      screen.getByLabelText(/^confirm password/i),
      fakeUserSignUpData.confirm_password
    );

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      await screen.findByText(/a user already exists with this email/i)
    ).toBeInTheDocument();
  });
});

describe('golden path', () => {
  test('if user successfully submits form', async () => {
    const history = createMemoryHistory();

    history.push('/signup');

    const fakeFirebaseUserData = {
      user: {
        uid: '3NB3x3aVDNZKBJMpD8fRz1SLN0u2',
      },
    };

    when(mockedFirebaseAuth.createUserWithEmailAndPassword)
      .calledWith(fakeUserSignUpData.email, fakeUserSignUpData.password)
      .mockResolvedValue(fakeFirebaseUserData as any);

    when(mockedFirestore.collection)
      .calledWith('users')
      .mockImplementation(() => {
        return {
          doc: jest.fn().mockImplementation(() => {
            return {
              set: jest.fn(),
            };
          }),
        } as any;
      });

    render(
      <Router history={history}>
        <UserSignUpPage />
      </Router>
    );

    userEvent.type(
      screen.getByRole('textbox', { name: /first name/i }),
      fakeUserSignUpData.first_name
    );
    userEvent.type(
      screen.getByRole('textbox', { name: /last name/i }),
      fakeUserSignUpData.last_name
    );
    userEvent.type(
      screen.getByRole('textbox', { name: /email/i }),
      fakeUserSignUpData.email
    );
    userEvent.type(
      screen.getByLabelText(/^password/i),
      fakeUserSignUpData.password
    );
    userEvent.type(
      screen.getByLabelText(/^confirm password/i),
      fakeUserSignUpData.confirm_password
    );

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(history.location.pathname).toBe(
        `/user/${fakeFirebaseUserData.user.uid}`
      );
    });
  });
});
