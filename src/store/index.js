 /**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { formatReference } from '../utils/format-reference';

export const STORE_NAME = 'wp-reference-manager/references';

const DEFAULT_STATE = {
    references: [],
    isLoading: false,
    error: null
};

const actions = {
    setReferences(references) {
        return {
            type: 'SET_REFERENCES',
            references,
        };
    },

    setLoading(isLoading) {
        return {
            type: 'SET_LOADING',
            isLoading,
        };
    },

    setError(error) {
        return {
            type: 'SET_ERROR',
            error,
        };
    },

    *fetchReferences() {
        try {
            const postId = select('core/editor').getCurrentPostId();
            yield { type: 'SET_LOADING', isLoading: true };
            
            const response = yield apiFetch({
                path: `/wp-reference-manager/v1/references/${postId}`,
                method: 'GET'
            });
            
            yield { 
                type: 'SET_REFERENCES',
                references: response || []
            };
        } catch (error) {
            yield { 
                type: 'SET_ERROR',
                error: error.message
            };
        } finally {
            yield { type: 'SET_LOADING', isLoading: false };
        }
    },

    *addReference(reference) {
        try {
            const postId = select('core/editor').getCurrentPostId();
            const currentReferences = select('wp-reference-manager').getReferences();
            const newReferences = [...currentReferences, reference];
            
            yield { type: 'SET_LOADING', isLoading: true };
            
            // Save to API
            yield apiFetch({
                path: `/wp-reference-manager/v1/references/${postId}`,
                method: 'POST',
                data: newReferences
            });
            
            // Update local state
            yield { 
                type: 'SET_REFERENCES',
                references: newReferences
            };
        } catch (error) {
            yield { 
                type: 'SET_ERROR',
                error: error.message
            };
        } finally {
            yield { type: 'SET_LOADING', isLoading: false };
        }
    }
};

const selectors = {
    getReferences(state) {
        return state.references;
    },

    getReferencesArray(state) {
        return state.references;
    },

    getReference(state, referenceId) {
        return state.references.find(ref => ref.id === referenceId);
    },

    getFormattedReferences(state) {
        return state.references.map(formatReference);
    },

    isLoading(state) {
        return state.isLoading;
    },

    getError(state) {
        return state.error;
    }
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'SET_REFERENCES':
            return {
                ...state,
                references: action.references,
                error: null
            };
        
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            };
        
        case 'SET_ERROR':
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
};

const store = createReduxStore(STORE_NAME, {
    reducer,
    actions,
    selectors,
});

register(store);
