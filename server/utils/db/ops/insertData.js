/**
 * Inserts data into a mongo DB
 * (vs upsert, this simply adds new 
 *  entries and does not sanitize key types)
 * @param {*} param0 
 */
module.exports = function({ collection, data }){

    // first, normalize request data to always 
    // be an array
    
    data = Array.isArray(data) ? data : [data];

    // run all requests, then when all async ops
    // are done, resolve or reject as needed

    return collection.insertAll( data );

}