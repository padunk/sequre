# Secure QR Code Generator

A secure web application for converting text to QR codes with AES-256 encryption capabilities.

## Features

### 🔐 Security Features

- **AES-256 Encryption**: Client-side encryption using industry-standard AES-256 algorithm
- **Secure Key Generation**: PBKDF2 key derivation with salt for enhanced security
- **No Server Storage**: All encryption/decryption happens client-side
- **Input Sanitization**: Prevents XSS and other security vulnerabilities
- **OWASP Compliance**: Follows OWASP security guidelines

### 📱 User Interface

- **Modern Responsive Design**: Works on desktop, tablet, and mobile devices
- **Intuitive Interface**: Easy-to-use form with clear visual feedback
- **Character Counter**: Real-time character count with visual warnings
- **Drag & Drop**: Convenient QR code image upload via drag and drop
- **Download Feature**: Save generated QR codes as high-resolution PNG files

### 🔄 QR Code Features

- **High Resolution**: Generates 400x400 pixel QR codes
- **Error Correction Level H**: Maximum reliability and damage resistance
- **UTF-8 Support**: Full Unicode character support
- **Maximum 1000 Characters**: Optimized for practical use cases

### 🔓 Decryption Features

- **QR Scanner**: Upload and automatically decode QR code images
- **Encrypted Content Detection**: Automatically detects encrypted vs plain text
- **Secure Decryption**: Client-side decryption with user-provided keys
- **Copy to Clipboard**: Easy copying of decrypted content

## Technical Implementation

### Dependencies

- **QRious**: QR code generation library
- **CryptoJS**: Cryptographic functions for AES-256 encryption
- **jsQR**: QR code scanning and decoding

### Security Architecture

1. **Client-Side Only**: No data is sent to any server
2. **Key Derivation**: Uses PBKDF2 with 10,000 iterations
3. **Random IV**: Each encryption uses a unique initialization vector
4. **Salt Usage**: Prevents rainbow table attacks
5. **Secure Random**: Uses cryptographically secure random number generation

### Browser Compatibility

- Modern browsers with ES6+ support
- WebCrypto API support recommended
- Canvas API for QR code generation
- File API for image upload

## Usage

### Basic QR Code Generation

1. Enter text in the input field (up to 1000 characters)
2. Click "Generate QR Code"
3. Download the generated QR code if needed

### Encrypted QR Code Generation

1. Enter text in the input field
2. Check "Enable AES-256 Encryption"
3. Optionally enter a custom encryption key (leave blank for auto-generation)
4. Click "Generate QR Code"
5. **Important**: Save the encryption key if auto-generated

### QR Code Decryption

1. Click or drag & drop a QR code image to the upload area
2. If encrypted, enter the decryption key
3. Click "Decrypt Content" to view the original text
4. Copy the result to clipboard if needed

## Security Considerations

### Best Practices

- Always use strong, unique encryption keys
- Store encryption keys securely and separately from QR codes
- Verify QR code sources before scanning
- Use encrypted QR codes for sensitive information

### Limitations

- Encryption keys are not recoverable if lost
- QR code capacity decreases with encryption overhead
- Requires JavaScript-enabled browser

## Installation

### Local Development

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. No build process or server required

### Web Deployment

1. Upload all files to a web server
2. Serve over HTTPS for enhanced security
3. Configure CSP headers for additional protection

## File Structure

```
/
├── index.html          # Main application file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript application logic
└── README.md          # Documentation
```

## Security Features Implementation

### Input Validation

```javascript
validateAndSanitizeInput(text) {
    // Length validation
    // Script tag removal
    // Whitespace normalization
    // Empty content check
}
```

### Encryption Process

```javascript
encryptText(text, keyData) {
    // Generate random IV
    // AES-256-CBC encryption
    // Combine IV, salt, and encrypted data
    // Return JSON-encoded result
}
```

### Key Generation

```javascript
generateSecureKey(password) {
    // PBKDF2 key derivation
    // 256-bit salt generation
    // 10,000 iterations
    // Return key and salt objects
}
```

## Browser Support

| Browser | Version | Support |
| ------- | ------- | ------- |
| Chrome  | 60+     | ✅ Full |
| Firefox | 60+     | ✅ Full |
| Safari  | 12+     | ✅ Full |
| Edge    | 79+     | ✅ Full |

## Contributing

This project follows security best practices. When contributing:

1. Maintain client-side only architecture
2. Follow OWASP security guidelines
3. Test across multiple browsers
4. Validate all user inputs
5. Use secure cryptographic practices

## License

MIT License - see LICENSE file for details.

## Disclaimer

This application is provided for educational and general use purposes. Users are responsible for:

- Securing their encryption keys
- Validating QR code sources
- Complying with applicable laws and regulations
- Understanding the security implications of their usage

Always test thoroughly with your specific use cases and security requirements.
