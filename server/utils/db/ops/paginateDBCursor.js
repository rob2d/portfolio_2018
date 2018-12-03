/**
 * Takes result of a database query and 
 * applies pagination as necessary
 * 
 * @param {Number} param0.limit number of entries to return
 * @param {Number} param0.startAt where to start in the results 
 *                          (0-indexed)
 */
module.exports = function paginateDBCursor ({ limit, startAt, dbCursor }) {
    let dbResult = dbCursor; // store changes in dbCursor

    if(startAt) { dbResult = dbResult.skip(startAt); }
    if(limit)   { dbResult = dbResult.limit(limit);    }

    return dbResult;
}