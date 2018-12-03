/**
 * Accepts pagination parameters from an object 
 * representing request query strings, and returns
 * a pagination object if valid params found, or undefined
 * otherwise
 * 
 * @param {Object} query 
 * @returns Object containing { (limit, startAt) } if valid params 
 *          detected, or unknown otherwise
 */
module.exports = function getPaginationParams(query) {
    if(typeof query.limit != 'undefined' || typeof query.startAt != 'undefined') {
        const paginationParams = {};
        let hasValidParams = false;

        if(typeof query.limit != 'undefined' && parseInt(query.limit) > 0) {
            paginationParams.limit = parseInt(query.limit);
            hasValidParams = true;
        }

        if(query.startAt != 'undefined' && parseInt(query.startAt) > 0) {
            paginationParams.startAt = parseInt(query.startAt);
            hasValidParams = true;            
        }

        return hasValidParams ? paginationParams : undefined;
    } else {
        return undefined;
    }
}