var gulp = require("gulp");
var runSequence = require('run-sequence');

// Copy jS and CSS *************************************************************************************

gulp.task('copy-html', function () {
    return gulp.src('productionfiles/index.html')
        .pipe(gulp.dest('dist/'));
});

// Default task *************************************************************************************

gulp.task('build-prod-inline', function (done) {
    runSequence('clean', 'vendor-js', 'vendor-css', 'tsc-inline', 'build-js', 'build-css', 'copy-html','remove-jscode', done);
});