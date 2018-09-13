const gulp     = require('gulp'),
      fs       = require('fs'),
      moment   = require('moment'),
      paths    = require('./../config/paths'),
      cmdFlags = require('./../utils/cmdFlags');

gulp.task('export-standalone-build', function() {
    if(cmdFlags.export_standalone) {
        let packageDir = moment(new Date())
                            .format('YYYY-MM-DD-HHmmss');

        if(fs.existsSync(packageDir + '/')) {
            let charSuffix = 'a';

            while(!fs.existsSync(`${packageDir}(${charSuffix})/`)) {
                charSuffix++;
            }
            packageDir = `${packageDir}(${charSuffix})`;
        }

        let buildDir = `./builds/${packageDir}/`;
        if(!fs.existsSync('./builds/')) {
            fs.mkdirSync('./builds/');
        }

        fs.mkdirSync(buildDir);
        console.log(`Creating an exportable production build at:\n\t${buildDir}`);

        return gulp.src(paths.BUILD_PACKAGE_SOURCES)
            .pipe(gulp.dest(buildDir));
    }
});