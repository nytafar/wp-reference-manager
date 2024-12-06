/**
 * Utility functions for fetching reference metadata
 */

/**
 * Fetch metadata for a DOI
 * @param {string} doi - The DOI to fetch metadata for
 * @returns {Promise} - Resolves with the metadata
 */
export const fetchDOIMetadata = async (doi) => {
    try {
        const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch DOI metadata');
        }

        const data = await response.json();
        return formatCrossRefData(data.message);
    } catch (error) {
        console.error('Error fetching DOI metadata:', error);
        throw error;
    }
};

/**
 * Fetch metadata for a PMID
 * @param {string} pmid - The PMID to fetch metadata for
 * @returns {Promise} - Resolves with the metadata
 */
export const fetchPMIDMetadata = async (pmid) => {
    try {
        const response = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmid}&retmode=json`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch PMID metadata');
        }

        const data = await response.json();
        return formatPubMedData(data.result[pmid]);
    } catch (error) {
        console.error('Error fetching PMID metadata:', error);
        throw error;
    }
};

/**
 * Format CrossRef data into a standardized format
 * @param {Object} data - The raw CrossRef data
 * @returns {Object} - The formatted reference data
 */
const formatCrossRefData = (data) => {
    return {
        title: data.title?.[0] || '',
        authors: data.author?.map(author => ({
            firstName: author.given || '',
            lastName: author.family || '',
        })) || [],
        journal: data['container-title']?.[0] || '',
        year: data.published?.['date-parts']?.[0]?.[0] || '',
        volume: data.volume || '',
        issue: data.issue || '',
        pages: data.page || '',
        doi: data.DOI || '',
        url: data.URL || '',
    };
};

/**
 * Format PubMed data into a standardized format
 * @param {Object} data - The raw PubMed data
 * @returns {Object} - The formatted reference data
 */
const formatPubMedData = (data) => {
    return {
        title: data.title || '',
        authors: data.authors?.map(author => ({
            firstName: author.name.split(' ').slice(1).join(' '),
            lastName: author.name.split(' ')[0],
        })) || [],
        journal: data.fulljournalname || '',
        year: data.pubdate?.split(' ')?.[0] || '',
        volume: data.volume || '',
        issue: data.issue || '',
        pages: data.pages || '',
        pmid: data.uid || '',
        doi: data.elocationid?.replace('doi: ', '') || '',
    };
};
