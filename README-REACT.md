# Secure QR Generator - React Edition

A modern, secure web application for generating and scanning QR codes with AES-256 encryption capabilities. Now built with React, TypeScript, and Vite.

## 🚀 Migration from Vanilla JS to React

This application has been successfully migrated from vanilla JavaScript to a modern React Single Page Application (SPA) using:

- **React 19** - Latest React with modern hooks and patterns
- **TypeScript** - Type safety and enhanced developer experience
- **Vite 6.x** - Fast build tool and development server
- **React Router** - Client-side routing for seamless navigation
- **Modern CSS** - Responsive design with CSS Grid and Flexbox

## ✨ Features

- 🔐 **AES-256 Encryption** - Secure your QR codes with password protection
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Beautiful gradient design with glassmorphism effects
- 📸 **QR Code Scanning** - Upload or drag & drop images to scan QR codes
- 💾 **Download & Copy** - Save QR codes as PNG or copy to clipboard
- ⚡ **Fast Performance** - Optimized with Vite and modern React patterns
- 🧪 **Testing Ready** - Jest and React Testing Library setup included

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI framework
- **TypeScript** - Type safety
- **React Router** - Routing
- **CSS3** - Styling with modern features

### Build & Development

- **Vite 6.x** - Build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Libraries

- **QRious** - QR code generation
- **CryptoJS** - AES-256 encryption
- **jsQR** - QR code scanning

### Testing

- **Jest** - Test runner
- **React Testing Library** - Component testing
- **@testing-library/jest-dom** - Custom Jest matchers

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Layout.tsx       # Main layout component
│   ├── GenerateQR.tsx   # QR generation component
│   ├── ScanQR.tsx      # QR scanning component
│   └── *.css           # Component styles
├── utils/              # Utility functions
│   ├── qrUtils.ts      # QR code generation utilities
│   ├── cryptoUtils.ts  # Encryption/decryption utilities
│   └── scanUtils.ts    # QR scanning utilities
├── App.tsx             # Main app component
├── main.tsx           # React entry point
└── index.css          # Global styles
```

## 🔄 Migration Key Changes

### Architecture

- **Component-based** - Modular React components replacing vanilla JS modules
- **Type Safety** - Full TypeScript implementation with proper type definitions
- **Modern State Management** - React hooks instead of global variables
- **Client-side Routing** - React Router for seamless navigation

### Development Experience

- **Hot Module Replacement** - Instant updates during development
- **Modern DevTools** - React DevTools, TypeScript IntelliSense
- **Testing Infrastructure** - Comprehensive testing setup
- **Code Quality** - ESLint and Prettier for consistent code style

### Performance

- **Tree Shaking** - Automatic dead code elimination
- **Code Splitting** - Optimized bundle sizes
- **Modern JavaScript** - ES2020+ features with proper transpilation

## 🔧 Development

### Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## 🧪 Testing

The project includes a comprehensive testing setup:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage
```

## 📱 Progressive Web App (PWA)

The application includes PWA capabilities with:

- Service worker for offline functionality
- App manifest for "Add to Home Screen"
- Optimized for mobile devices

## 🔒 Security Features

- **AES-256 Encryption** - Industry-standard encryption
- **Client-side Processing** - No data sent to external servers
- **Input Validation** - Proper sanitization and validation
- **Secure Defaults** - Security-first approach to all features

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Run the test suite
6. Submit a pull request

---

**Note**: This is a complete rewrite of the original vanilla JavaScript application using modern React patterns and best practices. The core functionality remains the same while providing a significantly improved developer and user experience.
