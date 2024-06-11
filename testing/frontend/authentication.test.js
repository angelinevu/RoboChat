import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AuthContextProvider } from '../../frontend/src/context/AuthContext';
import Login from '../../frontend/src/pages/login/Login';

describe('Authentication', () => {
  test('User can login successfully', async () => {
    const { getByLabelText, getByText } = render(
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
    );

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Sign in');

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const welcomeMessage = getByText('Welcome, fullname');
      expect(welcomeMessage).toBeInTheDocument();
    });
  });

  test('User sees error message with invalid credentials', async () => {
    const { getByLabelText, getByText } = render(
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
    );

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Sign in');

    fireEvent.change(usernameInput, { target: { value: 'invalidusername' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = getByText('Invalid Credentials');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
