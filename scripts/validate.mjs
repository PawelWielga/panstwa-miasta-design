import { access, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const requiredFiles = [
  'tokens/colors.json',
  'tokens/layout.json',
  'tokens/typography.json',
  'dist/tokens.css',
  'dist/tokens.js',
  'dist/tokens.d.ts',
  'assets/manifest.json',
  'assets/manifest.schema.json',
  'assets/branding/logo-mark.svg',
  'assets/branding/favicon.svg',
  'assets/branding/og-image.svg',
  'packages/flutter/lib/src/colors.dart',
  'packages/flutter/lib/src/dimensions.dart',
  'packages/flutter/lib/src/theme.dart',
  'packages/flutter/test/theme_test.dart',
  'docs/UI_GUIDELINES.md',
];

const contents = new Map();

for (const path of requiredFiles) {
  contents.set(path, await readFile(join(repositoryRoot, path), 'utf8'));
}

const packageJson = JSON.parse(
  await readFile(join(repositoryRoot, 'package.json'), 'utf8'),
);
const colorTokens = JSON.parse(contents.get('tokens/colors.json'));
JSON.parse(contents.get('tokens/layout.json'));
JSON.parse(contents.get('tokens/typography.json'));
JSON.parse(contents.get('assets/manifest.schema.json'));
const assetManifest = JSON.parse(contents.get('assets/manifest.json'));

if (assetManifest.version !== packageJson.version) {
  throw new Error(
    `Asset manifest version ${assetManifest.version} does not match package version ${packageJson.version}`,
  );
}

for (const [name, relativePath] of Object.entries(assetManifest.branding)) {
  await access(join(repositoryRoot, 'assets', relativePath));
  if (!relativePath.endsWith('.svg')) {
    throw new Error(`Shared branding asset ${name} must use an SVG source file`);
  }
}

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

console.log(
  `Validated ${requiredFiles.length} files, ${Object.keys(colorTokens.color).length} colors and ${Object.keys(assetManifest.branding).length} shared assets.`,
);
