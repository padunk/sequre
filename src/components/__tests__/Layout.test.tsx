import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../Layout';

const renderWithRouter = (children: React.ReactNode) => {
  return render(
    <MemoryRouter>
      <Layout>{children}</Layout>
    </MemoryRouter>
  );
};

describe('Layout Component', () => {
  test('renders header with title', () => {
    renderWithRouter(<div>Test Content</div>);

    expect(screen.getByText('🔒 Secure QR Generator')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderWithRouter(<div>Test Content</div>);

    expect(screen.getByText('Generate QR')).toBeInTheDocument();
    expect(screen.getByText('Scan QR')).toBeInTheDocument();
  });

  test('renders children content', () => {
    renderWithRouter(<div>Test Content</div>);

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders footer', () => {
    renderWithRouter(<div>Test Content</div>);

    expect(screen.getByText(/© 2024 Secure QR Generator/)).toBeInTheDocument();
  });
});
