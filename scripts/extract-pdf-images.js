import fs from 'fs/promises';
import path from 'path';
import { inflateSync } from 'zlib';
import sharp from 'sharp';
import { PDFDocument, PDFName, PDFRawStream, PDFArray } from 'pdf-lib';

const pdfPath = path.resolve('assets/PDF/SCATTERGATES-EndToEnd Business & IT Infra Solutions.pdf');
const extractedRoot = path.resolve('public/images/pdf-extracted');
const targetRoot = path.resolve('public/images');

const outputMap = {
  '21': [
    { output: path.join(targetRoot, 'hero', 'enterprise-technology.webp'), format: 'webp' },
    { output: path.join(targetRoot, 'products', 'rack-server.webp'), format: 'webp' }
  ],
  '33': [
    { output: path.join(targetRoot, 'branding', 'scattergates-logo.png'), format: 'png' }
  ],
  '202': [
    { output: path.join(targetRoot, 'services', 'it-infrastructure.webp'), format: 'webp' }
  ],
  '174': [
    { output: path.join(targetRoot, 'services', 'network-infrastructure.webp'), format: 'webp' },
    { output: path.join(targetRoot, 'products', 'structured-cabling.webp'), format: 'webp' }
  ],
  '73': [
    { output: path.join(targetRoot, 'services', 'managed-it-services.webp'), format: 'webp' }
  ],
  '67': [
    { output: path.join(targetRoot, 'products', 'enterprise-ptz-boardroom.webp'), format: 'webp' }
  ],
  '55': [
    { output: path.join(targetRoot, 'products', 'corporate-workstation.webp'), format: 'webp' }
  ],
  '183': [
    { output: path.join(targetRoot, 'products', 'hardware-components.webp'), format: 'webp' }
  ]
};

const directories = [
  extractedRoot,
  path.join(targetRoot, 'hero'),
  path.join(targetRoot, 'services'),
  path.join(targetRoot, 'products'),
  path.join(targetRoot, 'branding')
];

function normalizeFilter(filter) {
  if (!filter) return [];
  if (filter instanceof PDFName) {
    return [filter.toString()];
  }
  if (filter instanceof PDFArray) {
    return filter.asArray().map((item) => item.toString());
  }
  return [filter.toString?.() || String(filter)];
}

function inferImageType(bytes) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { ext: 'jpg', mime: 'image/jpeg' };
  }
  if (bytes.length >= 8 && bytes.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { ext: 'png', mime: 'image/png' };
  }
  return null;
}

function decodeBytes(rawBytes, filters) {
  let bytes = Buffer.from(rawBytes);
  for (const filter of filters) {
    if (filter === '/FlateDecode') {
      bytes = inflateSync(bytes);
    } else if (filter === '/DCTDecode' || filter === '/DCTDecode') {
      // Leave JPEG bytes as-is.
    } else if (filter === '/JPXDecode') {
      // Leave JPEG2000 bytes as-is.
    } else if (filter === '/ASCII85Decode' || filter === '/ASCIIHexDecode') {
      throw new Error(`Unsupported PDF filter for extraction: ${filter}`);
    } else {
      throw new Error(`Unsupported PDF filter for extraction: ${filter}`);
    }
  }
  return bytes;
}

async function writeImage(imageBuffer, destination, format) {
  await fs.mkdir(path.dirname(destination), { recursive: true });
  if (format === 'webp') {
    await sharp(imageBuffer).webp({ quality: 90 }).toFile(destination);
  } else if (format === 'png') {
    await sharp(imageBuffer).png().toFile(destination);
  } else if (format === 'jpg') {
    await sharp(imageBuffer).jpeg({ quality: 90 }).toFile(destination);
  } else {
    await fs.writeFile(destination, imageBuffer);
  }
}

async function run() {
  for (const dir of directories) {
    await fs.mkdir(dir, { recursive: true });
  }

  const pdfBytes = await fs.readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  let extractedCount = 0;

  for (const [ref, obj] of pdfDoc.context.enumerateIndirectObjects()) {
    if (!(obj instanceof PDFRawStream)) continue;
    const subtype = obj.dict.get(PDFName.of('Subtype'));
    if (!subtype || subtype.toString() !== '/Image') continue;

    const width = obj.dict.get(PDFName.of('Width'))?.toString?.() ?? 'unknown';
    const height = obj.dict.get(PDFName.of('Height'))?.toString?.() ?? 'unknown';
    const filter = normalizeFilter(obj.dict.get(PDFName.of('Filter')));
    const objectKey = String(ref.objectNumber);
    const rawBytes = obj.contents;
    let decodedBytes;
    try {
      decodedBytes = decodeBytes(rawBytes, filter);
    } catch (error) {
      console.warn(`Warning: could not decode image ${ref.toString()}: ${error.message}`);
      continue;
    }

    const inferred = inferImageType(decodedBytes);
    const extension = inferred?.ext ?? 'bin';
    const extractedFilename = `pdf-image-${ref.objectNumber}-${ref.generationNumber}-${width}x${height}.${extension}`;
    const extractedPath = path.join(extractedRoot, extractedFilename);
    await fs.writeFile(extractedPath, decodedBytes);
    extractedCount += 1;
    console.log(`Extracted archive file: ${path.relative('.', extractedPath)}`);

    const outputs = outputMap[objectKey];
    if (outputs) {
      for (const output of outputs) {
        await writeImage(decodedBytes, output.output, output.format);
        console.log(`Saved mapped asset: ${path.relative('.', output.output)}`);
      }
    }
  }

  console.log(`Extraction complete. ${extractedCount} PDF image streams extracted.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
