const fs = require('fs');
const path = require('path');

function generateStructureFromDiagram(data, targetDir) {
    const structure = {};

    // Convert parsed data to folder structure
    data.services.forEach(service => {
        const dirName = service.name.toLowerCase().replace(/\s+/g, '-');
        structure[dirName] = {
            files: ['index.js'], // Boilerplate files
            subdirs: []
        };
    });

    // Write to target directory
    for (const [dir, content] of Object.entries(structure)) {
        const dirPath = path.join(targetDir, dir);
        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

        content.files.forEach(file => {
            fs.writeFileSync(path.join(dirPath, file), '', 'utf8');
        });
    }
}

module.exports = { generateStructureFromDiagram };
