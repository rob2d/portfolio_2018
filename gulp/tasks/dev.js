const gulp            = require('gulp'),
      logger          = require('./../utils/logger'),
      runBuildScripts = require('./../utils/runBuildScripts'),
      SharedContext   = require('../common/SharedContext');

gulp.task('dev', function() {
    SharedContext.devMode = true;
    logger.startNotice('dev');
    return runBuildScripts({ watch : true });
});