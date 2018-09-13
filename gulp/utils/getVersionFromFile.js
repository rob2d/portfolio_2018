const fs    = require('fs'),
      paths = require('./../config/paths');

function getVersionFromFile () {
    let fileContent = fs.readFileSync(paths.VERSION_CONFIG_FILE, 'utf8');
    if(fileContent !== null && fileContent.match(/VERSION[\s]*:[\s]*'([\d]+)[\.]([\d]+)[\.]([\d]+)'/gi)) {
        return fileContent.match(/VERSION[\s]*:[\s]*'([\d]+)[\.]([\d]+)[\.]([\d]+)'/gi)[0];
    }
};

module.exports = getVersionFromFile;