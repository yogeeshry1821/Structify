const fs = require('fs');
const path = require('path');

// Get folder structure as JSON
function getFolderStructure(dir) {
    const structure = {};
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const fullPath = path.join(dir, file);

        if (file === 'node_modules' || file.startsWith('.')) {
            return;  // Skip node_modules and hidden files/folders
        }

        if (fs.lstatSync(fullPath).isDirectory()) {
            structure[file] = getFolderStructure(fullPath);  // Recurse into subdirectories
        } else {
            structure[file] = 'file';  // Mark as file
        }
    });

    return structure;
}
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

// Export folder structure to JSON
function exportStructure(dir, output) {
    try {
        const structure = getFolderStructure(dir);

        // Validate the structure before writing it to the output file
        validateFolderStructure(structure);

        fs.writeFileSync(output, JSON.stringify(structure, null, 2));
        console.log(`Folder structure exported to ${output}`);
    } catch (err) {
        console.error('Error exporting folder structure:', err.message);
    }
}

module.exports = { exportStructure };
