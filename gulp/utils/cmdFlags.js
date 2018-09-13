let argv = require('yargs').argv,

const cmdFlagDefs = {
    version_bump      : {
        defaultValue : true,
        description  : 'Whether or not to bump versions on successive updates when building'
    },
    success_notice    : {
        defaultValue : true,
        description  : 'Displays a success notice in the OS when build is successful'
    },
    error_notice : {
        defaultValue : true,
        description  : 'Displays an error notice in the OS when a build fails'
    },
    error_sound : {
        defaultValue : false,
        description  : 'Play a sound when there is an error'
    },
    build_js_debug : {
        defaultValue : false,
        description  : 'Whether or not to include source ' +
        'maps in Javascript release builds'
    },
    export_standalone : {
        defaultValue : false,
        description  : 'Automatically generate a build folder ' +
                        'corresponding to the time you created' +
                        'your package via a builds/[current_date] folder/'
    }
};

/**
 * Namespace->value dict for any 
 * command line flags set
 */
let cmdFlagValues = {};
Object.keys(cmdFlagDefs).forEach( flag => {
    switch(typeof argv[flag]) {
        case 'undefined' : 
            cmdFlagValues[flag] = cmdFlagDefs[flag].defaultValue;
            break;
        default : 
            cmdFlagValues[flag] = argv[flag]; 
            break;
    }
});

module.exports = cmdFlagValues;