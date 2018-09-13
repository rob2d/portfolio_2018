const path = require('path'),
      fs   = require('fs');

const tasks = {};

fs.readdirSync(path.resolve('./gulp/tasks'))
    .filter( fname => fname != 'index.js')
    .forEach( filename => {
        const namespace = filename.substr(0, filename.length-3);
        tasks[namespace] = require(path.resolve('./gulp/tasks/', filename));
});

module.exports = tasks;