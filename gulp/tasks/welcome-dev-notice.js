const gulp   = require('gulp'),
      logger = require('./../utils/logger');

gulp.task('welcome-dev-notice', function() {
    logger.startNotice('dev');
});