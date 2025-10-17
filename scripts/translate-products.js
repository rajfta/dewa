const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Translation mappings for divizios
const divizioTranslations = {
  'FÉNYEZŐFÜLKE': 'PAINT BOOTH',
  'FELÜLETKEZELÉS': 'SURFACE TREATMENT',
  'SZÓRÁSTECHNIKA': 'BLASTING TECHNOLOGY',
  'TÜZELÉSTECHNIKA': 'HEATING TECHNOLOGY'
};

// Dummy description templates
const dummyDescriptions = [
  'Professional industrial equipment designed for high-performance applications. This advanced system features state-of-the-art technology and precision engineering. Built to meet the highest quality standards with reliable operation and efficient performance.\n\nKey features include automatic controls, energy-efficient operation, and robust construction. Ideal for demanding industrial environments requiring consistent results and long-term reliability.\n\nAvailable in various sizes and configurations to meet specific application requirements.',

  'High-quality industrial solution engineered for optimal performance and durability. Features innovative design elements and advanced control systems. Manufactured to strict quality standards ensuring long service life and minimal maintenance requirements.\n\nThis equipment combines cutting-edge technology with practical functionality. Suitable for professional applications demanding precision and reliability. Easy to operate with intuitive controls and comprehensive safety features.\n\nMultiple configuration options available to suit different operational needs and space requirements.',

  'Advanced industrial equipment offering superior performance and versatility. Designed with user-friendly operation and maintenance in mind. Incorporates the latest technological innovations for enhanced efficiency and productivity.\n\nRobust construction ensures durability in challenging industrial environments. Optimized for energy efficiency and environmental compliance. Comprehensive control system provides precise operation and monitoring capabilities.\n\nCustomizable options available including various capacity ranges and technical specifications to match specific application requirements.',

  'Premium quality industrial system engineered for demanding professional applications. Features robust construction and reliable performance under continuous operation. Advanced control technology ensures optimal efficiency and ease of use.\n\nDesigned for maximum productivity with minimal downtime. Comprehensive safety features and compliance with international standards. Low maintenance requirements with excellent long-term reliability.\n\nFlexible configuration options to accommodate different operational requirements and installation constraints. Professional-grade components ensure consistent high-quality results.',

  'State-of-the-art industrial equipment combining innovation and reliability. Precision-engineered for professional use with focus on performance and efficiency. Built to withstand rigorous industrial environments while maintaining consistent operation.\n\nAdvanced features include automated control systems, energy optimization, and user-friendly interface. Suitable for a wide range of industrial applications requiring high standards of quality and reliability.\n\nAvailable in multiple sizes and specifications. Comprehensive support and documentation ensure smooth installation and operation.'
];

function getRandomDescription() {
  return dummyDescriptions[Math.floor(Math.random() * dummyDescriptions.length)];
}

function translateProduct(huFilePath, enFilePath) {
  // Read Hungarian file
  const huContent = fs.readFileSync(huFilePath, 'utf8');
  const { data, content } = matter(huContent);

  // Translate fields
  const enData = {
    divizio: divizioTranslations[data.divizio] || data.divizio,
    alkategoria: data.alkategoria ? `${data.alkategoria} Category` : 'Product Category',
    nev: data.nev, // Keep product name as is (usually brand names)
    leiras: getRandomDescription(),
    boritokep: data.boritokep // Keep same image path
  };

  // Create English version
  const enContent = matter.stringify('', enData);

  // Ensure directory exists
  const enDir = path.dirname(enFilePath);
  if (!fs.existsSync(enDir)) {
    fs.mkdirSync(enDir, { recursive: true });
  }

  // Write English file
  fs.writeFileSync(enFilePath, enContent);
}

function processCategory(category) {
  const categoryPath = path.join(process.cwd(), 'cms', 'termekek', category);
  const huPath = path.join(categoryPath, 'hu');
  const enPath = path.join(categoryPath, 'en');

  if (!fs.existsSync(huPath)) {
    console.log(`Skipping ${category} - no hu directory found`);
    return 0;
  }

  const huFiles = fs.readdirSync(huPath).filter(f => f.endsWith('.md'));

  console.log(`Processing ${category}: ${huFiles.length} files`);

  huFiles.forEach(filename => {
    const huFilePath = path.join(huPath, filename);
    const enFilePath = path.join(enPath, filename);

    try {
      translateProduct(huFilePath, enFilePath);
    } catch (error) {
      console.error(`Error processing ${filename}:`, error.message);
    }
  });

  return huFiles.length;
}

// Main execution
const categories = ['feluletkezeles', 'fenyezofulkek', 'szorastechnika', 'tuzelestechnika'];
let totalProcessed = 0;

console.log('Starting product translation...\n');

categories.forEach(category => {
  const count = processCategory(category);
  totalProcessed += count;
});

console.log(`\nCompleted! Translated ${totalProcessed} products to English.`);
