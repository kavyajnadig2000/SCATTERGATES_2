import fs from 'fs/promises';
import { PDFDocument, PDFName, PDFRawStream, PDFDict } from 'pdf-lib';

const data = await fs.readFile('./assets/PDF/SCATTERGATES-EndToEnd Business & IT Infra Solutions.pdf');
const pdfDoc = await PDFDocument.load(data);
let imageCount = 0;
for (const [ref, obj] of pdfDoc.context.enumerateIndirectObjects()) {
  if (obj instanceof PDFRawStream) {
    const dict = obj.dict;
    const subtype = dict.get(PDFName.of('Subtype'));
    const type = dict.get(PDFName.of('Type'));
    const width = dict.get(PDFName.of('Width'));
    const height = dict.get(PDFName.of('Height'));
    const colorSpace = dict.get(PDFName.of('ColorSpace'));
    if (subtype?.toString?.() === '/Image') {
      imageCount += 1;
      console.log('Image stream', ref.toString());
      console.log('  width', width?.toString?.(), 'height', height?.toString?.(), 'colorSpace', colorSpace?.toString?.());
      console.log('  filter', dict.get(PDFName.of('Filter'))?.toString?.(), 'decodeParms', dict.get(PDFName.of('DecodeParms'))?.toString?.());
      const contents = obj.contents;
      console.log('  raw contents size', contents.length);
      if (contents.length > 0 && imageCount <= 5) {
        console.log('  first bytes', contents.slice(0,16));
      }
    }
  }
}
console.log('total image streams', imageCount);
