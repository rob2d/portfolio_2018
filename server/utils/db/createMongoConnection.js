const MongoClient = require('mongodb').MongoClient;

const RECONNECT_INTERVAL_S = 2;
const RECONNECT_TIME_H = 0.5;

/**
 * Create a database connection.
 * 
 * @param dbURI database uri
 * @return {Promise<Object>} A promise to the database instance
 */
module.exports = dbURI => 
    new Promise((resolve, reject) => {
        MongoClient.connect(dbURI, { 
            useNewUrlParser : true,
            // retry to connect for 18 hours
            reconnectTries : 60 / RECONNECT_INTERVAL_S * 60 * RECONNECT_TIME_H,

            // wait RECONNECT_INTERVAL seconds before retry
            reconnectInterval : RECONNECT_INTERVAL_S * 1000

        }).then( db => {

            // not sure why URI not resolving db with MongoClient
            // but extra step necessary here (no time to do
            // in a better way right now)

            const dbInstance = db.db(dbURI.substr(dbURI.lastIndexOf('/')+1));
            resolve(dbInstance);
        }).catch( error => reject(error));    
    });