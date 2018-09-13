const gulp               = require('gulp'),
      paths              = require('./../config/paths.json'),
      getVersionFromFile = require('./../utils/getVersionFromFile');

const SEMVER_STR = getVersionFromFile()
                    .match(/([\d]+)[\.]([\d]+)[\.]([\d]+)/gi)[0]

gulp.task('append-version-numbers', function() {   
    
    const VERSION_NUMBER_CONFIG = {
        value : SEMVER_STR,
        replaces : [
            ['/build.js', `/build.js?v=${SEMVER_STR}`],
        ],
        append : {
            key: 'v',
            to: ['css'],
        }
    };
    
    return gulp.src(paths.DEST_DEV + '/index.html')
        .pipe(versionNumber(VERSION_NUMBER_CONFIG))
        .pipe(gulp.dest(paths.DEST_PROD))
});