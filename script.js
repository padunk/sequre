// Secure QR Code Generator with AES-256 Encryption
// Idea: Abraham A. Agung
// Writer: GitHub Copilot
// License: MIT

class SecureQRGenerator {
  constructor() {
    this.qr = null;
    this.currentEncryptedData = null;
    this.currentKey = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupDragAndDrop();
    this.updateCharCounter();
  }

  setupEventListeners() {
    // Text input events
    document.getElementById("text-input").addEventListener("input", () => {
      this.updateCharCounter();
    });

    // Encryption toggle
    document
      .getElementById("encrypt-toggle")
      .addEventListener("change", (e) => {
        this.toggleEncryption(e.target.checked);
      });

    // Button events
    document.getElementById("generate-btn").addEventListener("click", () => {
      this.generateQRCode();
    });

    document.getElementById("clear-btn").addEventListener("click", () => {
      this.clearAll();
    });

    document.getElementById("download-btn").addEventListener("click", () => {
      this.downloadQRCode();
    });

    // QR Upload events
    document.getElementById("qr-upload").addEventListener("change", (e) => {
      this.handleQRUpload(e.target.files[0]);
    });

    document.getElementById("upload-area").addEventListener("click", () => {
      document.getElementById("qr-upload").click();
    });

    // Decryption events
    document.getElementById("decrypt-btn").addEventListener("click", () => {
      this.decryptQRContent();
    });

    document.getElementById("copy-result-btn").addEventListener("click", () => {
      this.copyResultToClipboard();
    });
  }

  setupDragAndDrop() {
    const uploadArea = document.getElementById("upload-area");

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, this.preventDefaults, false);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      uploadArea.addEventListener(
        eventName,
        () => {
          uploadArea.classList.add("dragover");
        },
        false
      );
    });

    ["dragleave", "drop"].forEach((eventName) => {
      uploadArea.addEventListener(
        eventName,
        () => {
          uploadArea.classList.remove("dragover");
        },
        false
      );
    });

    uploadArea.addEventListener(
      "drop",
      (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          this.handleQRUpload(files[0]);
        }
      },
      false
    );
  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  updateCharCounter() {
    const textInput = document.getElementById("text-input");
    const charCount = document.getElementById("char-count");
    const counter = document.querySelector(".char-counter");

    const length = textInput.value.length;
    charCount.textContent = length;

    // Update counter styling based on character count
    counter.classList.remove("warning", "error");
    if (length > 800) {
      counter.classList.add("error");
    } else if (length > 600) {
      counter.classList.add("warning");
    }
  }

  toggleEncryption(enabled) {
    const encryptionFields = document.getElementById("encryption-fields");
    const encryptionStatus = document.getElementById("encryption-status");
    const statusIndicator = document.getElementById("status-indicator");
    const statusText = document.getElementById("status-text");

    if (enabled) {
      encryptionFields.style.display = "block";
      encryptionStatus.classList.add("enabled");
      statusIndicator.textContent = "🔒";
      statusText.textContent = "Encryption enabled - AES-256";
    } else {
      encryptionFields.style.display = "none";
      encryptionStatus.classList.remove("enabled");
      statusIndicator.textContent = "🔓";
      statusText.textContent = "Encryption disabled";
    }
  }

  // Secure key generation with salt
  generateSecureKey(password = null) {
    if (password) {
      // Use provided password with salt
      const salt = CryptoJS.lib.WordArray.random(256 / 8);
      const key = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32,
        iterations: 10000,
      });
      return { key, salt };
    } else {
      // Generate random key
      const key = CryptoJS.lib.WordArray.random(256 / 8);
      const salt = CryptoJS.lib.WordArray.random(256 / 8);
      return { key, salt };
    }
  }

  // AES-256 encryption
  encryptText(text, keyData) {
    try {
      const iv = CryptoJS.lib.WordArray.random(128 / 8);

      const encrypted = CryptoJS.AES.encrypt(text, keyData.key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      // Combine IV, salt, and encrypted data
      const combined = {
        iv: iv.toString(),
        salt: keyData.salt.toString(),
        data: encrypted.toString(),
        encrypted: true,
      };

      return JSON.stringify(combined);
    } catch (error) {
      throw new Error("Encryption failed: " + error.message);
    }
  }

  // AES-256 decryption
  decryptText(encryptedData, password) {
    try {
      const parsed = JSON.parse(encryptedData);

      if (!parsed.encrypted) {
        throw new Error("Data is not encrypted");
      }

      const iv = CryptoJS.enc.Hex.parse(parsed.iv);
      const salt = CryptoJS.enc.Hex.parse(parsed.salt);

      // Recreate key from password and salt
      const key = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32,
        iterations: 10000,
      });

      const decrypted = CryptoJS.AES.decrypt(parsed.data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

      if (!decryptedText) {
        throw new Error("Invalid decryption key");
      }

      return decryptedText;
    } catch (error) {
      throw new Error("Decryption failed: " + error.message);
    }
  }

  // Input validation and sanitization
  validateAndSanitizeInput(text) {
    if (!text || typeof text !== "string") {
      throw new Error("Please enter some text to convert");
    }

    if (text.length > 1000) {
      throw new Error("Text exceeds maximum length of 1000 characters");
    }

    // Basic sanitization - remove potential script tags and normalize whitespace
    const sanitized = text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/\s+/g, " ")
      .trim();

    if (sanitized.length === 0) {
      throw new Error("Text cannot be empty after sanitization");
    }

    return sanitized;
  }

  async generateQRCode() {
    try {
      const textInput = document.getElementById("text-input");
      const encryptToggle = document.getElementById("encrypt-toggle");
      const encryptionKeyInput = document.getElementById("encryption-key");
      const generateBtn = document.getElementById("generate-btn");

      // Validate input
      const text = this.validateAndSanitizeInput(textInput.value);

      // Show loading state
      generateBtn.disabled = true;
      generateBtn.innerHTML = '<span class="loading"></span>Generating...';

      let qrData = text;
      let keyInfo = "";

      // Handle encryption if enabled
      if (encryptToggle.checked) {
        const password = encryptionKeyInput.value.trim();
        const keyData = this.generateSecureKey(password || null);

        this.currentKey = password || keyData.key.toString();
        qrData = this.encryptText(text, keyData);

        if (!password) {
          keyInfo = `Auto-generated key: ${this.currentKey}`;
          this.showMessage(
            "Key generated! Save this key to decrypt the QR code later.",
            "warning"
          );
        }
      }

      // Generate QR code with high error correction
      this.qr = new QRious({
        element: document.getElementById("qr-canvas"),
        value: qrData,
        size: 400,
        level: "H", // High error correction
        background: "white",
        foreground: "black",
      });

      // Show QR code section
      document.getElementById("qr-container").style.display = "block";

      // Update QR info
      const qrInfo = document.getElementById("qr-info");
      qrInfo.innerHTML = `
                <strong>QR Code Information:</strong><br>
                Size: 400x400 pixels<br>
                Error Correction: Level H (High)<br>
                Encryption: ${
                  encryptToggle.checked ? "AES-256 Enabled" : "Disabled"
                }<br>
                ${
                  keyInfo
                    ? `<br><strong style="color: #d63384;">${keyInfo}</strong>`
                    : ""
                }
            `;

      this.showMessage("QR code generated successfully!", "success");
    } catch (error) {
      this.showMessage(error.message, "error");
    } finally {
      // Reset button state
      const generateBtn = document.getElementById("generate-btn");
      generateBtn.disabled = false;
      generateBtn.innerHTML = "Generate QR Code";
    }
  }

  downloadQRCode() {
    if (!this.qr) {
      this.showMessage("No QR code to download", "error");
      return;
    }

    try {
      const canvas = document.getElementById("qr-canvas");
      const link = document.createElement("a");
      link.download = `qr-code-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();

      this.showMessage("QR code downloaded successfully!", "success");
    } catch (error) {
      this.showMessage("Failed to download QR code", "error");
    }
  }

  clearAll() {
    // Clear form inputs
    document.getElementById("text-input").value = "";
    document.getElementById("encryption-key").value = "";
    document.getElementById("decryption-key").value = "";
    document.getElementById("encrypt-toggle").checked = false;

    // Hide sections
    document.getElementById("qr-container").style.display = "none";
    document.getElementById("decryption-fields").style.display = "none";
    document.getElementById("result-container").style.display = "none";

    // Reset encryption toggle
    this.toggleEncryption(false);

    // Update character counter
    this.updateCharCounter();

    // Clear stored data
    this.currentEncryptedData = null;
    this.currentKey = null;
    this.qr = null;

    this.showMessage("All fields cleared", "success");
  }

  async handleQRUpload(file) {
    if (!file || !file.type.startsWith("image/")) {
      this.showMessage("Please select a valid image file", "error");
      return;
    }

    try {
      const imageData = await this.readImageFile(file);
      const qrData = this.decodeQRCode(imageData);

      if (qrData) {
        this.currentEncryptedData = qrData;

        // Check if data is encrypted
        try {
          const parsed = JSON.parse(qrData);
          if (parsed.encrypted) {
            document.getElementById("decryption-fields").style.display =
              "block";
            this.showMessage(
              "Encrypted QR code detected. Enter decryption key.",
              "warning"
            );
          } else {
            throw new Error("Not encrypted");
          }
        } catch {
          // Not encrypted JSON, display as plain text
          this.displayResult(qrData);
        }
      } else {
        this.showMessage("No QR code found in the image", "error");
      }
    } catch (error) {
      this.showMessage("Failed to process image: " + error.message, "error");
    }
  }

  readImageFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }

  decodeQRCode(imageData) {
    try {
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      return code ? code.data : null;
    } catch (error) {
      throw new Error("QR code decoding failed");
    }
  }

  decryptQRContent() {
    const decryptionKey = document
      .getElementById("decryption-key")
      .value.trim();

    if (!decryptionKey) {
      this.showMessage("Please enter the decryption key", "error");
      return;
    }

    if (!this.currentEncryptedData) {
      this.showMessage("No encrypted data to decrypt", "error");
      return;
    }

    try {
      const decryptedText = this.decryptText(
        this.currentEncryptedData,
        decryptionKey
      );
      this.displayResult(decryptedText);
      this.showMessage("Content decrypted successfully!", "success");
    } catch (error) {
      this.showMessage(error.message, "error");
    }
  }

  displayResult(text) {
    const resultContainer = document.getElementById("result-container");
    const resultText = document.getElementById("result-text");

    resultText.textContent = text;
    resultContainer.style.display = "block";

    // Hide decryption fields
    document.getElementById("decryption-fields").style.display = "none";
  }

  async copyResultToClipboard() {
    const resultText = document.getElementById("result-text").textContent;

    try {
      await navigator.clipboard.writeText(resultText);
      this.showMessage("Text copied to clipboard!", "success");
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = resultText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      this.showMessage("Text copied to clipboard!", "success");
    }
  }

  showMessage(message, type = "info") {
    const container = document.getElementById("message-container");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;

    // Add click to dismiss
    messageElement.addEventListener("click", () => {
      messageElement.remove();
    });

    container.appendChild(messageElement);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  }
}

// Security utilities
class SecurityUtils {
  static sanitizeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  static validateInput(input, maxLength = 1000) {
    if (typeof input !== "string") {
      throw new Error("Input must be a string");
    }

    if (input.length > maxLength) {
      throw new Error(
        `Input exceeds maximum length of ${maxLength} characters`
      );
    }

    return input.trim();
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SecureQRGenerator();
});

// Service Worker registration for offline support (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
