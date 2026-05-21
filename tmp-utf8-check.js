const fs = require('fs');
const raw = fs.readFileSync('src/components/home/AboutSection.tsx');
const decoder = new TextDecoder('utf-8', { fatal: true });
try {
  decoder.decode(raw);
  console.log('valid utf8');
} catch (e) {
  console.error('decode error:', e.message);
  const bytes = raw;
  let i = 0;
  while (i < bytes.length) {
    const b = bytes[i];
    let expected;
    if (b <= 0x7f) expected = 1;
    else if (b >= 0xc2 && b <= 0xdf) expected = 2;
    else if (b >= 0xe0 && b <= 0xef) expected = 3;
    else if (b >= 0xf0 && b <= 0xf4) expected = 4;
    else {
      console.error('invalid start byte at', i, b.toString(16));
      break;
    }
    if (i + expected > bytes.length) {
      console.error('truncated at', i);
      break;
    }
    let ok = true;
    for (let j = 1; j < expected; j++) {
      const nb = bytes[i + j];
      if (nb < 0x80 || nb > 0xbf) {
        console.error('invalid continuation at', i + j, nb.toString(16));
        ok = false;
        break;
      }
    }
    if (!ok) break;
    i += expected;
  }
  const idx = i;
  const start = Math.max(0, idx - 40);
  const end = Math.min(bytes.length, idx + 40);
  console.log('context bytes:', bytes.slice(start, end).toString('hex'));
  console.log('context latin1:', bytes.slice(start, end).toString('latin1'));
}
