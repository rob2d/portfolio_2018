let notifier = require('node-notifier'),
    cmdFlags = require('./cmdFlags'),
    paths    = require('./../config/paths');

/**
 * Simple interface for providing OS-level-notices
 */

let noticeProvider = {
    buildSuccess (p) {
        notifier.notify({
            title   : 'Build Successful',
            message : p.message, sound : false
        });
    },
    /**
     * @param p
     * @param p.message
     */
    errorBuilding (p) {
        if(cmdFlags.error_notices) {
            notifier.notify({
                    title   : 'Error Building',
                    message : p.message,
                    sound   : cmdFlags.error_sound
            });
        }
    },
    watchingFiles () {
        notifier.notify({
            title   : 'Watching ' + paths.DEST_DEV,
            message : 'Ready to watch for file changes to ' +
            'build into ' + paths.DEST_PROD,
            sound   : false
        });
    }
};

module.exports = noticeProvider;