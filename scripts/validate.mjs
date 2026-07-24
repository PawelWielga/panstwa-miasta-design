import { readFile } from 'node:fs/promises';

const requiredFiles = [
  'tokens/colors.json',
  'tokens/layout.json',
  'tokens/typography.json',
  'dist/tokens.css',
  'dist/tokens.js',
  'dist/tokens.d.ts',
  'packages/flutter/lib/src/colors.dart',
  'packages/flutter/lib/src/dimensions.dart',
  'packages/flutter/lib/src/theme.dart',
  'docs/UI_GUIDELINES.md',
];

const contents = new Map();

for (const path of requiredFiles) {
  contents.set(path, await readFile(path, 'utf8'));
}

const colorTokens = JSON.parse(contents.get('tokens/colors.json'));
JSON.parse(contents.get('tokens/layout.json'));
JSON.parse(contents.get('tokens/typography.json'));

const css = contents.get('dist/tokens.css').toLowerCase();
const js = contents.get('dist/tokens.js').toLowerCase();
const dart = contents.get('packages/flutter/lib/src/colors.dart').toLowerCase();

for (const [name, token] of Object.entries(colorTokens.color)) {
  const value = token.$value.toLowerCase();
  const flutterValue = value.replace('#', '0xff');

  if (!css.includes(value)) {
    throw new Error(`Missing ${name} (${value}) in dist/tokens.css`);
  }

  if (!js.includes(value)) {
    throw new Error(`Missing ${name} (${value}) in dist/tokens.js`);
  }

  if (!dart.includes(flutterValue)) {
    throw new Error(`Missing ${name} (${flutterValue}) in Flutter colors`);
  }
}

console.log(`Validated ${requiredFiles.length} files and ${Object.keys(colorTokens.color).length} colors.`);
