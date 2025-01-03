const fs = require('fs');
const path = require('path');

// Generate API folder structure
function generateApiStructure(jsonFile, targetDir) {
    try {
        const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

        if (!data.services || !Array.isArray(data.services)) {
            throw new Error('Invalid JSON: Expected "services" to be an array.');
        }

        data.services.forEach(service => {
            const serviceDir = path.join(targetDir, service.name);
            fs.mkdirSync(serviceDir, { recursive: true });

            if (!service.endpoints || !Array.isArray(service.endpoints)) {
                throw new Error(`Invalid JSON: "endpoints" for service "${service.name}" must be an array.`);
            }

            service.endpoints.forEach(endpoint => {
                const folderName = `${endpoint.method}_${endpoint.path.replace(/\//g, '_').replace(/__/, '_')}`;
                const endpointDir = path.join(serviceDir, folderName);
                fs.mkdirSync(endpointDir, { recursive: true });

                // Generate files
                fs.writeFileSync(path.join(endpointDir, 'handler.js'), `// Handler for ${endpoint.method} ${endpoint.path}`);
                fs.writeFileSync(path.join(endpointDir, 'validator.js'), `// Validator for ${endpoint.method} ${endpoint.path}`);
            });
        });

        console.log(`API structure generated at: ${targetDir}`);
    } catch (err) {
        console.error('Error generating API structure:', err.message);
    }
}

module.exports = { generateApiStructure };
