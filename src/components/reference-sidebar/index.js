/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/edit-post';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export function ReferenceSidebar() {
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
                />
                <Button
                    isPrimary
                    onClick={() => {
                        // TODO: Implement reference fetching
                        console.log('Fetching reference...');
                    }}
                >
                    {__('Add Reference', 'wp-reference-manager')}
                </Button>
            </PanelBody>
        </PluginSidebar>
    );
}
