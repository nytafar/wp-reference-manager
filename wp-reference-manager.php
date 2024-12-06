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

        // Fetch and display reference list in the editor
        add_action('rest_api_init', function() {
            register_rest_field('post', '_wp_reference_list', array(
                'get_callback' => function($post_arr) {
                    return get_post_meta($post_arr['id'], '_wp_reference_list', true);
                },
                'schema' => array(
                    'type' => 'array',
                    'context' => array('view', 'edit')
                ),
            ));
        });

        // Enqueue editor assets
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));

        // Save reference list to post meta on post save
        add_action('save_post', array($this, 'save_reference_list'));
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
            'show_in_rest' => array(
                'schema' => array(
                    'type' => 'array',
                    'items' => array(
                        'type' => 'string', // Assuming each reference is a string
                    ),
                ),
            ),
            'single' => true,
            'type' => 'array',
            'default' => array(),
            'auth_callback' => function() {
                return current_user_can('edit_posts');
            },
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

    /**
     * Save reference list to post meta on post save
     *
     * @param int $post_id The ID of the post being saved.
     */
    public function save_reference_list($post_id) {
        // Check if this is an autosave or a revision, and if so, return early
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        if (wp_is_post_revision($post_id)) {
            return;
        }

        // Check if the current user has permission to edit the post
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        // Get the reference list from the request
        $reference_list = isset($_POST['_wp_reference_list']) ? $_POST['_wp_reference_list'] : [];

        // Log the reference list for debugging
        error_log('Saving reference list for post ID ' . $post_id . ': ' . print_r($reference_list, true));

        // Update the post meta
        update_post_meta($post_id, '_wp_reference_list', $reference_list);
    }
}

// Initialize the plugin
function wp_reference_manager() {
    return WP_Reference_Manager::get_instance();
}

// Start the plugin
wp_reference_manager();
