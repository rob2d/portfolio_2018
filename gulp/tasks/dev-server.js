const gulp          = require('gulp'),
      paths         = require('./../config/paths'),
      SharedContext = require('./../common/SharedContext');

gulp.task('dev-server', ['dev'], function() {
    let liveReload = require('gulp-server-livereload');
    SharedContext.devMode = true;
    
    return gulp.src(paths.DEST_DEV)
        .pipe(liveReload({
            host : '0.0.0.0',
            port : 8080
        }));
});