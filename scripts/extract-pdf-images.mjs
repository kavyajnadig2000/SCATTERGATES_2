import fs from 'fs/promises';
import path from 'path';
import { inflateSync } from 'zlib';
import sharp from 'sharp';
import { PDFDocument, PDFName, PDFRawStream, PDFArray } from 'pdf-lib';

const pdfPath = path.resolve('assets/PDF/SCATTERGATES-EndToEnd Business & IT Infra Solutions.pdf');
const outputRoot = path.resolve('public/images/pdf-extracted');

function normalizeFilterName(filter) {
  if (!filter) return null;
  if (filter.constructor.name === 'PDFName') return filter.toString();
  if (filter instanceof PDFArray) return filter.asArray().map((item) => item.toString());
  return null;
}

function normalizeArray(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value.asArray === 'function') return value.asArray();
  return [value];
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function decodeStream(rawStream, filters) {
  let bytes = rawStream;
  for (const filter of filters) {
    if (filter === '/FlateDecode') {
      bytes = inflateSync(bytes);
    } else if (filter === '/DCTDecode' || filter === '/DCTDecode') {
      // JPEG content; leave bytes as-is after prior filters.
    } else if (filter === '/JPXDecode') {
      // JPEG2000 content; leave as-is.
    } else if (filter === '/ASCII85Decode' || filter === '/ASCIIHexDecode') {
      throw new Error(`Unsupported filter: ${filter}`);
    } else {
      // Unknown filter sequence, preserve for analysis.
      throw new Error(`Unsupported filter: ${filter}`);
    }
  }
  return bytes;
}

function guessImageInfo(bytes) {
  if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8) {
    return { ext: 'jpg', mime: 'image/jpeg' };
  }
  if (bytes.length >= 8 && bytes.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { ext: 'png', mime: 'image/png' };
  }
  if (bytes.length >= 12 && bytes.slice(4, 12).equals(Buffer.from('jpx\n', 'ascii'))) {
    return { ext: 'jp2', mime: 'image/jp2' };
  }
  return null;
}

function sanitizeName(name) {
  return name.replace(/[^a-zA-Z0-9-_\.]/g, '_');
}

async function main() {
  await ensureDir(outputRoot);
  const pdfBytes = await fs.readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const extracted = [];
  for (const [ref, obj] of pdfDoc.context.enumerateIndirectObjects()) {
    if (!(obj instanceof PDFRawStream)) continue;
    const dict = obj.dict;
    const subtype = dict.get(PDFName.of('Subtype'));
    if (!subtype || subtype.toString() !== '/Image') continue;

    const filterObj = dict.get(PDFName.of('Filter'));
    const filters = [];
    if (filterObj) {
      const normalized = normalizeFilterName(filterObj);
      if (Array.isArray(normalized)) {
        filters.push(...normalized);
      } else if (typeof normalized === 'string') {
        filters.push(normalized);
      }
    }

    const width = dict.get(PDFName.of('Width'))?.toString?.() ?? 'unknown';
    const height = dict.get(PDFName.of('Height'))?.toString?.() ?? 'unknown';
    const colorSpace = dict.get(PDFName.of('ColorSpace'))?.toString?.() ?? 'unknown';
    const bitsPerComponent = dict.get(PDFName.of('BitsPerComponent'))?.toString?.() ?? '8';
    const decodeParms = dict.get(PDFName.of('DecodeParms'))?.toString?.() ?? 'none';

    const rawContents = obj.contents;
    let decoded;
    try {
      decoded = decodeStream(rawContents, filters);
    } catch (error) {
      console.warn(`Skipping image ${ref.toString()} due to unsupported filter chain:`, filters, error.message);
      continue;
    }

    const info = guessImageInfo(decoded);
    const baseName = `pdf-image-${ref.objectNumber}-${ref.generationNumber}`;
    const metadata = { ref: ref.toString(), width, height, colorSpace, bitsPerComponent, filters, decodeParms, bytesLength: decoded.length };

    if (info) {
      const outName = `${sanitizeName(baseName)}-${width}x${height}.${info.ext}`;
      const outPath = path.join(outputRoot, outName);
      await fs.writeFile(outPath, decoded);
      extracted.push({ ...metadata, file: outPath, format: info.ext });
      console.log('Extracted', outName, 'from', ref.toString(), info.mime, 'size', decoded.length);
    } else {
      const outName = `${sanitizeName(baseName)}-${width}x${height}.raw`;
      const outPath = path.join(outputRoot, outName);
      await fs.writeFile(outPath, decoded);
      extracted.push({ ...metadata, file: outPath, format: 'raw' });
      console.log('Saved raw image stream', outName, 'from', ref.toString(), 'filters', filters.join(','));
    }
  }

  console.log(`Finished extraction: ${extracted.length} image streams written to ${outputRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
