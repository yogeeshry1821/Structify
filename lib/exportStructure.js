const fs = require('fs');
const path = require('path');

// Get folder structure as JSON or formatted string
function getFolderStructure(dir, format = 'json', depth = 0, maxDepth = Infinity) {
    if (depth > maxDepth) return format === 'json' ? {} : ''; // Stop recursion if depth exceeds maxDepth

    let structure = format === 'json' ? {} : ''; // Use `let` for non-JSON formats
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const fullPath = path.join(dir, file);

        if (file === 'node_modules' || file.startsWith('.')) {
            return; // Skip node_modules and hidden files/folders
        }

        const stats = fs.lstatSync(fullPath);
        const isDir = stats.isDirectory();

        if (format === 'json') {
            if (isDir) {
                structure[file] = {
                    type: 'directory',
                    children: getFolderStructure(fullPath, format, depth + 1, maxDepth)
                };
            } else {
                structure[file] = {
                    type: 'file',
                    size: stats.size // Add file size
                };
            }
        } else if (format === 'line' || format === 'arrow') {
            const prefix = format === 'line' ? '├── ' : '-> ';
            structure += `${' '.repeat(depth * 4)}${prefix}${file}
`;
            if (isDir) {
                structure += getFolderStructure(fullPath, format, depth + 1, maxDepth);
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
        if (value.type === 'directory') {
            // Recursively validate subdirectories
            validateFolderStructure(value.children);
        } else if (value.type !== 'file') {
            // Only 'file' is allowed for files, other values are invalid
            throw new Error(`Invalid structure: File type should be 'file', but found '${value.type}' for '${key}'.`);
        }
    }
}

// Export folder structure to desired format
function exportStructure(dir, output, maxDepth = Infinity) {
    try {
        // Determine format based on file extension
        const ext = path.extname(output).toLowerCase();
        let format;

        if (ext === '.json') {
            format = 'json';
        } else if (ext === '.txt') {
            format = 'line'; // Default to 'line' for .txt files
        } else {
            throw new Error('Unsupported file extension. Use .json or .txt');
        }

        const structure = getFolderStructure(dir, format, 0, maxDepth);

        // Handle output based on format
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
