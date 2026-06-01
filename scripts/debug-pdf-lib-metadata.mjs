import fs from 'fs/promises';
import { PDFDocument, PDFName, PDFDict } from 'pdf-lib';

const filePath = './assets/PDF/SCATTERGATES-EndToEnd Business & IT Infra Solutions.pdf';
const data = await fs.readFile(filePath);
const pdfDoc = await PDFDocument.load(data);
console.log('pages', pdfDoc.getPageCount());
console.log('context keys', Object.getOwnPropertyNames(pdfDoc.context).slice(0,40));
if (typeof pdfDoc.context.enumerateIndirectObjects === 'function') {
  let count = 0;
  for (const [ref, obj] of pdfDoc.context.enumerateIndirectObjects()) {
    if (count < 20) {
      console.log('ref', ref.toString(), 'type', obj.constructor.name);
      if (obj instanceof PDFDict) {
        const type = obj.get(PDFName.of('Type'));
        const subtype = obj.get(PDFName.of('Subtype'));
        const filter = obj.get(PDFName.of('Filter'));
        const width = obj.get(PDFName.of('Width'));
        const height = obj.get(PDFName.of('Height'));
        if (type || subtype || filter || width || height) {
          console.log('  dict keys', { type: type?.toString?.(), subtype: subtype?.toString?.(), filter: filter?.toString?.(), width: width?.toString?.(), height: height?.toString?.() });
        }
      }
    }
    count += 1;
  }
  console.log('total objects', count);
} else {
  console.log('enumerateIndirectObjects unsupported');
}
