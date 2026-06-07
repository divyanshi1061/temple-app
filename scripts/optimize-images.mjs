import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = './public';

async function getFiles(dir) {
  const subdirs = await fs.promises.readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir);
      return (await fs.promises.stat(res)).isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const filename = path.basename(filePath).toLowerCase();
  const stat = await fs.promises.stat(filePath);
  const originalSize = stat.size;

  if (originalSize === 0) return;

  const fileBuffer = await fs.promises.readFile(filePath);
  let pipeline = sharp(fileBuffer);
  let shouldProcess = false;

  try {
    if (ext === '.png') {
      shouldProcess = true;
      if (filename === 'icon.png') {
        pipeline = pipeline.resize(192, 192).png({ quality: 80, compressionLevel: 9 });
      } else if (filename === 'og-image.png') {
        // OG image optimized to max width 1200px
        pipeline = pipeline.resize({ width: 1200, fit: 'inside', withoutEnlargement: true }).png({ quality: 80, compressionLevel: 9 });
      } else {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
      }
    } else if (ext === '.webp') {
      // Don't re-compress if it's already tiny, but check if we can optimize
      // Sharp's default webp compression is excellent.
      shouldProcess = true;
      pipeline = pipeline.webp({ quality: 75, effort: 6 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      shouldProcess = true;
      pipeline = pipeline.jpeg({ quality: 80, progressive: true });
    }

    if (shouldProcess) {
      // Buffer to write safely in-place
      const buffer = await pipeline.toBuffer();
      
      if (buffer.length < originalSize) {
        await fs.promises.writeFile(filePath, buffer);
        const savings = ((originalSize - buffer.length) / 1024).toFixed(1);
        const savingsPercent = (((originalSize - buffer.length) / originalSize) * 100).toFixed(0);
        console.log(`✓ Optimized ${path.relative(process.cwd(), filePath)}: ${(originalSize / 1024).toFixed(1)} KB → ${(buffer.length / 1024).toFixed(1)} KB (-${savings} KB, -${savingsPercent}%)`);
      } else {
        console.log(`- Skipped ${path.relative(process.cwd(), filePath)}: already fully optimized`);
      }
    }
  } catch (err) {
    console.error(`✗ Error optimizing ${path.relative(process.cwd(), filePath)}:`, err.message);
  }
}

async function main() {
  console.log('🔍 Scanning public directory for images...');
  const files = await getFiles(PUBLIC_DIR);
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
  const imageFiles = files.filter(f => imageExtensions.includes(path.extname(f).toLowerCase()));

  console.log(`📸 Found ${imageFiles.length} images. Starting optimization...`);
  
  for (const file of imageFiles) {
    await optimizeImage(file);
  }
  
  console.log('🎉 Image optimization complete!');
}

main().catch(console.error);
