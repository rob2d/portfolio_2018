let gulp            = require('gulp'),
    gulpUtil        = require('gulp-util'),
    buffer          = require('vinyl-buffer'),
    uglify          = require('gulp-uglify'),
    stripDebug      = require('gulp-strip-debug'),
    runBuildScripts = require('./../utils/runBuildScripts'),
    cmdFlags        = require('./../utils/cmdFlags'),
    paths           = require('./../config/paths'),
    SharedContext   = require('./../common/SharedContext');

gulp.task('create-js-build', function() {
    SharedContext.devMode = false;
    if(cmdFlags.build_js_debug) {
        return runBuildScripts({ watch : false })
            .pipe(buffer())
            .pipe(uglify().on('error', gulpUtil.log))
            .pipe(gulp.dest(paths.DEST_PROD));
    }
    else {
        return runBuildScripts({ watch : false })
            .pipe(buffer())
            .pipe(uglify().on('error', gulpUtil.log))
            .pipe(stripDebug())                         //remove console logging
            .pipe(gulp.dest(paths.DEST_PROD));
    }
});