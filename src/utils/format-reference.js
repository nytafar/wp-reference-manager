/**
 * Format a reference in APA style
 * 
 * @param {Object} reference Reference object
 * @return {string} Formatted reference
 */
export function formatReference(reference) {
    if (!reference) {
        return '';
    }

    const {
        authors,
        year,
        title,
        journal,
        volume,
        issue,
        pages,
        doi,
    } = reference;

    // Format authors (Last, F. M., & Last, F. M.)
    const formattedAuthors = authors
        ? authors
            .split(',')
            .map((author) => author.trim())
            .join(', ')
        : '';

    // Basic citation (Authors, Year)
    let citation = `${formattedAuthors} (${year})`;

    // Add title if available
    if (title) {
        citation += `. ${title}`;
    }

    // Add journal information if available
    if (journal) {
        citation += `. ${journal}`;
        if (volume) {
            citation += `, ${volume}`;
            if (issue) {
                citation += `(${issue})`;
            }
        }
        if (pages) {
            citation += `, ${pages}`;
        }
    }

    // Add DOI if available
    if (doi) {
        citation += `. https://doi.org/${doi}`;
    }

    return citation;
}
