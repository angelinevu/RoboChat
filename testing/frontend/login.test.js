// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import App from '../../frontend/src/App';
// import { AuthProvider } from './contexts/AuthContext';

// test('renders login page when not logged in', () => {
//   const { getByText } = render(<App />);
//   const loginButton = getByText(/login/i);
//   expect(loginButton).toBeInTheDocument();
// });

// test('renders chat room when logged in', () => {
//   const { getByText } = render(
//     <AuthProvider isAuthenticated={true}>
//       <App />
//     </AuthProvider>
//   );
//   const chatRoomTitle = getByText(/chat room/i);
//   expect(chatRoomTitle).toBeInTheDocument();
// });

// test('redirects to login page when accessing protected route while not logged in', () => {
//   const { history } = render(
//     <AuthProvider isAuthenticated={false}>
//       <App />
//     </AuthProvider>
//   );
//   expect(history.location.pathname).toBe('/login');
// });

// // Additional test cases for user authentication
