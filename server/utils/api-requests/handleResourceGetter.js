const handle404Error = require('./handle404Error');

function handleResourceGetter ({ ids, results, req, res }) {
    if((ids && !ids.length) && !results.length) {
        handle404Error({ req, res });
    } else {
        if(ids && ids.length == 1) {
            res.status(200).json(results[0]); 
        } else {
            res.status(200).json(results);
        }
    }
}

module.exports = handleResourceGetter;