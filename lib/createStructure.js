const fs = require('fs');
const path = require('path');

// Validate the folder structure (check if it's a valid folder structure)
function validateFolderStructure(structure) {
  // Ensure that the structure is an object
  if (typeof structure !== 'object' || Array.isArray(structure)) {
    throw new Error('Invalid structure: The structure should be an object.');
  }

  // Recursively check the structure
  for (const key in structure) {
    const value = structure[key];
    if (typeof value === 'object') {
      // Recursively validate subdirectories
      validateFolderStructure(value);
    } else if (value !== 'file') {
      // Only 'file' is allowed for files, other values are invalid
      throw new Error(`Invalid structure: File type should be 'file', but found '${value}' for '${key}'.`);
    }
  }
}

// Create folders based on the structure defined in the JSON
function createFolderStructure(structure, targetDir) {
  for (const key in structure) {
    const fullPath = path.join(targetDir, key);

    // If it's a directory, create the directory
    if (typeof structure[key] === 'object') {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`Created folder: ${fullPath}`);
      }
      // Recursively create subfolders
      createFolderStructure(structure[key], fullPath);
    } else {
      // Create an empty file (if file is specified)
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, '');
        console.log(`Created file: ${fullPath}`);
      } else {
        console.log(`File already exists: ${fullPath}`);
      }
    }
  }
}

// Create folder structure from the JSON file
function createStructure(jsonFile, targetDir) {
  try {
    // Read and parse the JSON file
    const structure = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

    // Validate the structure before proceeding
    validateFolderStructure(structure);

    // Create the folder structure
    createFolderStructure(structure, targetDir);
  } catch (err) {
    console.error('Error creating folder structure:', err.message);
  }
}

module.exports = { createStructure };
