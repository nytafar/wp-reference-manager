/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ReferenceSidebar } from './components/reference-sidebar';
import './style.css';

registerPlugin('wp-reference-manager', {
    render: ReferenceSidebar,
    icon: 'book-alt',
});
