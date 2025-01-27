=== WP Reference Manager ===
Contributors: (your wordpress.org username)
Tags: references, citations, bibliography, academic, scholarly, footnotes
Requires at least: 6.0
Tested up to: 6.4
Stable tag: 1.2.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A modern block editor plugin for managing references and citations through WordPress native footnotes.

== Description ==

WP Reference Manager is a powerful yet easy-to-use reference management plugin for WordPress. It integrates seamlessly with WordPress native footnotes in the block editor (Gutenberg) to help you manage citations and references in your academic or professional content.

Features:
* Seamless integration with WordPress native footnotes
* Add references using PMID, DOI, URL, or ISBN
* Automatic reference fetching and metadata population
* APA style reference formatting
* Interactive reference sidebar in the block editor
* Real-time reference preview and selection
* Persistent reference storage across posts
* Clean and modern UI integrated with the block editor

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/wp-reference-manager` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Start using references in your posts through the block editor

== Usage ==

1. In the block editor, add a footnote block
2. Use the reference selector to choose or add a new reference
3. The footnote will be automatically formatted with your reference
4. Manage all your references through the sidebar

== Frequently Asked Questions ==

= Which citation format is supported? =

The plugin currently supports APA citation format. Support for additional citation styles is planned for future releases.

= Can I import references from other reference managers? =

Currently, the plugin supports adding references via identifiers (DOI, PMID, ISBN, URL). Import functionality from other reference managers is planned for future releases.

= How are references stored? =

References are stored in a dedicated database table and are associated with specific posts. This ensures that your references persist across sessions and are available whenever you need them.

== Changelog ==

= 1.0.2 =
* Added automated version bumping based on commit messages
* Added pre-commit hook to enforce changelog updates
* Added scripts for managing versions across files
* Updated build process to maintain version consistency

= 1.0.0 =
* Initial release
* Basic plugin architecture with WordPress hooks
* Block editor sidebar integration
* Basic reference management functionality

== Upgrade Notice ==

= 1.0.2 =
This version adds automated version management and improves build processes.

= 1.0.0 =
Initial release of WP Reference Manager.
