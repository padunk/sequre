import React, { useState, useRef, useCallback } from 'react';
import {
  generateQRCode,
  downloadQRCode,
  copyToClipboard,
} from '../utils/qrUtils';
import { encryptText } from '../utils/cryptoUtils';
import './GenerateQR.css';

const GenerateQR: React.FC = () => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [useEncryption, setUseEncryption] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = useCallback(async () => {
    if (!text.trim()) {
      setError('Please enter some text to generate QR code');
      return;
    }

    if (useEncryption && !password.trim()) {
      setError('Please enter a password for encryption');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let textToEncode = text;

      if (useEncryption) {
        textToEncode = encryptText(text, password);
      }

      const qrDataUrl = await generateQRCode(textToEncode, canvasRef.current);
      setQrCode(qrDataUrl);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
      console.error('QR generation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [text, password, useEncryption]);

  const handleDownload = useCallback(() => {
    if (qrCode) {
      downloadQRCode(qrCode, 'secure-qr-code.png');
    }
  }, [qrCode]);

  const handleCopy = useCallback(async () => {
    if (qrCode) {
      try {
        await copyToClipboard(qrCode);
        // You could add a toast notification here
      } catch (err) {
        setError('Failed to copy to clipboard');
      }
    }
  }, [qrCode]);

  return (
    <div className="generate-qr">
      <div className="card">
        <h2>Generate QR Code</h2>

        <div className="input-section">
          <div className="form-group">
            <label htmlFor="text-input">Enter text to encode:</label>
            <textarea
              id="text-input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter your text here..."
              rows={4}
              className="text-input"
            />
          </div>

          <div className="encryption-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useEncryption}
                onChange={e => setUseEncryption(e.target.checked)}
              />
              <span className="checkmark"></span>
              Enable AES-256 encryption
            </label>

            {useEncryption && (
              <div className="password-section">
                <label htmlFor="password-input">Encryption password:</label>
                <input
                  type="password"
                  id="password-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter a strong password"
                  className="password-input"
                />
                <small>Password will be required to decrypt the QR code</small>
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? 'Generating...' : 'Generate QR Code'}
          </button>
        </div>

        <div className="output-section">
          <div className="qr-container">
            <canvas ref={canvasRef} className="qr-canvas" />
            {qrCode && (
              <img src={qrCode} alt="Generated QR Code" className="qr-image" />
            )}
          </div>

          {qrCode && (
            <div className="actions">
              <button onClick={handleDownload} className="btn btn-secondary">
                Download QR Code
              </button>
              <button onClick={handleCopy} className="btn btn-secondary">
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateQR;
