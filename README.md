# Structify CLI

**Structify CLI** is a command-line tool that helps you easily create folder structures and generate JSON representations of project structures. It’s perfect for developers who want to set up their project directories quickly and manage their folder structures more efficiently.

Whether you're working on a new project or organizing your existing one, Structify can save you time by automating folder creation and making your project structure clear and organized.

## Features

- **Folder Structure Creation**: Automatically creates folders based on your specifications.
- **JSON Representation**: Generates a JSON file that represents the folder structure of a project from its root.
- **Custom Extensions**: Easily add extensions to your folder names for more structured organization.
- **Works Across Platforms**: Cross-platform support (Windows, MacOS, Linux).

## Installation

You can install `Structify` globally or locally. To use it, you'll need to install it via npm or yarn.

### Install Globally

To install the tool globally, run:

```bash
  npm install -g structify-cli
```

```bash
yarn global add structify-cli
```
### Install Globally

To install the tool globally, run:

```bash
npm install -g structify-cli
```

```bash
yarn global add structify-cli
```
Once installed globally, you can run the structify command from anywhere in your terminal.

# Install Locally
To install the tool locally for your project:

``` bash
npm install structify-cli --save-dev
```
or

```bash
yarn add structify-cli --dev
```

After installing it locally, you can run the tool via npx without the need for global installation:

```bash
npx structify-cli <command>
```

# Usage
Once installed, you can use structify via your terminal to create or generate folder structures.

1. Create Folder Structure
To create a folder structure from a specified JSON format, use the following command:

```bash
structify create <structure>
```

Where <structure> is a JSON object defining your desired folder structure. For example:

```json
{
  "src": {
    "components": {},
    "utils": {}
  },
  "tests": {}
}
```

This will create the following directory structure:

```src/
├── components/
├── utils/
tests/
```
2. Generate JSON Representation of Your Folder Structure
If you want to generate a JSON representation of your existing project structure, use:
```bash
structify generate
```
This will scan the current directory and output the folder structure as a JSON object.

Example output:

```json
{
  "src": {
    "index.js": {},
    "styles": {}
  },
  "tests": {}
}
```
3. Add Extensions to Folder Names
You can also create folder names with extensions by specifying them in the structure JSON. For example:

```json
{
  "src": {
    "components.tsx": {},
    "utils.js": {}
  }

}
```
This will create:

```bash
src/
├── components.tsx/
├── utils.js/
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

Developed by Yogeesh.