const path = require('path'),
      fs = require('fs'),
      Controller = global.require('utils/Controller'),
      controllersPath = global.resolvePath('controllers');

/**
 * Reference for all controllers detected in directory;
 * e.g. controllers.EntitiesController becomes the EntitiesController ref,
 *        controllers.AssetsController becomes AssetsController ref, etc
 */
const controllers = {};

// scan through all controller files and add 
// the relevant ones to correct namespaces 

fs.readdirSync(controllersPath).filter( filename => 
        (!fs.lstatSync(path.resolve(controllersPath, filename)).isDirectory()) &&
        (filename.substr(filename.length-3) == '.js') &&
        filename != 'index.js'
).forEach( filename => {
    const namespace = filename.substr(0, filename.length-3);
    
    // exclude this file and anything that is not a Controller

    if(namespace.indexOf('index') != 0) {
        const controller = require(path.resolve(controllersPath, filename));
        if(controller instanceof Controller) {
            controllers[namespace] = controller;
        }
    }
});

/**
 * Initializes controllers passing necessary data, and passes special 
 * parameters if needed to specific controllers along the way
 * 
 * @param {*} params 
 * @param {Object} params.app express application reference to do things such as grab
 *                  our database
 */
function init ({ app }) {  
    const initParams = { app };

    // initiate controller with required parameters
    Object.keys(controllers).forEach( cName => {
        if(typeof controllers[cName].init == 'function') {
            controllers[cName].init(initParams);
        }
    });
}

// export an init function along with
// controller references
controllers.init = init;

// export all controllers
module.exports = controllers;