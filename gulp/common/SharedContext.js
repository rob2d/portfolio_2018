const fs    = require('fs'),
      paths = require('./../config/paths');

const versionFileContent = fs.readFileSync(paths.VERSION_CONFIG_FILE, 'utf8');

/**
 * variables required to be in a shared
 * context by our tasks and utilities
 */
const SharedContext = {
    updateCount        : 0,
    successNoticeCount : 0,
    timeProcessedCount : 0,
    latestVersion      : '---',
    latestVersionBuilt : versionFileContent.match(/VERSION[\s]*:[\s]*'([\d]+)[\.]([\d]+)[\.]([\d]+)'/gi)[0],
    devMode            : false
};

module.exports = SharedContext;