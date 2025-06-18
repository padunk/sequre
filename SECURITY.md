# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this application, please report it responsibly:

1. **Do not** create a public GitHub issue
2. Email security concerns to the project maintainer
3. Include detailed information about the vulnerability
4. Allow time for the issue to be addressed before public disclosure

## Security Features

This application implements several security measures:

### Client-Side Security

- All encryption/decryption happens in the browser
- No data is transmitted to external servers
- AES-256 encryption with PBKDF2 key derivation
- Secure random number generation for keys and IVs

### Input Validation

- Maximum character limits enforced
- Script tag sanitization
- Input type validation
- XSS prevention measures

### Cryptographic Standards

- AES-256-CBC encryption
- PBKDF2 with 10,000 iterations
- 256-bit salts for key derivation
- Cryptographically secure random values

## Known Security Considerations

### User Responsibilities

1. **Key Management**: Users are responsible for securely storing encryption keys
2. **QR Code Verification**: Always verify the source of QR codes before scanning
3. **Browser Security**: Use updated browsers with security patches
4. **HTTPS**: Deploy over HTTPS in production environments

### Limitations

1. **Key Recovery**: Lost encryption keys cannot be recovered
2. **Client-Side Exposure**: Encryption keys are visible in browser memory
3. **Physical Security**: QR codes can be photographed or copied
4. **Browser Dependencies**: Relies on browser cryptographic implementations

## Best Practices for Deployment

### Production Environment

1. Serve over HTTPS only
2. Implement Content Security Policy (CSP) headers
3. Use Subresource Integrity (SRI) for external dependencies
4. Regular security audits and updates

### Recommended CSP Header

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'none';
```

## Security Testing

Regular security testing should include:

- Input validation testing
- XSS prevention verification
- Cryptographic implementation review
- Browser compatibility security testing

## Updates and Patches

- Security updates will be prioritized
- Users should update to the latest version promptly
- Monitor the repository for security announcements
