let notifier = require('node-notifier');

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
        if(FlagValues.error_notices) {
            notifier.notify({
                    title   : 'Error Building',
                    message : p.message,
                    sound   : FlagValues.error_sound
            });
        }
    },
    watchingFiles () {
        notifier.notify({
            title   : 'Watching ' + Paths.DEST_DEV,
            message : 'Ready to watch for file changes to ' +
            'build into ' + Paths.DEST_PROD,
            sound   : false
        });
    }
};

module.exports = noticeProvider;