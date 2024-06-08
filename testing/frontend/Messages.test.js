// frontend/tests/Message.test.js

import React from 'react';
import { render } from '@testing-library/react';
import Message from '../../frontend/src/components/messages/Message';

// Mock the useAuthContext hook
jest.mock('../src/context/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({ authUser: { _id: '1', pic: 'profile.jpg' } })),
}));

// Mock the extractTime function
jest.mock('../utils/extractTime', () => ({
  extractTime: jest.fn(() => '12:00 PM'), // Mock the return value here
}));

describe('Message Component', () => {
  const message = {
    sender: { _id: '1', pic: 'profile.jpg' },
    content: 'Hello, this is a test message.',
    createdAt: new Date('2024-06-07T12:00:00Z'),
    shouldShake: false,
  };

  test('renders message with correct content and time', () => {
    const { getByText, getByAltText } = render(<Message message={message} />);

    // Test message content
    expect(getByText('Hello, this is a test message.')).toBeInTheDocument();

    // Test message time
    expect(getByText('12:00 PM')).toBeInTheDocument();

    // Test message profile picture
    expect(getByAltText('Tailwind CSS chat bubble component')).toHaveAttribute('src', 'profile.jpg');
  });

  // Add other test cases...
});
