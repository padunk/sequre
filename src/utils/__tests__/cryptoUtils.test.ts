import { encryptText, decryptText, isEncrypted } from '../cryptoUtils';

describe('cryptoUtils', () => {
  const testText = 'Hello, World!';
  const testPassword = 'mySecretPassword123';

  describe('encryptText', () => {
    test('encrypts text with password', () => {
      const encrypted = encryptText(testText, testPassword);

      expect(encrypted).toContain('ENCRYPTED:');
      expect(encrypted).not.toBe(testText);
    });

    test('produces different results for different passwords', () => {
      const encrypted1 = encryptText(testText, 'password1');
      const encrypted2 = encryptText(testText, 'password2');

      expect(encrypted1).not.toBe(encrypted2);
    });
  });

  describe('decryptText', () => {
    test('decrypts encrypted text with correct password', () => {
      const encrypted = encryptText(testText, testPassword);
      const decrypted = decryptText(encrypted, testPassword);

      expect(decrypted).toBe(testText);
    });

    test('returns original text if not encrypted', () => {
      const plainText = 'This is not encrypted';
      const result = decryptText(plainText, testPassword);

      expect(result).toBe(plainText);
    });

    test('throws error with wrong password', () => {
      const encrypted = encryptText(testText, testPassword);

      expect(() => {
        decryptText(encrypted, 'wrongPassword');
      }).toThrow('Decryption failed');
    });
  });

  describe('isEncrypted', () => {
    test('returns true for encrypted text', () => {
      const encrypted = encryptText(testText, testPassword);

      expect(isEncrypted(encrypted)).toBe(true);
    });

    test('returns false for plain text', () => {
      expect(isEncrypted('Plain text')).toBe(false);
    });

    test('returns false for empty string', () => {
      expect(isEncrypted('')).toBe(false);
    });
  });
});
