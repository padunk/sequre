import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GenerateQR from '../GenerateQR';

// Mock the utility functions
jest.mock('../../utils/qrUtils', () => ({
  generateQRCode: jest.fn(() =>
    Promise.resolve('data:image/png;base64,mockqr')
  ),
  downloadQRCode: jest.fn(),
  copyToClipboard: jest.fn(() => Promise.resolve()),
}));

jest.mock('../../utils/cryptoUtils', () => ({
  encryptText: jest.fn((text, password) => `ENCRYPTED:${text}-${password}`),
}));

describe('GenerateQR Component', () => {
  test('renders generate form', () => {
    render(<GenerateQR />);

    expect(screen.getByText('Generate QR Code')).toBeInTheDocument();
    expect(screen.getByLabelText('Enter text to encode:')).toBeInTheDocument();
    expect(screen.getByText('Enable AES-256 encryption')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Generate QR Code' })
    ).toBeInTheDocument();
  });

  test('shows error when generating without text', async () => {
    const user = userEvent.setup();
    render(<GenerateQR />);

    const generateButton = screen.getByRole('button', {
      name: 'Generate QR Code',
    });
    await user.click(generateButton);

    expect(
      screen.getByText('Please enter some text to generate QR code')
    ).toBeInTheDocument();
  });

  test('generates QR code with text input', async () => {
    const user = userEvent.setup();
    render(<GenerateQR />);

    const textInput = screen.getByLabelText('Enter text to encode:');
    const generateButton = screen.getByRole('button', {
      name: 'Generate QR Code',
    });

    await user.type(textInput, 'Hello World');
    await user.click(generateButton);

    await waitFor(() => {
      expect(screen.getByAltText('Generated QR Code')).toBeInTheDocument();
    });
  });

  test('shows password input when encryption is enabled', async () => {
    const user = userEvent.setup();
    render(<GenerateQR />);

    const encryptionCheckbox = screen.getByRole('checkbox');
    await user.click(encryptionCheckbox);

    expect(screen.getByLabelText('Encryption password:')).toBeInTheDocument();
  });

  test('shows error when encryption enabled but no password provided', async () => {
    const user = userEvent.setup();
    render(<GenerateQR />);

    const textInput = screen.getByLabelText('Enter text to encode:');
    const encryptionCheckbox = screen.getByRole('checkbox');
    const generateButton = screen.getByRole('button', {
      name: 'Generate QR Code',
    });

    await user.type(textInput, 'Hello World');
    await user.click(encryptionCheckbox);
    await user.click(generateButton);

    expect(
      screen.getByText('Please enter a password for encryption')
    ).toBeInTheDocument();
  });
});
