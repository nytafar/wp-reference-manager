/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import {
    Panel,
    PanelBody,
    PanelRow,
    TextControl,
    Button,
    Spinner,
    Notice,
} from '@wordpress/components';
import { PluginSidebar } from '@wordpress/edit-post';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { fetchDOIMetadata, fetchPMIDMetadata } from '../utils/reference-api';

export const ReferenceSidebar = () => {
    const [identifier, setIdentifier] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const references = useSelect(select => 
        select('core/editor').getEditedPostAttribute('meta')?.['_wp_reference_list'] || []
    );
    
    const { editPost } = useDispatch('core/editor');

    const handleAddReference = async () => {
        setIsLoading(true);
        setError(null);

        try {
            let metadata;
            if (identifier.toLowerCase().startsWith('10.')) {
                metadata = await fetchDOIMetadata(identifier);
            } else {
                metadata = await fetchPMIDMetadata(identifier);
            }

            const updatedReferences = [...references, metadata];
            editPost({
                meta: {
                    '_wp_reference_list': updatedReferences,
                },
            });

            setIdentifier('');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveReference = (index) => {
        const updatedReferences = references.filter((_, i) => i !== index);
        editPost({
            meta: {
                '_wp_reference_list': updatedReferences,
            },
        });
    };

    return (
        <PluginSidebar
            name="reference-list-sidebar"
            title={__('References', 'wp-reference-manager')}
        >
            <Panel>
                <PanelBody title={__('Add Reference', 'wp-reference-manager')} initialOpen={true}>
                    <PanelRow>
                        <TextControl
                            label={__('DOI or PMID', 'wp-reference-manager')}
                            value={identifier}
                            onChange={setIdentifier}
                            placeholder="10.1000/example or 12345678"
                        />
                    </PanelRow>
                    <PanelRow>
                        <Button
                            isPrimary
                            onClick={handleAddReference}
                            disabled={!identifier || isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner />
                                    {__('Loading...', 'wp-reference-manager')}
                                </>
                            ) : (
                                __('Add Reference', 'wp-reference-manager')
                            )}
                        </Button>
                    </PanelRow>
                    {error && (
                        <Notice status="error" isDismissible={false}>
                            {error}
                        </Notice>
                    )}
                </PanelBody>

                <PanelBody title={__('Reference List', 'wp-reference-manager')} initialOpen={true}>
                    {references.length === 0 ? (
                        <p>{__('No references added yet.', 'wp-reference-manager')}</p>
                    ) : (
                        references.map((ref, index) => (
                            <div key={index} className="reference-item">
                                <h4>{ref.title}</h4>
                                <p>
                                    {ref.authors
                                        .map(author => `${author.lastName}, ${author.firstName}`)
                                        .join('; ')}
                                </p>
                                <p>{`${ref.journal} (${ref.year})`}</p>
                                <Button
                                    isDestructive
                                    onClick={() => handleRemoveReference(index)}
                                >
                                    {__('Remove', 'wp-reference-manager')}
                                </Button>
                            </div>
                        ))
                    )}
                </PanelBody>
            </Panel>
        </PluginSidebar>
    );
};
