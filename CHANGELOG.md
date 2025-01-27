# Changelog
All notable changes to WP Reference Manager will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2025-01-27

## [1.1.1] - 2024-12-07
### Changed
- Added an `auth_callback` parameter to the `register_post_meta` function to ensure correct permissions when editing the `_wp_reference_list` post meta.

### Fixed
- Resolved permission issues preventing updates to the `_wp_reference_list` custom field.

## [1.1.0] - 2025-01-27
### Added
- Integration with WordPress native footnotes
- Reference store for managing citations
- Reference selector in footnote editor
- APA style reference formatting
- Automatic footnote content generation from references

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

[Unreleased]: https://github.com/nytafar/wp-reference-manager/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/nytafar/wp-reference-manager/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/nytafar/wp-reference-manager/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/nytafar/wp-reference-manager/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/nytafar/wp-reference-manager/compare/v1.0.0...v1.0.2
[1.0.0]: https://github.com/nytafar/wp-reference-manager/releases/tag/v1.0.0
