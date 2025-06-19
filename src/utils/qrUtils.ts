import QRious from 'qrious';

export const generateQRCode = (
  text: string,
  canvas?: HTMLCanvasElement | null
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const qr = new QRious({
        element: canvas || undefined,
        value: text,
        size: 300,
        level: 'M',
      });

      resolve(qr.toDataURL());
    } catch (error) {
      reject(error);
    }
  });
};

export const downloadQRCode = (
  dataUrl: string,
  filename: string = 'qr-code.png'
): void => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const copyToClipboard = async (dataUrl: string): Promise<void> => {
  try {
    // Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    // Create clipboard item
    const clipboardItem = new ClipboardItem({ [blob.type]: blob });

    // Copy to clipboard
    await navigator.clipboard.write([clipboardItem]);
  } catch (error) {
    // Fallback: copy data URL as text
    await navigator.clipboard.writeText(dataUrl);
  }
};
