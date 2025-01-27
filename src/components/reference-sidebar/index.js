/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/editor';
import { PanelBody, TextControl, Button, Spinner } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { STORE_NAME } from '../../store';

export function ReferenceSidebar() {
    const { fetchReferences, addReference } = useDispatch(STORE_NAME);
    const { references, isLoading, error } = useSelect(select => ({
        references: select(STORE_NAME).getReferences(),
        isLoading: select(STORE_NAME).isLoading(),
        error: select(STORE_NAME).getError()
    }));

    // Fetch references when the editor loads
    useEffect(() => {
        fetchReferences();
    }, []);

    return (
        <PluginSidebar
            name="wp-reference-manager-sidebar"
            title={__('Reference Manager', 'wp-reference-manager')}
            icon="book-alt"
        >
            <PanelBody
                title={__('Add Reference', 'wp-reference-manager')}
                initialOpen={true}
            >
                <TextControl
                    label={__('DOI, PMID, or URL', 'wp-reference-manager')}
                    help={__('Enter a DOI, PMID, or URL to fetch reference details', 'wp-reference-manager')}
                    __nextHasNoMarginBottom={true}
                />
                <Button
                    isPrimary
                    onClick={() => {
                        // TODO: Implement reference fetching
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner /> : __('Add Reference', 'wp-reference-manager')}
                </Button>

                {error && (
                    <div className="components-notice is-error">
                        <p>{error}</p>
                    </div>
                )}

                {references.length > 0 && (
                    <div className="reference-list">
                        <h3>{__('References', 'wp-reference-manager')}</h3>
                        <ul>
                            {references.map((ref, index) => (
                                <li key={index}>{ref.title}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </PanelBody>
        </PluginSidebar>
    );
}
