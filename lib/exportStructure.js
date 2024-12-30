const fs = require('fs');
const path = require('path');

// Get folder structure as JSON
function getFolderStructure(dir, format = 'json', depth = 0) {
    let structure = format === 'json' ? {} : ''; // Use `let` for non-JSON formats
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const fullPath = path.join(dir, file);

        if (file === 'node_modules' || file.startsWith('.')) {
            return; // Skip node_modules and hidden files/folders
        }

        const isDir = fs.lstatSync(fullPath).isDirectory();

        if (format === 'json') {
            if (isDir) {
                structure[file] = getFolderStructure(fullPath, format);
            } else {
                structure[file] = 'file'; // Mark as file
            }
        } else if (format === 'line' || format === 'arrow') {
            const prefix = format === 'line' ? '├── ' : '-> ';
            structure += `${' '.repeat(depth * 4)}${prefix}${file}\n`;
            if (isDir) {
                structure += getFolderStructure(fullPath, format, depth + 1);
            }
        }
    });

    return structure;
}

// Validate folder structure
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

// Export folder structure to desired format
function exportStructure(dir, output, format = 'json') {
    try {
        const structure = getFolderStructure(dir, format);

        // Validate JSON structure before writing to file
        if (format === 'json') {
            validateFolderStructure(structure);
            fs.writeFileSync(output, JSON.stringify(structure, null, 2));
        } else {
            fs.writeFileSync(output, structure);
        }

        console.log(`Folder structure exported to ${output} in ${format} format`);
    } catch (err) {
        console.error('Error exporting folder structure:', err.message);
    }
}

module.exports = { exportStructure };
