import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="layout">
      <header className="header">
        <h1>🔒 Secure QR Generator</h1>
        <nav className="nav">
          <Link
            to="/generate"
            className={`nav-link ${location.pathname === '/' || location.pathname === '/generate' ? 'active' : ''}`}
          >
            Generate QR
          </Link>
          <Link
            to="/scan"
            className={`nav-link ${location.pathname === '/scan' ? 'active' : ''}`}
          >
            Scan QR
          </Link>
        </nav>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <p>&copy; 2024 Secure QR Generator. Built with ❤️ for security.</p>
      </footer>
    </div>
  );
};

export default Layout;
