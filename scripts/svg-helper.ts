// This is a helper script to understand your SVG files
// Run this after you've downloaded the SVGs to your public/svg folder

import fs from 'fs';
import path from 'path';

const svgDir = path.join(process.cwd(), 'public/svg');

try {
  // Read the directory
  const files = fs.readdirSync(svgDir);
  
  // Filter for SVG files
  const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');
  
  console.log('Found SVG files:');
  svgFiles.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });

  // Generate the mapping code
  console.log('\nMapping code for FloatingShapes.tsx:');
  console.log('Replace your shapes array with this:');
  console.log(`
const shapes = [
  ${svgFiles.map((file, index) => `{
    src: '${file}',
    initialX: windowSize.width * ${Math.random().toFixed(2)},
    initialY: windowSize.height * ${Math.random().toFixed(2)},
    duration: ${Math.floor(Math.random() * 4) + 6},
    delay: ${Math.random().toFixed(1)},
    scale: ${(Math.random() * 0.5 + 0.3).toFixed(1)},
  }`).join(',\n  ')}
];
  `);
} catch (err) {
  console.error('Error reading SVG directory:', err);
}