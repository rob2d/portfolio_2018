let gulp          = require('gulp'),
    fs            = require('fs'),
    replace       = require('gulp-replace'),
    cmdFlags      = require('./../utils/cmdFlags'),
    paths         = require('./../config/paths'),
    SharedContext = require('./../common/SharedContext');

gulp.task('check-for-version-bump', function() {
    // first make sure version built is up to date before bumping twice
    let versionFileContent = fs.readFileSync(paths.VERSION_CONFIG_FILE, 'utf8');
    let versionShouldBeBumped = (
        versionFileContent.indexOf(SharedContext.latestVersionBuilt) != -1
    ) && cmdFlags.version_bump;
    
    if(versionShouldBeBumped) {
        return gulp.src([paths.VERSION_CONFIG_FILE])
            .pipe(replace(/VERSION[\s]*:[\s]*'([\d]+)[\.]([\d]+)[\.]([\d]+)'/gi,
                (vString, major, minor, patch)=>{
                    let nextVersion = `VERSION : '${major}.${minor}.${parseInt(patch)+1}'`;
                    return (SharedContext.latestVersion = nextVersion, nextVersion);
                
                }
            )).pipe(gulp.dest(paths.VERSION_CONFIG_DIR));
    }
    else return;
});