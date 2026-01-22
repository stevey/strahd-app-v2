// Image utility functions for character portrait processing

/**
 * Resize and crop an image to a circular 100x100px format
 * @param {File} file - The uploaded image file
 * @returns {Promise<string>} - Base64 data URL of processed image
 */
export async function processPortraitImage(file) {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error('Image must be less than 5MB'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set canvas size to 100x100
          const size = 100;
          canvas.width = size;
          canvas.height = size;

          // Calculate crop dimensions (center square crop)
          const sourceSize = Math.min(img.width, img.height);
          const sourceX = (img.width - sourceSize) / 2;
          const sourceY = (img.height - sourceSize) / 2;

          // Draw circular clipping path
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();

          // Draw image centered and cropped
          ctx.drawImage(
            img,
            sourceX, sourceY, sourceSize, sourceSize, // source
            0, 0, size, size // destination
          );

          // Convert to base64 (JPEG at 85% quality for smaller size)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        } catch (error) {
          reject(new Error('Failed to process image'));
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = e.target.result;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Handle file drop event
 * @param {DragEvent} e - Drop event
 * @returns {File|null} - First image file or null
 */
export function handleFileDrop(e) {
  e.preventDefault();
  e.stopPropagation();

  const files = Array.from(e.dataTransfer.files);
  const imageFile = files.find(file => file.type.startsWith('image/'));

  return imageFile || null;
}

/**
 * Handle file input change
 * @param {Event} e - Change event
 * @returns {File|null} - First selected file or null
 */
export function handleFileSelect(e) {
  const files = Array.from(e.target.files);
  return files[0] || null;
}
