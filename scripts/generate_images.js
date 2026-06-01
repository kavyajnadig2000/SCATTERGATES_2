const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  {
    filename: 'public/images/hero/enterprise-technology.webp',
    width: 1600,
    height: 900,
    title: 'Enterprise Technology',
    colors: ['#0b1320', '#070a10', '#1f2937'],
    accent: '#de4b4b',
    nodes: true,
    grid: true,
  },
  {
    filename: 'public/images/services/it-infrastructure.webp',
    width: 1400,
    height: 900,
    title: 'Data Center Infrastructure',
    colors: ['#101827', '#111827', '#0f172a'],
    accent: '#f97316',
    nodes: true,
    grid: true,
  },
  {
    filename: 'public/images/services/network-infrastructure.webp',
    width: 1400,
    height: 900,
    title: 'Network Infrastructure',
    colors: ['#0f172a', '#111827', '#1e293b'],
    accent: '#38bdf8',
    nodes: true,
    grid: true,
  },
  {
    filename: 'public/images/services/managed-it-services.webp',
    width: 1400,
    height: 900,
    title: 'Managed IT Services',
    colors: ['#111827', '#0f172a', '#111827'],
    accent: '#f43f5e',
    nodes: true,
    grid: true,
  },
  {
    filename: 'public/images/services/security-operations.webp',
    width: 1400,
    height: 900,
    title: 'Security Operations',
    colors: ['#020617', '#0f172a', '#111827'],
    accent: '#14b8a6',
    nodes: true,
    grid: true,
  },
  {
    filename: 'public/images/products/enterprise-ptz-boardroom.webp',
    width: 900,
    height: 600,
    title: 'Boardroom AV',
    colors: ['#111827', '#0f172a', '#1f2937'],
    accent: '#fb7185',
  },
  {
    filename: 'public/images/products/rack-server.webp',
    width: 900,
    height: 600,
    title: 'Rack Server',
    colors: ['#0f172a', '#111827', '#111827'],
    accent: '#f97316',
  },
  {
    filename: 'public/images/products/structured-cabling.webp',
    width: 900,
    height: 600,
    title: 'Structured Cabling',
    colors: ['#0f172a', '#111827', '#0f172a'],
    accent: '#38bdf8',
  },
  {
    filename: 'public/images/products/corporate-workstation.webp',
    width: 900,
    height: 600,
    title: 'Workstation',
    colors: ['#111827', '#0f172a', '#111827'],
    accent: '#a855f7',
  },
  {
    filename: 'public/images/products/hardware-components.webp',
    width: 900,
    height: 600,
    title: 'Hardware Components',
    colors: ['#0f172a', '#111827', '#1e293b'],
    accent: '#22c55e',
  },
  {
    filename: 'public/images/brands/lenovo.webp',
    width: 900,
    height: 600,
    title: 'Lenovo',
    colors: ['#111827', '#111827', '#1f2937'],
    accent: '#f97316',
  },
  {
    filename: 'public/images/brands/hp.webp',
    width: 900,
    height: 600,
    title: 'HP',
    colors: ['#0f172a', '#111827', '#111827'],
    accent: '#3b82f6',
  },
  {
    filename: 'public/images/brands/jabra.webp',
    width: 900,
    height: 600,
    title: 'Jabra',
    colors: ['#0f172a', '#111827', '#111827'],
    accent: '#f43f5e',
  },
  {
    filename: 'public/images/brands/logitech.webp',
    width: 900,
    height: 600,
    title: 'Logitech',
    colors: ['#111827', '#0f172a', '#111827'],
    accent: '#22c55e',
  },
  {
    filename: 'public/images/brands/epos.webp',
    width: 900,
    height: 600,
    title: 'EPOS',
    colors: ['#0f172a', '#111827', '#1f2937'],
    accent: '#818cf8',
  }
];

function buildSvg({ width, height, colors, accent, title, nodes, grid }) {
  const lines = grid
    ? Array.from({ length: 12 }, (_, i) => {
        const y = Math.round((i / 11) * height);
        const opacity = 0.05 + (i % 3) * 0.012;
        return `<line x1='0' y1='${y}' x2='${width}' y2='${y}' stroke='white' stroke-opacity='${opacity}' stroke-width='1' />`;
      }).join('') + Array.from({ length: 12 }, (_, i) => {
        const x = Math.round((i / 11) * width);
        const opacity = 0.05 + (i % 4) * 0.01;
        return `<line x1='${x}' y1='0' x2='${x}' y2='${height}' stroke='white' stroke-opacity='${opacity}' stroke-width='1' />`;
      }).join('')
    : '';

  const nodeElements = (nodes ? Array.from({ length: 14 }, (_, i) => {
    const x = 40 + ((i * 53) % (width - 120));
    const y = 40 + ((i * 31) % (height - 120));
    const r = 6 + ((i % 3) * 2);
    return `<circle cx='${x}' cy='${y}' r='${r}' fill='${accent}' opacity='0.72'/>`;
  }).join('') : '');

  return `
  <svg width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' xmlns='http://www.w3.org/2000/svg'>
    <defs>
      <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
        ${colors.map((c, idx) => `<stop offset='${(idx/(colors.length-1))*100}%' stop-color='${c}'/>`).join('')}
      </linearGradient>
      <radialGradient id='spot' cx='50%' cy='20%' r='60%'>
        <stop offset='0%' stop-color='rgba(255,255,255,0.25)' />
        <stop offset='100%' stop-color='rgba(255,255,255,0)' />
      </radialGradient>
    </defs>
    <rect x='0' y='0' width='${width}' height='${height}' fill='url(#grad)' />
    <rect x='0' y='0' width='${width}' height='${height}' fill='url(#spot)' opacity='0.35' />
    ${grid ? lines : ''}
    ${nodeElements}
    <rect x='${width * 0.12}' y='${height * 0.22}' width='${width * 0.28}' height='${height * 0.22}' rx='28' fill='rgba(255,255,255,0.08)' stroke='${accent}' stroke-width='2' />
    <rect x='${width * 0.16}' y='${height * 0.3}' width='${width * 0.18}' height='${height * 0.03}' rx='12' fill='rgba(255,255,255,0.12)' />
    <rect x='${width * 0.16}' y='${height * 0.35}' width='${width * 0.22}' height='${height * 0.03}' rx='12' fill='rgba(255,255,255,0.12)' />
    <circle cx='${width * 0.85}' cy='${height * 0.25}' r='48' fill='rgba(255,255,255,0.05)' stroke='${accent}' stroke-width='3' />
    <circle cx='${width * 0.7}' cy='${height * 0.72}' r='60' fill='rgba(255,255,255,0.04)' />
    <circle cx='${width * 0.8}' cy='${height * 0.78}' r='32' fill='${accent}' opacity='0.18' />
    <rect x='${width * 0.06}' y='${height * 0.72}' width='${width * 0.18}' height='${height * 0.1}' rx='18' fill='rgba(255,255,255,0.1)' />
    ${title ? `<text x='${width * 0.08}' y='${height * 0.16}' fill='rgba(255,255,255,0.92)' font-family='Inter, sans-serif' font-size='42' font-weight='700'>${title}</text>` : ''}
  </svg>
  `;
}

(async () => {
  for (const item of images) {
    const svg = buildSvg(item);
    const outPath = path.resolve(__dirname, '..', item.filename);
    const dir = path.dirname(outPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await sharp(Buffer.from(svg))
      .webp({ quality: 82, effort: 6 })
      .toFile(outPath);
    console.log('Generated', item.filename);
  }
})();
