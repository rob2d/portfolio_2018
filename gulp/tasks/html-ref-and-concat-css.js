const gulp     = require('gulp'),
      gulpIf   = require('gulp-if'),
      useref   = require('gulp-useref'),
      cleanCss = require('gulp-clean-css'),
      paths    = require('./../config/paths');

gulp.task('html-ref-and-concat-css', function() {
    return gulp.src(paths.DEST_DEV + '/index.html')
        .pipe(gulpIf('*.css', cleanCss()))  // minify css files
        .pipe(useref())                     // for html build file markup
        .pipe(gulp.dest(paths.DEST_PROD));
});