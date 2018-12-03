const createDeleteRequest = ({ entry, collection }) => {
    return collection.deleteMany(entry, { 
        writeConcern: { w: 'majority', wtimeout: 5000 } 
    } );
};

const sleep = ms => {
    return new Promise( resolve => {
        setTimeout(() => { resolve() }, ms)
    });
};

/**
  * Delete data from mongo DB
  * @param {*} param0
  * @param {Object} param0.keys set of keys 
  */
module.exports = function({ collection, data }){
    return new Promise((resolve, reject)=> {
        // first, normalize request data to always 
        // be an array
    
        data = Array.isArray(data) ? data : [data];

        // run all requests, then when all async ops
        // are done, resolve or reject as needed
        const deleteRequests = data.map( entry => {
            if(Object.keys(entry).length == 0) {
                    throw new Error('Cannot delete empty objects! ' + 
                        'Trying to run this would remove entire ' + 
                        'MongoDB collection'
                );
            } else {
                const entryKeys = Object.keys(entry);
                //entry['inactive']=0;
                entryKeys.forEach( key => {
                    if(Array.isArray(entry[key])) {
                        entry[key] = { $in : entry[key] };
                    }
                    else if(key.charAt(0) == '$') {
                        throw new Error(
                            'No MongoDB operators ' +
                            'allowed in delete query!'
                        );
                    }
                });

            }

            createDeleteRequest({ entry, collection })
        });

        Promise.all(deleteRequests)
            .then( sleep(2500) ) // for the sake of non ACID 
            .then( resolve )     // (super hacky; time related)
            .catch( reject );
    });
}