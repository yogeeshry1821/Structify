const fs = require('fs');
const path = require('path');

function getFolderStructure(dir) {
  const structure = {};
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      structure[file] = getFolderStructure(fullPath);
    } else {
      structure[file] = 'file';
    }
  });

  return structure;
}

function exportStructure(dir, output) {
  try {
    const structure = getFolderStructure(dir);
    fs.writeFileSync(output, JSON.stringify(structure, null, 2));
    console.log(`Folder structure exported to ${output}`);
  } catch (err) {
    console.error('Error exporting folder structure:', err.message);
  }
}

module.exports = { exportStructure };
