/**
 * Safari-friendly download utility
 * Handles cross-browser image downloads with special support for iOS Safari
 */

interface DownloadOptions {
  filename?: string;
  title?: string;
  description?: string;
}

/**
 * Download image from canvas with Safari iOS compatibility
 */
export const downloadCanvasImage = (canvas: HTMLCanvasElement, options: DownloadOptions = {}): void => {
  const { filename = "image.png", title = "Download Image", description = 'Tekan dan tahan gambar di atas, lalu pilih "Save to Photos" untuk menyimpan ke galeri Anda.' } = options;

  try {
    const dataURL = canvas.toDataURL("image/png");
    downloadFromDataURL(dataURL, { filename, title, description });
  } catch (error) {
    console.error("Error downloading canvas image:", error);
    showDownloadError();
  }
};

/**
 * Download image from data URL with Safari iOS compatibility
 */
export const downloadFromDataURL = (dataURL: string, options: DownloadOptions = {}): void => {
  const { filename = "image.png", title = "Download Image", description = 'Tekan dan tahan gambar di atas, lalu pilih "Save to Photos" untuk menyimpan ke galeri Anda.' } = options;

  try {
    // Detect browser type
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS || isSafari) {
      // For Safari/iOS: Open image in new tab with instructions
      openImageInNewTab(dataURL, filename, title, description);
    } else {
      // For other browsers: Use blob download
      downloadDirectly(dataURL, filename);
    }
  } catch (error) {
    console.error("Error downloading from data URL:", error);
    showDownloadError();
  }
};

/**
 * Open image in new tab for Safari/iOS users
 */
const openImageInNewTab = (dataURL: string, filename: string, title: string, description: string): void => {
  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            .container {
              background: white;
              border-radius: 16px;
              padding: 30px;
              max-width: 500px;
              width: 100%;
              text-align: center;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            .image-container {
              margin: 20px 0;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            }
            img { 
              max-width: 100%; 
              height: auto; 
              display: block;
            }
            h3 { 
              color: #333; 
              margin-bottom: 15px; 
              font-size: 24px;
              font-weight: 600;
            }
            p { 
              color: #666; 
              margin: 20px 0; 
              line-height: 1.6;
              font-size: 16px;
            }
            .download-btn { 
              display: inline-block; 
              padding: 14px 28px; 
              background: linear-gradient(135deg, #0268f8, #0052cc);
              color: white; 
              text-decoration: none; 
              border-radius: 12px; 
              margin: 15px 10px;
              font-weight: 600;
              font-size: 16px;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(2, 104, 248, 0.3);
            }
            .download-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(2, 104, 248, 0.4);
            }
            .share-btn {
              background: linear-gradient(135deg, #ff6b6b, #ee5a24);
              box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
            }
            .share-btn:hover {
              box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
            }
            .instructions {
              background: #f8f9fa;
              border-radius: 10px;
              padding: 20px;
              margin: 20px 0;
              border-left: 4px solid #0268f8;
            }
            .step {
              margin: 10px 0;
              font-size: 14px;
              color: #555;
            }
            @media (max-width: 480px) {
              .container { padding: 20px; }
              h3 { font-size: 20px; }
              p { font-size: 14px; }
              .download-btn { 
                padding: 12px 24px; 
                font-size: 14px;
                display: block;
                margin: 10px 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h3>🎉 ${title}</h3>
            <div class="image-container">
              <img src="${dataURL}" alt="${filename}" />
            </div>
            
            <div class="instructions">
              <p><strong>📱 Cara menyimpan di iPhone/iPad:</strong></p>
              <div class="step">1. Tekan dan tahan gambar di atas</div>
              <div class="step">2. Pilih "Save to Photos" atau "Simpan ke Foto"</div>
              <div class="step">3. Gambar akan tersimpan di galeri Anda</div>
            </div>
            
            <p>${description}</p>
            
            <div>
              <a href="${dataURL}" download="${filename}" class="download-btn">
                📥 Download Image
              </a>
              <a href="#" onclick="shareImage()" class="download-btn share-btn">
                📤 Share
              </a>
            </div>
          </div>

          <script>
            function shareImage() {
              if (navigator.share) {
                // Use Web Share API if available
                fetch('${dataURL}')
                  .then(res => res.blob())
                  .then(blob => {
                    const file = new File([blob], '${filename}', { type: 'image/png' });
                    navigator.share({
                      title: '${title}',
                      text: 'Lihat hasil twibbon saya!',
                      files: [file]
                    });
                  })
                  .catch(err => {
                    console.log('Error sharing:', err);
                    fallbackShare();
                  });
              } else {
                fallbackShare();
              }
            }

            function fallbackShare() {
              // Fallback sharing options
              const text = 'Lihat hasil twibbon saya!';
              const url = window.location.href;
              
              if (navigator.clipboard) {
                navigator.clipboard.writeText(url);
                alert('Link telah disalin ke clipboard!');
              } else {
                prompt('Copy link ini untuk share:', url);
              }
            }
          </script>
        </body>
      </html>
    `);
    newWindow.document.close();
  } else {
    // Fallback if popup blocked
    showDownloadError("Popup diblokir. Silakan izinkan popup untuk download.");
  }
};

/**
 * Direct download for non-Safari browsers
 */
const downloadDirectly = (dataURL: string, filename: string): void => {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Show download error message
 */
const showDownloadError = (customMessage?: string): void => {
  const message = customMessage || "Download gagal. Silakan screenshot hasil twibbon atau coba browser lain.";
  alert(message);
};

/**
 * Check if current browser is Safari on iOS
 */
export const isSafariIOS = (): boolean => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  return isSafari || isIOS;
};

/**
 * Get appropriate download method description for current browser
 */
export const getDownloadInstructions = (): string => {
  if (isSafariIOS()) {
    return "Tekan dan tahan gambar untuk menyimpan ke galeri";
  }
  return "Klik tombol download untuk menyimpan gambar";
};
