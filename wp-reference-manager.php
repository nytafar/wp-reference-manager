<?php
/**
 * Plugin Name: WP Reference Manager
 * Plugin URI: https://your-website.com/wp-reference-manager
 * Description: A modern block editor plugin for managing references, citations, and footnotes with support for PMID, DOI, URL, and ISBN.
 * Version: 1.1.0
 * Author: Your Name
 * Author URI: https://your-website.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: wp-reference-manager
 * Domain Path: /languages
 *
 * @package WP_Reference_Manager
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('WP_REFERENCE_MANAGER_VERSION', '1.1.0');
define('WP_REFERENCE_MANAGER_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WP_REFERENCE_MANAGER_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main plugin class
 */
class WP_Reference_Manager {
    /**
     * Instance of this class
     *
     * @var WP_Reference_Manager
     */
    private static $instance = null;

    /**
     * Get instance of this class
     *
     * @return WP_Reference_Manager
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        $this->init();
    }

    /**
     * Initialize plugin
     */
    private function init() {
        // Load translations
        add_action('init', array($this, 'load_textdomain'));

        // Register post meta
        add_action('init', array($this, 'register_post_meta'));

        // Register blocks
        add_action('init', array($this, 'register_blocks'));

        // Enqueue editor assets
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));
    }

    /**
     * Load plugin textdomain
     */
    public function load_textdomain() {
        load_plugin_textdomain(
            'wp-reference-manager',
            false,
            dirname(plugin_basename(__FILE__)) . '/languages'
        );
    }

    /**
     * Register post meta
     */
    public function register_post_meta() {
        register_post_meta('', '_wp_reference_list', array(
            'show_in_rest' => true,
            'single' => true,
            'type' => 'array',
            'default' => array(),
        ));
    }

    /**
     * Register blocks
     */
    public function register_blocks() {
        // Register blocks here
        if (!function_exists('register_block_type')) {
            return;
        }

        // Will be implemented in blocks/index.js
        register_block_type('wp-reference-manager/citation-block');
        register_block_type('wp-reference-manager/footnote-block');
        register_block_type('wp-reference-manager/reference-list-block');
    }

    /**
     * Enqueue editor assets
     */
    public function enqueue_editor_assets() {
        $asset_file_path = WP_REFERENCE_MANAGER_PLUGIN_DIR . 'build/index.asset.php';
        
        if (!file_exists($asset_file_path)) {
            error_log('WP Reference Manager: Asset file not found: ' . $asset_file_path);
            return;
        }

        $asset_file = include($asset_file_path);
        
        if (!is_array($asset_file) || !isset($asset_file['dependencies']) || !isset($asset_file['version'])) {
            error_log('WP Reference Manager: Invalid asset file structure');
            return;
        }

        wp_enqueue_script(
            'wp-reference-manager-editor',
            WP_REFERENCE_MANAGER_PLUGIN_URL . 'build/index.js',
            array_merge($asset_file['dependencies'], array('wp-plugins', 'wp-edit-post')),
            $asset_file['version']
        );

        wp_enqueue_style(
            'wp-reference-manager-editor',
            WP_REFERENCE_MANAGER_PLUGIN_URL . 'build/style-main.css',
            array('wp-edit-blocks'),
            $asset_file['version']
        );
    }
}

// Initialize the plugin
function wp_reference_manager() {
    return WP_Reference_Manager::get_instance();
}

// Start the plugin
wp_reference_manager();
