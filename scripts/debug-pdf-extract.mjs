import fs from 'fs/promises';
import { getDocument, OPS } from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = './assets/PDF/SCATTERGATES-EndToEnd Business & IT Infra Solutions.pdf';
const data = new Uint8Array(await fs.readFile(pdfPath));
const pdf = await getDocument({ data }).promise;
const page = await pdf.getPage(1);
console.log('page props', Object.keys(page).sort().slice(0,40));
const opList = await page.getOperatorList();
console.log('image ops codes', OPS.paintImageXObject, OPS.paintInlineImageXObject, OPS.paintImageMaskXObject);
const idx = [];
for (let i = 0; i < opList.fnArray.length; i += 1) {
  const fn = opList.fnArray[i];
  if (fn === OPS.paintImageXObject || fn === OPS.paintInlineImageXObject || fn === OPS.paintImageMaskXObject) {
    idx.push({ i, fn, args: opList.argsArray[i] });
  }
}
console.log('found', idx.length, 'image-like ops');
if (idx.length > 0) console.log('sample arg types', idx.slice(0,5));
console.log('page objs type', typeof page.objs, page.objs?.constructor?.name);
console.log('page objs defs', Object.getOwnPropertyNames(page.objs).slice(0,20));
const objNames = [];
if (page.objs?.has) {
  for (const key of page.objs.keys()) {
    objNames.push(key);
    if (objNames.length >= 20) break;
  }
}
console.log('page objs keys via iterator', objNames.slice(0,20));
