const gulp        = require('gulp'),
      runSequence = require('run-sequence');

gulp.task('build', function () {
    return runSequence(
        'welcome-build-notice',
        'apply-prod-environment', [
            'copy-extra-to-build',
            'html-ref-and-concat-css',
            'minify-images',
            'create-js-build',
        ],
        'append-version-numbers',
        'export-standalone-build'
    );
});