import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const checkOnly = process.argv.includes('--check');

const readJson = async (relativePath) =>
  JSON.parse(await readFile(join(repositoryRoot, relativePath), 'utf8'));

const [colorsTokenFile, layoutTokenFile, typographyTokenFile] =
  await Promise.all([
    readJson('tokens/colors.json'),
    readJson('tokens/layout.json'),
    readJson('tokens/typography.json'),
  ]);

const colors = Object.fromEntries(
  Object.entries(colorsTokenFile.color).map(([name, token]) => [
    name,
    token.$value,
  ]),
);

const tokenValues = (group) =>
  Object.fromEntries(
    Object.entries(group).map(([name, token]) => [name, token.$value]),
  );

const layout = {
  spacing: tokenValues(layoutTokenFile.spacing),
  radius: tokenValues(layoutTokenFile.radius),
  border: tokenValues(layoutTokenFile.border),
  size: tokenValues(layoutTokenFile.size),
};

const typography = {
  fontFamily: typographyTokenFile.font.family.system.$value,
  fontWeight: tokenValues(typographyTokenFile.font.weight),
};

const toIdentifier = (name) => {
  const spacingMatch = name.match(/^(\d+)xl$/);
  if (spacingMatch) return `x${spacingMatch[1]}l`;

  return name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

const numberFromDimension = (value) => {
  const match = /^(-?\d+(?:\.\d+)?)px$/.exec(value);
  if (!match) throw new Error(`Unsupported dimension: ${value}`);
  return Number(match[1]);
};

const dartColor = (value) => `0xFF${value.slice(1).toUpperCase()}`;
const cssFontFamily = typography.fontFamily.replace('Segoe UI', '"Segoe UI"');

const cssLines = [
  ':root {',
  ...Object.entries(colors).map(
    ([name, value]) => `  --pm-color-${name}: ${value.toLowerCase()};`,
  ),
  '',
  `  --pm-font-family: ${cssFontFamily};`,
  ...Object.entries(typography.fontWeight).map(
    ([name, value]) => `  --pm-font-weight-${name}: ${value};`,
  ),
  '',
  ...Object.entries(layout.spacing).map(
    ([name, value]) => `  --pm-space-${name}: ${value};`,
  ),
  '',
  ...Object.entries(layout.radius).map(
    ([name, value]) => `  --pm-radius-${name}: ${value};`,
  ),
  '',
  ...Object.entries(layout.border).map(
    ([name, value]) => `  --pm-border-${name}: ${value};`,
  ),
  '',
  ...Object.entries(layout.size).map(([name, value]) => {
    const cssName = {
      'touch-target-min': 'touch-target-min',
      'button-standard': 'button-height-standard',
      'button-large': 'button-height-large',
      'content-max': 'content-max-width',
      'screen-padding': 'screen-padding',
    }[name];
    return `  --pm-${cssName}: ${value};`;
  }),
  '}',
  '',
];

const renderJsObject = (entries, valueFormatter, indent = '  ') => [
  ...entries.map(
    ([name, value]) =>
      `${indent}${toIdentifier(name)}: ${valueFormatter(value)},`,
  ),
];

const jsLines = [
  'export const colors = Object.freeze({',
  ...renderJsObject(Object.entries(colors), (value) => `'${value}'`),
  '});',
  '',
  'export const dimensions = Object.freeze({',
  '  spacing: Object.freeze({',
  ...renderJsObject(
    Object.entries(layout.spacing),
    numberFromDimension,
    '    ',
  ),
  '  }),',
  '  radius: Object.freeze({',
  ...renderJsObject(
    Object.entries(layout.radius),
    numberFromDimension,
    '    ',
  ),
  '  }),',
  '  border: Object.freeze({',
  ...renderJsObject(
    Object.entries(layout.border),
    numberFromDimension,
    '    ',
  ),
  '  }),',
  '  size: Object.freeze({',
  ...renderJsObject(
    Object.entries(layout.size),
    numberFromDimension,
    '    ',
  ),
  '  }),',
  '});',
  '',
  'export const typography = Object.freeze({',
  `  fontFamily: '${typography.fontFamily}',`,
  `  fontWeight: Object.freeze({ regular: ${typography.fontWeight.regular}, semibold: ${typography.fontWeight.semibold}, bold: ${typography.fontWeight.bold} }),`,
  '});',
  '',
];

const union = (names) => names.map((name) => `'${toIdentifier(name)}'`).join(' | ');

const declarationLines = [
  'export declare const colors: Readonly<{',
  ...Object.entries(colors).map(
    ([name, value]) => `  ${toIdentifier(name)}: '${value}';`,
  ),
  '}>;',
  '',
  'export declare const dimensions: Readonly<{',
  `  spacing: Readonly<Record<${union(Object.keys(layout.spacing))}, number>>;`,
  `  radius: Readonly<Record<${union(Object.keys(layout.radius))}, number>>;`,
  `  border: Readonly<Record<${union(Object.keys(layout.border))}, number>>;`,
  `  size: Readonly<Record<${union(Object.keys(layout.size))}, number>>;`,
  '}>;',
  '',
  'export declare const typography: Readonly<{',
  '  fontFamily: string;',
  '  fontWeight: Readonly<{',
  `    regular: ${typography.fontWeight.regular};`,
  `    semibold: ${typography.fontWeight.semibold};`,
  `    bold: ${typography.fontWeight.bold};`,
  '  }>;',
  '}>;',
  '',
];

const dartColorLines = [
  "import 'package:flutter/material.dart';",
  '',
  'abstract final class PmColors {',
  ...Object.entries(colors).map(
    ([name, value]) =>
      `  static const ${toIdentifier(name)} = Color(${dartColor(value)});`,
  ),
  '}',
  '',
];

const renderDartDimensionClass = (className, entries) => [
  `abstract final class ${className} {`,
  ...entries.map(
    ([name, value]) =>
      `  static const ${toIdentifier(name)} = ${numberFromDimension(value).toFixed(1)};`,
  ),
  '}',
  '',
];

const dartDimensionLines = [
  ...renderDartDimensionClass('PmSpacing', Object.entries(layout.spacing)),
  ...renderDartDimensionClass('PmRadius', Object.entries(layout.radius)),
  ...renderDartDimensionClass('PmSize', Object.entries(layout.size)),
  ...renderDartDimensionClass('PmBorder', Object.entries(layout.border)),
];

const generatedFiles = new Map([
  ['dist/tokens.css', cssLines.join('\n')],
  ['dist/tokens.js', jsLines.join('\n')],
  ['dist/tokens.d.ts', declarationLines.join('\n')],
  ['packages/flutter/lib/src/colors.dart', dartColorLines.join('\n')],
  [
    'packages/flutter/lib/src/dimensions.dart',
    dartDimensionLines.join('\n'),
  ],
]);

const staleFiles = [];

for (const [relativePath, generatedContent] of generatedFiles) {
  const absolutePath = join(repositoryRoot, relativePath);

  if (checkOnly) {
    const currentContent = await readFile(absolutePath, 'utf8');
    if (currentContent !== generatedContent) staleFiles.push(relativePath);
  } else {
    await writeFile(absolutePath, generatedContent, 'utf8');
    console.log(`Generated ${relativePath}`);
  }
}

if (staleFiles.length > 0) {
  throw new Error(
    `Generated files are stale: ${staleFiles.join(', ')}. Run npm run build.`,
  );
}

if (checkOnly) {
  console.log(`Verified ${generatedFiles.size} generated files.`);
}
