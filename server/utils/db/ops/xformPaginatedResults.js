/**
 * transform results based on whether
 * pagination exists or not to pass back to 
 * user request
 * 
 * @param {*} param0
 * @param {Array} results
 * @param {Object} pagination (optional)
 * @param {Number} pagination.limit
 * @param {Number} pagination.startAt 
 * @param {Number} pagination.total number of results without counting pagination
 */
module.exports = function xformPaginatedResults({ results, pagination }) {
    
    // if pagination wasn't provided, no op necessary
    if(!pagination) { return results; } 
    
    // otherwise, transform to include meta data

    const xformedResults = { results };

    if(pagination.limit) {
        xformedResults.limit = pagination.limit;
    }

    if(pagination.startAt) {
        xformedResults.startAt = pagination.startAt;
    }

    if(pagination.total) {
        xformedResults.total = pagination.total;
    }

    return xformedResults;
}