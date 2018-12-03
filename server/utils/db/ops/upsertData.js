const collectionKeyFields = global.require(
    './constants/dbCollectionKeys'
);
const PromiseUtils = global.require(
    './utils/PromiseUtils'
);

const { ObjectID } = require('mongodb');

function generateUpsertQuery ({ entry, keyFields }) {
    let upsertQuery;

    // assemble query by adding or with set where key exist
    // but another clause where numeric are parsed (in
    // case of user replacing numbers with strings).
    // note that we don't do every permutation though

    let hasNumerics = false;

    const defaultClauses = {};
    const numericClauses = {};

    if(typeof entry._id == 'undefined') {
        keyFields.forEach( keyField => {
            switch(keyField.type) {
                case 'number' :
                    hasNumerics = true;
                    entry[keyField.key] = parseInt(entry[keyField.key]);                           
                    defaultClauses[keyField.key] = entry[keyField.key];
                    numericClauses[keyField.key] = parseInt(entry[keyField.key]);
                    break;
                case 'string' :
                    hasNumerics = false;
                    entry[keyField.key] = entry[keyField.key] + '';                            
                    defaultClauses[keyField.key] = entry[keyField.key] + '';
                    numericClauses[keyField.key] = entry[keyField.key] + '';
                    break;
            }
        });

        if(hasNumerics) {
            upsertQuery = { 
                $or : [ defaultClauses, numericClauses ]
            };                    
        } else {
            upsertQuery = defaultClauses;
        }
    } else { 
        
        // always use explicit _id only if that
        // is provided!
        
        entry._id = ObjectID(entry._id);
        upsertQuery = { _id : entry._id };
    }

    return upsertQuery;
}

const createUpsertRequest = ({ entry, keyFields, collection })=> {
    const upsertQuery = generateUpsertQuery({ 
        entry, 
        keyFields 
    });
         // console.log(upsertQuery, entry);   
    return collection.replaceOne(
        upsertQuery, 
        entry, 
        { upsert : true }
    );
};

const createParallelRequests = ({ data, collection })=> {
    const keyFields = collectionKeyFields[collection.collectionName];
    
    return data.map( entry => 
        createUpsertRequest({ entry, keyFields, collection })
    );
}

const createBatchRequests = ({ data, collection })=> {
    const keyFields = collectionKeyFields[collection.collectionName];
    const bulkUpdates = [];
    let groupIndex = -1;

    data.forEach((entry,i) => {
        if((i % 1000) == 0) {
            groupIndex++;
            bulkUpdates.push([]);
        }
        bulkUpdates[groupIndex].push({
            replaceOne : {
                filter : generateUpsertQuery({ entry, keyFields }),
                replacement : entry,
                upsert : true
            }
        });
    });

    return bulkUpdates.map( bulkOps => (()=> 
        new Promise((resolve, reject)=>{ 
            collection.bulkWrite(bulkOps).then( result => {
                resolve(result); 
            }); 
    })));
};

const runParallelRequests = ({ data, collection }) => {
    return Promise.all(
        createParallelRequests({ data, collection })
    );
};


const runBatchRequests = ({ data, collection })=> {
    // TODO : format outputvia concat
    return PromiseUtils.runInSeries(
        createBatchRequests({ data, collection })
    );
};

function upsertData ({ collection, data }) {
    return new Promise((resolve, reject)=> {

        // first, normalize request data & 
        // keyFields to always be an array

        data = Array.isArray(data) ? data : [ data ];

        const runRequests = (data.length < 100) ? 
                runParallelRequests : runBatchRequests;

        // run all requests, then when all async ops
        // are done, resolve or reject as needed

        runRequests({ data, collection }).then( resolve )
            .catch( reject );
    });
}

/**
 * Upserts data into a mongo DB
 * @param {*} param0 
 */
module.exports = upsertData;