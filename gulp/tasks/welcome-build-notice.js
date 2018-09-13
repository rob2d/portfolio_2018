const gulp   = require('gulp'),
      logger = require('./../utils/logger');

gulp.task('welcome-build-notice', function() {
    logger.startNotice('build');
});