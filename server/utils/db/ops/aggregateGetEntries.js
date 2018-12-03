const xformPaginatedResults = require('./xformPaginatedResults');

/**
 * Aggregates data from MongoDB
 * 
 * @param {*} param0 
 * @param {Object} param0.pagination
 * @param {Number} param0.pagination.limit number of items to paginate per request
 * @param {Number} param0.pagination.startAt starting index to paginate from
 */
module.exports = function({ collection, queries, pagination }) {
    return new Promise((resolve, reject)=> {
        /**
         * Stores total if needed for pagination
         */
        let queryResultCount;

        
        if(pagination && pagination.startAt) {
            queries.push({
                $skip : pagination.startAt
            });
        }

        // pagination
        if(pagination && pagination.limit) {
            queries.push({
                $limit : pagination.limit
            });
        }

        
        // to call regardless of outcome later
        // which will exit this promise

        const handleDBResults = (results) => {

            if(queryResultCount) {
                pagination.total = queryResultCount;
            }
            
            // funnel back result
            // and add pagination if needed

            resolve(xformPaginatedResults({ results, pagination }));
        };

        // create a cursor that represents filter op
        let dbCursor = collection.aggregate(queries, { allowDiskUse: true });
        
        // paginate if no key to search for provided
        // and if we paginate then we need to
        // execute promise to get result count separately
        if(pagination) {
            const params = {};

            params.dbCursor = dbCursor;

            if(typeof pagination.limit != 'undefined') {
                params.limit = pagination.limit;
            }

            if(typeof pagination.startAt != 'undefined') {
                params.startAt = pagination.startAt;
            }

            queryResultCount = dbCursor.count;
            //dbCursor = paginateDBCursor(params);

            // we have to account for the "count" which
            // is a separate async operation in mongo
            dbCursor.toArray() // run db op for final results
                .then( handleDBResults )
                .catch( error => reject(error) );
        } else {
            // otherwise we can just run ops and
            // handle results directly

            dbCursor.toArray()
                .then(handleDBResults)
                .catch( error => reject(error) );
        }
    });
}