/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { ComboboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { STORE_NAME } from '../../store';

export function ReferenceSelector({ value, onChange }) {
    const references = useSelect((select) => {
        return select(STORE_NAME).getReferencesArray();
    }, []);

    const options = references.map((ref) => ({
        value: ref.id,
        label: `${ref.authors} (${ref.year}) - ${ref.title}`,
    }));

    return (
        <ComboboxControl
            label={__('Select Reference', 'wp-reference-manager')}
            value={value}
            onChange={onChange}
            options={options}
            help={__('Choose a reference from your library', 'wp-reference-manager')}
        />
    );
}
