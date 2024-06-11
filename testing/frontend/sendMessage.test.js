import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MessageInput from '../../frontend/src/components/messages/MessageInput';
import useSendMessage from '../../frontend/src/hooks/useSendMessage';

// Mock the useSendMessage hook
jest.mock('../../frontend/src/hooks/useSendMessage', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    loading: false,
    sendMessage: jest.fn(),
  })),
}));

describe('MessageInput component', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  test('renders the input and submit button', () => {
    render(<MessageInput />);
    const inputElement = screen.getByPlaceholderText('Send a Message');
    const submitButton = screen.getByRole('button');

    expect(inputElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('sends a message when form is submitted', async () => {
    const mockSendMessage = useSendMessage().sendMessage;
    render(<MessageInput />);
    const inputElement = screen.getByPlaceholderText('Send a Message');
    const submitButton = screen.getByRole('button');
    const message = 'Hello, World!';

    // Enter a message in the input
    fireEvent.change(inputElement, { target: { value: message } });

    // Submit the form
    fireEvent.click(submitButton);

    // Wait for the sendMessage function to be called
    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith(message);
    });
  });

  test('does not send a message when form is submitted with empty input', async () => {
    const mockSendMessage = useSendMessage().sendMessage;
    render(<MessageInput />);
    const submitButton = screen.getByRole('button');

    // Submit the form with empty input
    fireEvent.click(submitButton);

    // Ensure sendMessage function is not called
    await waitFor(() => {
      expect(mockSendMessage).not.toHaveBeenCalled();
    });
  });
});
