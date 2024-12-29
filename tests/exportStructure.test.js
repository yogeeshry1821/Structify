const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { exportStructure } = require('../lib/exportStructure');

const testDir = path.join(__dirname, 'testProject');
const testOutputFile = path.join(__dirname, 'output.json');

// Create a test folder structure
function setupTestEnvironment() {
    if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir);
    }

    fs.writeFileSync(path.join(testDir, 'index.js'), '');
    fs.writeFileSync(path.join(testDir, 'package.json'), '');
    const subDir = path.join(testDir, 'src');
    if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir);
    }
    fs.writeFileSync(path.join(subDir, 'app.js'), '');
    fs.writeFileSync(path.join(subDir, 'styles.css'), '');
}

// Clean up test folder structure
function cleanupTestEnvironment() {
    fs.rmSync(testDir, { recursive: true, force: true });
    if (fs.existsSync(testOutputFile)) {
        fs.unlinkSync(testOutputFile);
    }
}

describe('exportStructure', () => {
    before(() => {
        setupTestEnvironment();
    });

    after(() => {
        cleanupTestEnvironment();
    });

    it('should export the correct folder structure with extensions', () => {
        exportStructure(testDir, testOutputFile);

        const output = JSON.parse(fs.readFileSync(testOutputFile, 'utf-8'));

        const expected = {
            "index.js": ".js",
            "package.json": ".json",
            "src": {
                "app.js": ".js",
                "styles.css": ".css"
            }
        };

        assert.deepStrictEqual(output, expected, 'The exported structure does not match the expected structure.');
    });
});
