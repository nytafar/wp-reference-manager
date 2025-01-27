/**
 * Action types
 */
export const ADD_REFERENCE = 'ADD_REFERENCE';
export const UPDATE_REFERENCE = 'UPDATE_REFERENCE';
export const REMOVE_REFERENCE = 'REMOVE_REFERENCE';

/**
 * Add a new reference
 *
 * @param {Object} reference Reference object
 * @return {Object} Action object
 */
export function addReference(reference) {
    return {
        type: ADD_REFERENCE,
        reference,
    };
}

/**
 * Update an existing reference
 *
 * @param {string} id Reference ID
 * @param {Object} reference Updated reference object
 * @return {Object} Action object
 */
export function updateReference(id, reference) {
    return {
        type: UPDATE_REFERENCE,
        id,
        reference,
    };
}

/**
 * Remove a reference
 *
 * @param {string} id Reference ID
 * @return {Object} Action object
 */
export function removeReference(id) {
    return {
        type: REMOVE_REFERENCE,
        id,
    };
}
