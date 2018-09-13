const path = require('path'),
      fs   = require('fs');

const tasks = {};

fs.readdirSync(path.resolve('.'))
    .filter( fname => fname != 'index.js')
    .forEach( filename => {
        const namespace = filename.substr(0, filename.length-3);
        tasks[namespace] = require(filename);
});

module.exports = tasks;