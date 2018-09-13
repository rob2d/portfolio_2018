const gulp  = require('gulp'),
      paths = require('./../config/paths.json');

gulp.task('copy-extra-to-build', function() {
    return gulp.src(paths.DIST_DEV_FILES)
        .pipe(gulp.dest(paths.DEST_PROD));
});