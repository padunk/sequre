Create a secure web application for converting text to QR codes with encryption capabilities.

Requirements:

1. User Interface:

   - Text input area for pasting content
   - Clear button to reset input
   - Generate QR code button
   - Download QR code option
   - Decrypt QR code button

2. Text to QR Code Conversion:

   - Support UTF-8 text encoding
   - Handle maximum 1000 characters
   - Generate high-resolution QR codes (min 300x300px)
   - Apply error correction level H for reliability

3. Encryption Features:

   - Implement AES-256 encryption for text data
   - Secure key generation and management
   - Salt usage for enhanced security
   - Display encryption status indicator

4. Decryption Features:

   - QR code scanner/upload capability
   - Automatic detection of encrypted content
   - Secure key input for decryption
   - Display decrypted text in a secure manner

5. Security Requirements:

   - Client-side encryption/decryption only
   - No data storage on server
   - Secure parameter passing
   - Input sanitization

6. Error Handling:
   - Validate input length and characters
   - Show clear error messages
   - Handle failed encryption/decryption attempts
   - Provide user feedback for all operations

Technical Constraints:

- Use modern web standards (HTML5, CSS3, ES6+)
- Ensure cross-browser compatibility
- Implement responsive design
- Follow OWASP security guidelines
- Add proper documentation
