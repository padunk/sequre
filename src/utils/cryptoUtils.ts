import CryptoJS from 'crypto-js';

export const encryptText = (text: string, password: string): string => {
  try {
    const encrypted = CryptoJS.AES.encrypt(text, password).toString();
    return `ENCRYPTED:${encrypted}`;
  } catch (error) {
    throw new Error('Encryption failed');
  }
};

export const decryptText = (
  encryptedText: string,
  password: string
): string => {
  try {
    // Check if the text is encrypted
    if (!encryptedText.startsWith('ENCRYPTED:')) {
      return encryptedText; // Not encrypted, return as is
    }

    const encryptedData = encryptedText.replace('ENCRYPTED:', '');
    const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

    if (!plaintext) {
      throw new Error('Invalid password');
    }

    return plaintext;
  } catch (error) {
    throw new Error('Decryption failed. Please check your password.');
  }
};

export const isEncrypted = (text: string): boolean => {
  return text.startsWith('ENCRYPTED:');
};
