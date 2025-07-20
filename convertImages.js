const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Converted ${inputPath} to WebP`);
  } catch (err) {
    console.error(`Error converting ${inputPath}:`, err);
  }
}

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(png|jpe?g)$/i.test(file)) {
      const webpPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');
      await convertToWebP(fullPath, webpPath);
    }
  }
}

// Process both frontend and admin image directories
(async () => {
  console.log('Starting image conversion...');
  await processDirectory('frontend/src/assets');
  await processDirectory('admin/src/assets');
  console.log('Image conversion complete!');
})();
