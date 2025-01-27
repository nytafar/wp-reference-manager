/**
 * Internal dependencies
 */
import { ADD_REFERENCE, UPDATE_REFERENCE, REMOVE_REFERENCE } from './actions';

const DEFAULT_STATE = {
    references: {},
};

/**
 * Reducer for managing references
 *
 * @param {Object} state  Current state
 * @param {Object} action Action object
 * @return {Object} Updated state
 */
export default function reducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case ADD_REFERENCE:
            return {
                ...state,
                references: {
                    ...state.references,
                    [action.reference.id]: action.reference,
                },
            };

        case UPDATE_REFERENCE:
            return {
                ...state,
                references: {
                    ...state.references,
                    [action.id]: {
                        ...state.references[action.id],
                        ...action.reference,
                    },
                },
            };

        case REMOVE_REFERENCE:
            const { [action.id]: removed, ...remainingReferences } = state.references;
            return {
                ...state,
                references: remainingReferences,
            };

        default:
            return state;
    }
}
