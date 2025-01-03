const { Command } = require('commander');
const { exportStructure, interactiveMode } = require('./lib/exportStructure');
const { createStructure } = require('./lib/createStructure');
const { generateApiStructure } = require('./lib/generateApiStructure');
const { generateStructureFromDiagram } = require('./lib/fromDiagram');

const program = new Command();

program
    .name('structify')
    .description('CLI tool to manage folder structures')
    .version('1.0.0');

// Export folder structure
program
    .command('export <dir>')
    .description('Export folder structure to a specified format')
    .option('-o, --output <file>', 'Output file', 'structure.json')
    .option('--format <type>', 'Format of the folder structure (json, line, arrow)', 'json')
    .action((dir, options) => {
        exportStructure(dir, options.output, options.format);
    });

// Create folder structure
program
    .command('create <jsonFile> <targetDir>')
    .description('Create folder structure from JSON file')
    .action((jsonFile, targetDir) => {
        createStructure(jsonFile, targetDir);
    });

// Interactive mode
program
    .command('interactive')
    .description('Start an interactive session')
    .action(() => {
        interactiveMode();
    });
program
    .command('apistr <jsonFile> <targetDir>')
    .description('Generate folder structure for API endpoints')
    .action((jsonFile, targetDir) => {
        generateApiStructure(jsonFile, targetDir);
    });
program
    .command('from-diagram <parsedDataFile> <targetDir>')
    .description('Generate folder structure from parsed system design diagram')
    .action((parsedDataFile, targetDir) => {
        const parsedData = require(parsedDataFile);
        generateStructureFromDiagram(parsedData, targetDir);
    });

if (require.main === module) {
    program.parse(process.argv);
}

module.exports = program;
