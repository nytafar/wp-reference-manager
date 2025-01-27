/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { registerBlockType } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './store';
import { ReferenceSidebar } from './components/reference-sidebar';
import { ReferenceSelector } from './components/reference-selector';
import { formatReference } from './utils/format-reference';
import { STORE_NAME } from './store';
import { footnoteAttributes } from './attributes';
import './style.css';

// Register the sidebar plugin
registerPlugin('wp-reference-manager', {
    render: ReferenceSidebar,
    icon: 'book-alt'
});

// Add reference selector to footnote
const withReferenceSelector = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/footnote') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const { reference } = attributes;

        // Get the reference data from the store
        const referenceData = useSelect((select) => {
            if (!reference) return null;
            return select(STORE_NAME).getReference(reference);
        }, [reference]);

        return (
            <Fragment>
                <BlockEdit {...props} />
                <ReferenceSelector
                    value={reference}
                    onChange={(newReference) => {
                        setAttributes({
                            reference: newReference,
                            content: newReference && referenceData ? formatReference(referenceData) : ''
                        });
                    }}
                />
            </Fragment>
        );
    };
}, 'withReferenceSelector');

// Register the higher-order component
addFilter(
    'editor.BlockEdit',
    'wp-reference-manager/with-reference-selector',
    withReferenceSelector
);

// Add reference attributes to footnote block
addFilter(
    'blocks.registerBlockType',
    'wp-reference-manager/footnote-attributes',
    (settings, name) => {
        if (name !== 'core/footnote') {
            return settings;
        }

        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                ...footnoteAttributes,
            },
        };
    }
);
