const gulp     = require('gulp'),
      imagemin = require('gulp-imagemin'),
      paths    = require('./../config/paths');

gulp.task('minify-images', function() {
    return gulp.src(paths.DEST_DEV + '/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest(paths.DEST_PROD));
});