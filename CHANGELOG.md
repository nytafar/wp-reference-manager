# Changelog
All notable changes to WP Reference Manager will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2024-12-06
### Added
- Initial plugin structure and setup
- Block editor sidebar integration
- Reference management interface in the editor
- Basic plugin architecture with WordPress hooks
- Webpack build configuration
- Development environment setup
- Automated version bumping based on commit messages
- Pre-commit hook to enforce changelog updates
- Scripts for managing versions across all files

### Changed
- Updated build process to handle asset compilation correctly
- Modified webpack config to output correct file names
- Updated plugin file structure to follow WordPress standards
- Updated package.json to include new automation scripts
- Modified build process to maintain version consistency

### Fixed
- Asset loading issues in the WordPress admin
- MIME type errors for JavaScript and CSS files
- Webpack build output file naming

## [1.0.0] - 2024-03-06
### Added
- Initial release
- Basic plugin structure
- WordPress block editor integration
- Reference sidebar component
- Asset compilation with webpack
- Plugin activation/deactivation hooks
- Basic documentation

[Unreleased]: https://github.com/nytafar/wp-reference-manager/compare/v1.0.2...HEAD
[1.0.2]: https://github.com/nytafar/wp-reference-manager/compare/v1.0.0...v1.0.2
[1.0.0]: https://github.com/nytafar/wp-reference-manager/releases/tag/v1.0.0
