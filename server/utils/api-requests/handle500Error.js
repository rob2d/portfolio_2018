module.exports = function({ req, res, error }) {
    console.error(`Error occured at ${req.path}:`, error);
    let message = '';
    
    // if object has no keys but has message & stack,
    // we know it is is not a normal JS Object but instead
    // an error and can't be stringified 
    
    if(!Object.keys(error).length && error.message && error.stack) {
        message = error.message + '\n\n' + error.stack;
    } else {
        error = JSON.stringify(error,null,2);
    }

    console.log(message);
    res.status(500).send(`Error processing request\n\n` + message);
};