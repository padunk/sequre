import React, { useState, useRef, useCallback } from 'react';
import { scanQRCode } from '../utils/scanUtils';
import { decryptText, isEncrypted } from '../utils/cryptoUtils';
import './ScanQR.css';

const ScanQR: React.FC = () => {
  const [scannedText, setScannedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [decryptPassword, setDecryptPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDecryption, setShowDecryption] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    setIsLoading(true);
    setError('');
    setScannedText('');
    setDecryptedText('');
    setShowDecryption(false);

    try {
      const result = await scanQRCode(file);
      setScannedText(result);

      if (isEncrypted(result)) {
        setShowDecryption(true);
      }
    } catch (err) {
      setError('Failed to scan QR code. Please try with a different image.');
      console.error('QR scanning error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFileInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDecrypt = useCallback(() => {
    if (!decryptPassword.trim()) {
      setError('Please enter the decryption password');
      return;
    }

    try {
      const decrypted = decryptText(scannedText, decryptPassword);
      setDecryptedText(decrypted);
      setError('');
    } catch (err) {
      setError('Decryption failed. Please check your password.');
    }
  }, [scannedText, decryptPassword]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="scan-qr">
      <div className="card">
        <h2>Scan QR Code</h2>

        <div
          className={`upload-area ${isLoading ? 'loading' : ''}`}
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="upload-content">
            <div className="upload-icon">📷</div>
            <p>Click to select QR code image or drag & drop</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
          </div>
          {isLoading && <div className="loading-spinner">Scanning...</div>}
        </div>

        {error && <div className="error-message">{error}</div>}

        {scannedText && (
          <div className="scan-result">
            <h3>Scan Result:</h3>
            <div className="scanned-content">
              {isEncrypted(scannedText) ? (
                <div className="encrypted-indicator">
                  🔒 Encrypted content detected
                </div>
              ) : (
                <div className="content-text">{scannedText}</div>
              )}
            </div>

            {showDecryption && (
              <div className="decryption-section">
                <label htmlFor="decrypt-password">Decryption password:</label>
                <div className="decrypt-input-group">
                  <input
                    type="password"
                    id="decrypt-password"
                    value={decryptPassword}
                    onChange={e => setDecryptPassword(e.target.value)}
                    placeholder="Enter the password used for encryption"
                    className="decrypt-input"
                    onKeyPress={e => e.key === 'Enter' && handleDecrypt()}
                  />
                  <button onClick={handleDecrypt} className="btn btn-primary">
                    Decrypt
                  </button>
                </div>
              </div>
            )}

            {decryptedText && (
              <div className="decrypted-content">
                <h4>Decrypted Content:</h4>
                <div className="content-text">{decryptedText}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanQR;
