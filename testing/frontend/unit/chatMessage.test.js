import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MessageInput from '../../../frontend/src/components/messages/MessageInput';
import useSendMessage from '../../../frontend/src/hooks/useSendMessage';

// Mock the useSendMessage hook
jest.mock('../../../frontend/src/hooks/useSendMessage', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    loading: false,
    sendMessage: jest.fn(),
  })),
}));

describe('MessageInput component', () => {
  test('renders the input and submit button', () => {
    const { getByPlaceholderText, getByText } = render(<MessageInput />);
    const inputElement = getByPlaceholderText('Send a Message');
    const submitButton = getByText('Send');

    expect(inputElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('sends a message when form is submitted', async () => {
    const { getByPlaceholderText, getByText } = render(<MessageInput />);
    const inputElement = getByPlaceholderText('Send a Message');
    const submitButton = getByText('Send');
    const message = 'Hello, World!';

    // Enter a message in the input
    fireEvent.change(inputElement, { target: { value: message } });

    // Submit the form
    fireEvent.click(submitButton);

    // Wait for the sendMessage function to be called
    await waitFor(() => {
      expect(useSendMessage().sendMessage).toHaveBeenCalledWith(message);
    });
  });

  test('does not send a message when form is submitted with empty input', async () => {
    const { getByText } = render(<MessageInput />);
    const submitButton = getByText('Send');

    // Submit the form with empty input
    fireEvent.click(submitButton);

    // Ensure sendMessage function is not called
    await waitFor(() => {
      expect(useSendMessage().sendMessage).not.toHaveBeenCalled();
    });
  });
});
