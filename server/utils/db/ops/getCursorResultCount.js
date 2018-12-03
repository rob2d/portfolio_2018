module.exports = function getCursorResultCount(dbCursor) {
    return new Promise((resolve, reject)=> {
            
        dbCursor.count()
            .then( total => resolve(total) )
            .catch( error => reject(error) );
    });
};