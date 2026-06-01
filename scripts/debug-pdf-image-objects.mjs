import fs from 'fs/promises';
import { getDocument, OPS } from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = './assets/PDF/SCATTERGATES-EndToEnd Business & IT Infra Solutions.pdf';
const data = new Uint8Array(await fs.readFile(pdfPath));
const pdf = await getDocument({ data }).promise;
const page = await pdf.getPage(1);
const opList = await page.getOperatorList();
const imageOps = opList.fnArray
  .map((fn, i) => ({ fn, args: opList.argsArray[i] }))
  .filter((o) => o.fn === OPS.paintImageXObject || o.fn === OPS.paintInlineImageXObject || o.fn === OPS.paintImageMaskXObject);
console.log('image ops found', imageOps.length);
for (const op of imageOps) {
  const name = op.args[0];
  console.log('image op', op.fn, name, op.args.slice(1));
  try {
    const obj = page.objs.get(name);
    console.log('obj type', typeof obj, obj && obj.constructor && obj.constructor.name);
    if (obj) {
      console.log('obj props', Object.keys(obj).filter(k => typeof obj[k] !== 'function').slice(0,30));
      if (obj.data) {
        console.log('data length', obj.data.length, 'width', obj.width, 'height', obj.height, 'kind', obj.kind);
      }
    }
  } catch (error) {
    console.log('error retrieving obj', name, error.message);
  }
  console.log('---');
}
