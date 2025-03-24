# Custom File Management CLI

A command-line interface (CLI) tool built with Node.js that provides basic file management operations like reading, writing, searching, and deleting files. The CLI offers two implementations - one using native Node.js modules and another using Commander.js library.

## Features

- Read file contents
- Write content to files
- Append content to existing files
- Search for files recursively in directories
- Delete files
- Count lines in files (Commander version)
- Count words in files (Commander version)

## Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd custom_cli
```

2. Install dependencies:
```sh
npm install
```

## Usage

### Basic Version (index.js)

```sh
# Read a file
node index.js read <filename>

# Write to a file
node index.js write <filename> <content>

# Append to a file
node index.js append <filename> <content>

# Search for a file
node index.js search <filename> [directory]

# Delete a file
node index.js delete <filename>
```

### Commander Version (index.commander.js)

```sh
# Count lines in a file
node index.commander.js count <filename>

# Count words in a file
node index.commander.js count_words <filename>

# Show help
node index.commander.js --help
```

## Examples

```sh
# Read a file
node index.js read test.txt

# Write to a file
node index.js write example.txt "Hello World"

# Search for a file in current directory
node index.js search test.txt

# Count lines in a file using Commander version
node index.commander.js count test.txt
```

## Dependencies

- commander: ^5.1.0 - For building CLI interface with commands

## License

ISC