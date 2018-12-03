// base controller class

class Controller {
    
    /**
     * Allow controllers to have access
     * to root express application
     * @param {*} param0 
     * @param {Object} app express instance to link to
     */
    init ({ app }) {

        // ensure that we haven't already initialized the controller
        if(this._hasBeenInitialized) {
            throw new Error(`attempting to re-initialize after ${this._controllerType} Controller ' +
                                'has already been initialized`);
        }

        // keep reference to express app
        this._app = app;
    }
    get db () {
        return this._app.get('db');
    }
}

module.exports = Controller; 