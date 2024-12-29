const { Command } = require('commander');
const { exportStructure } = require('./lib/exportStructure');
const { createStructure } = require('./lib/createStructure');

const program = new Command();

program
    .name('structify')
    .description('CLI tool to manage folder structures')
    .version('1.0.0');

// Export folder structure
program
    .command('export <dir>')
    .description('Export folder structure to JSON')
    .option('-o, --output <file>', 'Output file', 'structure.json')
    .action((dir, options) => {
        exportStructure(dir, options.output);
    });

// Create folder structure
program
    .command('create <jsonFile> <targetDir>')
    .description('Create folder structure from JSON file')
    .action((jsonFile, targetDir) => {
        createStructure(jsonFile, targetDir);
    });

module.exports = program;
