let figlet   = require('figlet'),
    colors   = require('colors'),
    cliTable = require('cli-table'),
    pkg      = require('./../../package.json'),
    paths    = require('./../config/paths'),
    cmdFlags = require('./cmdFlags');

/** various logging functions */
let logger = {
    updateBuild (files, updateCountShown) {
        if(!Array.isArray(files)) { files = Array.from([files]); }
        files = files.map((file,i)=> {
            let dirNameIndex = file.toLowerCase().indexOf(__dirname.toLowerCase());
            return '['+(i+1)+'] '+((dirNameIndex!=-1) ?
                    file.substr(dirNameIndex+__dirname.length+1+paths.ENTRY_FOLDER.length) :
                    file).bold.magenta;
        });
        console.log('\nFile changes detected ->\n', files.join('\n'), '\n');

        var updatedAt        = new Date(),
            updatedAtDisplay = `[${updatedAt.getHours()}:${updatedAt.getMinutes()}:${(updatedAt.getMilliseconds()+'').substr(0,2)}]`.gray;

        if(updateCountShown) {
            console.log(updatedAtDisplay + 'Updated source files ' +
                (++updateCount + '').bold.magenta + ' time' +
                ((updateCount == 1) ? '' : 's') + '. \n');
        }
    },
    watchStarted () {
        console.log(`Getting ready to watching for file changes to build to 
            [${paths.DEST_PROD.bold}]\n`);
    },
    startNotice (mode) {
        let appPrintOut = '\n' + figlet.textSync(pkg.name, {
            font: 'Slant',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        });

        console.log(appPrintOut);
        console.log(`\t\tSource Code Builder\n`);
        console.log(`> Running in ${mode == 'build' ? 'Build':'Dev'} Mode\n`);
        console.log('[ gulp tasks: build \u2022 dev-server (default) \u2022 dev ]\n');

        logger.listFlags();

        if(mode != 'build') {
            console.log('Note : Initial build may take a bit of time on the first run before cache-ing...\n');
        }
    },
    buildMessage (message) {
        if(latestVersionBuilt == getVersionFromFile()) {
            console.log(message + '\n');
        }
    },
    errorWhileRebuilding (err) {
        var errorAt = new Date(),
            errorAtDisplay = `${errorAt.getHours()}:${errorAt.getMinutes()}.${errorAt.getMilliseconds()}`;
        console.log(`${errorAtDisplay} ${`error occurred during build:\n\t${err.message.red.bold}\n`}`);
        console.log(`Even though building may have finished successfully, ${''
            }there was an error compiling the app sourcecode. ${''
            }This may lead to errors\n`);
    },
    listFlags () {
        let flagTable = new cliTable({
            head : ['flag'.gray, 'status'.gray, 'description'.gray],
            colWidths: [20, 10, 60]
        });

        console.log('cli-table ->', flagTable.toString());

        for(var flagName in cmdFlags) {
            let flagValue = cmdFlags[flagName],
                flagDescription = cmdFlags[flagName].description;

            if(flagValue) {
                flagValue= flagValue.toString();
            }
            else {
                flagValue = '';
            }

            flagTable.push([flagName, flagValue, flagDescription]);

            
            console.log(flagName, flagValue, flagDescription);
        }
        //console.log(flagTable.toString().gray);
        console.log('\n');
    }
};

// exports singleton
module.exports = logger;