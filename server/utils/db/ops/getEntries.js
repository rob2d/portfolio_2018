const paginateDBCursor = require('./paginateDBCursor');
const xformPaginatedResults = require('./xformPaginatedResults');

/**
 * Helper function to populate a query with key:[keyValues]
 * @param {*} param0 
 * @param {String} keyField
 * @param {Array} keyValues
 */
const addKeyValueSetToQuery = ({ keyField, keyValues, query }) => {
    
    query.$or = query.$or || []; // create or statement array if needed

    keyValues = Array.isArray(keyValues) ? keyValues : [keyValues];

    // add key values clauses to query
    keyValues.forEach((value)=> {
        query.$or.push({ [keyField] : value + '' });
        query.$or.push({ [keyField] : parseInt(value) });           
    });
};

/**
 * Upserts data into a mongo DB
 * 
 * @param {*} param0 
 * @param {Object} param0.pagination
 * @param {Number} param0.pagination.limit number of items to paginate per request
 * @param {Number} param0.pagination.startAt starting index to paginate from
 * @param {Object} param0.filter query for MongoDB filter
 * @param {Array|String|Number} param0.keyValue (optional) value to search for (this can be an array)
 * @param {Object} param0.keyValueSets an object with namespaces for key value array queries. 
 *                                          e.g.  {keyField1 : keyValue1, keyield2}
 * @param {Object} param0.projectionFields an object containing the projection fields to include in the results
 */
module.exports = function({ 
    collection, 
    sort, 
    keyField, 
    keyValue, 
    keyValueSets, 
    filter, 
    projectionFields, 
    pagination
    , includeInactive=false 
}){
    return new Promise((resolve, reject)=> {

        let query = {};
        let queryResultCount;

        // if projection fields are given as an
        // array of strings instead of in MongoDB
        // format, convert those to a set of
        // objects with keys and corresponding value
        // of 1; e.g. ['Id', 'Value'] => { Id:1, Value:1 }
 

        if(projectionFields && Array.isArray(projectionFields)) {
            projectionFields = projectionFields.reduce((object, fieldName)=> {
                object[fieldName] = 1;
                return object;
            }, {});
        }

        const shouldFilterByKey = (typeof keyValue != 'undefined' || 
            (typeof keyValueSets != 'undefined' && Object.keys(keyValueSets).length > 0));

        // assert for keyValue having a keyField
        if(shouldFilterByKey && typeof keyField == 'undefined' && typeof keyValueSets == 'undefined') {
            throw new Error('keyField but no keyValue or keyValueSets' + 
                                'provided to getEntries call');
        }

        // populate the query info according to
        // key values if we're providing search criteria

        if(shouldFilterByKey) {
            
            // add query parameters for keyField if needed

            if(keyValueSets && Object.keys(keyValueSets).length > 0) {
                for(let keyField of Object.keys(keyValueSets)) {
                    addKeyValueSetToQuery({ 
                        keyField, 
                        keyValues : keyValueSets[keyField], 
                        query 
                    });
                }
            } else {
                const keyValues = Array.isArray(keyValue) ? keyValue : [ keyValue ];
                addKeyValueSetToQuery({ keyField, keyValues, query });
            }

            // depending on filter or not, use simple "or" or
            // concatenate that with our filter
            if(!filter) {
                if(Array.isArray(query.$or) && !query.$or.length) {
                    delete query.$or;
                }
            } else if(filter){
                // derive from and replace query object
                if(query.$or && query.$or.length) {
                    const newQuery = { $and : [ { $or : query.$or }, filter ] };
                    query = newQuery;
                } else {
                     // append all the filter fields to query 
                     // as it will be a simple object with no
                     // $and/$or operations

                     if(query.$or) {
                         delete query.$or;
                     }

                    Object.keys(filter).forEach((objKey) => {
                        query[objKey] = filter[objKey]; // no complex $or/$and needed for filter                
                    });
                } 
            }   
        } else {
            if(filter) {
                Object.keys(filter).forEach((objKey) => {
                    query[objKey] = filter[objKey]; // no complex $or/$and needed for filter                
                });
            }
        }
        
        // to call regardless of outcome later
        // which will exit this promise

        const handleDBResults = (results) => {
            // if filtering by just ONE key, only return
            // one result, or none for detecting 
            // no match

            if(shouldFilterByKey && !Array.isArray(keyValue) && typeof keyValueSets == 'undefined') {
                if(results.length > 0) { return resolve(results[0]); } 
                else { return resolve(undefined); }
            } 

            if(queryResultCount) {
                pagination.total = queryResultCount;
            }
            
            // otherwise, funnel back result
            // and add pagination if needed

            return resolve(xformPaginatedResults({ results, pagination }));
        };

        let dbCursor = undefined;
        
        // create a cursor that represents operations to perform
        
        dbCursor = (typeof projectionFields !== 'undefined')  ? 
                    collection.find(query, projectionFields) : 
                    collection.find(query);

        if(sort) {
            dbCursor.sort(sort);
        }

        // paginate if no key to search for provided
        // and if we paginate then we need to
        // execute promise to get result count separately

        if((!shouldFilterByKey || 
            (shouldFilterByKey && (Array.isArray(keyValue) || keyValueSets))) && 
            pagination
        ) {
            const params = {};

            params.dbCursor = dbCursor;

            if(typeof pagination.limit != 'undefined') {
                params.limit = pagination.limit;
            }

            if(typeof pagination.startAt != 'undefined') {
                params.startAt = pagination.startAt;
            }

            queryResultCount = dbCursor.count;
            dbCursor = paginateDBCursor(params);

            // we have to account for the "count" which
            // is a separate async operation in mongo
            dbCursor.count()
                .then((total)=>(
                    new Promise((resolve, reject)=> {
                        queryResultCount = total; // store result
                        dbCursor.toArray() // run db op for final results
                            .then( results => resolve(results) )
                            .catch( error => reject(error) );
                    })
                )).then(handleDBResults)
                .catch( error => {
                    console.error(error.stack); 
                    reject(error); 
                });
        } else {
            // otherwise we can just run ops and
            // handle results directly

            // we only anticipate 1 result with key result,
            // so be sure to limit that
            if( shouldFilterByKey &&  typeof keyValue !== 'undefined' && !Array.isArray(keyValue) ) {
                dbCursor = dbCursor.limit(1);
            }

            dbCursor.toArray()
                .then(handleDBResults)
                .catch( error => reject(error) );
        }
    });
}