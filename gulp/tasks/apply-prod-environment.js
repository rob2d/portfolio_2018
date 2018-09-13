const gulp = require('gulp');

gulp.task('apply-prod-environment', function() {
    process.env.NODE_ENV = 'production';
});