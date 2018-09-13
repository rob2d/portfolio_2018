let gulp           = require('gulp'),
    runSequence    = require('run-sequence'),
    babelify       = require('babelify'),
    browserify     = require('browserify'),
    watchify       = require('watchify'),
    envify         = require('envify/custom'),
    source         = require('vinyl-source-stream'),
    liveReactLoad  = require('livereactload'),
    SharedContext  = require('./../common/SharedContext'),
    babelifyConfig = require('./../config/babelify.json'),
    watchifyConfig = require('./../config/watchify.json'),
    aliasesSrc     = require('./../config/aliases.json'),
    paths          = require('./../config/paths'),
    logger         = require('./logger');

// add aliasing support to builds

const aliases = Object.keys(aliasesSrc).reduce((aliases,a)=> (
    aliases.concat({ src:aliasesSrc[a], expose:a })
), []);

babelifyConfig.plugins = babelify.plugins || [];
babelifyConfig.plugins.push(['module-alias', aliases]);

let Events = {
    codebaseUpdated (ms) {
        /*
        if(updateCount == 0) {   // fix for initial build
            latestVersionBuilt = getLatestVersionStrInFile();
            updateCount++;
        }
        if((latestVersionBuilt == getLatestVersionStrInFile()) && 
            (successNoticeCount <= updateCount)) {
            successNoticeCount += 1;
            let version = getVersionFromFile().match(/([\d]+)[\.]([\d]+)[\.]([\d]+)/gi)[0];
            let getMessage = osNotice => {
                let seconds = ((parseInt(ms)/1000) + ''),
                    printedVersion = version;

                if(!osNotice) {
                    seconds = seconds.yellow.bold;
                    printedVersion = printedVersion.yellow.bold;
                    return `Successfully compiled source files in ${seconds} seconds.${''+
                    ' '}Build file now on version ${printedVersion}`;
                }
                else { return `v${printedVersion} (${seconds}s)`; }
            };

            Log.buildMessage(getMessage(false));
            if(cmdFlags.success_notice) {
                notifier.notify({ 
                    title   : 'Successful build', 
                    message : getMessage(true), 
                    sound   : false 
                });
            }
        }
        */
       // TODO : update this method
    }
};



/**
 *  Builds our javascript code into output; can pass watch var depending on build or dev mode
 *
 * @param p
 * @param p.watch true - dev mode; will continuously watch. false - build mode; builds once
 */
function runBuildScripts(p) {
    let watch = (typeof p.watch !== 'undefined') ?
        p.watch : true;

    //set up our watcher
    let b = browserify({
            extensions   : ['.js', '.json', '.es6', '.jsx'],
            entries      : [paths.ENTRY_POINT],
            global       : true,
            debug        : SharedContext.devMode,
            cache        : {},
            packageCache : {},
            plugin       : watch ? [ liveReactLoad ] : []
        }).transform(babelify.configure(babelifyConfig))
        .transform(envify({ NODE_ENV: SharedContext.devMode ? 'development' : 'production' }));

    // wrap in watchify
    if(watch) { b = watchify(b, watchifyConfig); }

    b.on('error', (err)=> {
        if(watch) { Log.errorWhileRebuilding(err); }
        else      { Log.errorWhileRebuilding(err);        }
        Notices.errorBuilding({ message : err.message })
    });

    // add a timeout so that updated version registers
    b.on('time',Events.codebaseUpdated);

    /**
     *  sets up the actual js file-bundling logic
     */
    let getBuildStream = function(rebuild) {
        var stream = b.bundle();
        stream.on('error', (err)=> {
            if(watch) { Log.errorWhileRebuilding(err); }
            else      { Log.errorWhileRebuilding(err); }
            Notices.errorBuilding({ message : err.message });
        });

        //bundle files into build.js
        stream = stream.pipe(source(paths.BUILDJS_OUT));

        if(watch && rebuild) {
            return stream.pipe(gulp.dest(paths.DEST_DEV));
        }
        else { return stream; }
    };

    if(watch) {
        b.on('update', function(files) {

            // first make sure version actually changed before building
            // if version already bumped, build the files
            // otherwise, simply re-set up bundler to watch again
            
            let versionAlreadyBumped = (SharedContext.latestVersionBuilt != getVersionFromFile());
            logger.updateBuild(files,versionAlreadyBumped);

            if(versionAlreadyBumped) {
                SharedContext.latestVersionBuilt = getVersionFromFile();
                return getBuildStream(true);
            }
            else {
                runSequence('check-for-version-bump', ()=>(getBuildStream(updateCount === 0)));
            }
        });
    }

    if(watch) {
        return runSequence('check-for-version-bump', ()=> {
            return getBuildStream(true)
        });
    }
    else { return getBuildStream(true); }
};

module.exports = runBuildScripts