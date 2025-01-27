/**
 * Get all references
 *
 * @param {Object} state Global state
 * @return {Object} References object
 */
export function getReferences(state) {
    return state.references;
}

/**
 * Get a specific reference by ID
 *
 * @param {Object} state Global state
 * @param {string} id    Reference ID
 * @return {Object} Reference object
 */
export function getReference(state, id) {
    return state.references[id];
}

/**
 * Get references as an array
 *
 * @param {Object} state Global state
 * @return {Array} Array of references
 */
export function getReferencesArray(state) {
    return Object.values(state.references);
}
