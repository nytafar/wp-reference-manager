# WP Reference Manager

A modern WordPress block editor plugin for managing references and citations through native WordPress footnotes.

## Features

- Seamless integration with WordPress native footnotes
- Add references using PMID, DOI, URL, or ISBN
- Automatic reference fetching and formatting in APA style
- Interactive reference sidebar in the block editor
- Real-time reference preview and selection
- Persistent reference storage across posts
- Clean and modern UI integrated with the block editor

## Installation

1. Upload the plugin files to the `/wp-content/plugins/wp-reference-manager` directory
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Start using references in your posts through the block editor

## Usage

1. In the block editor, add a footnote block
2. Use the reference selector to choose or add a new reference
3. The footnote will be automatically formatted with your reference
4. Manage all your references through the sidebar

## Development

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- WordPress (v6.0 or later)

### Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm start` for development
4. Run `npm run build` for production build

### Available Commands

- `npm start`: Start development mode
- `npm run build`: Build for production
- `npm run lint`: Run linting
- `npm run format`: Format code
- `npm run build:dist`: Create distribution package
- `npm run version-bump`: Update version numbers across files

## License

GPL v2 or later
