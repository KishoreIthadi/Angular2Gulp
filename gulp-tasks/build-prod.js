var gulp = require("gulp");
var runSequence = require('run-sequence');

// Copy jS and CSS *************************************************************************************

gulp.task('copy-html', function () {
    return gulp.src('productionfiles/index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-component-html', function () {
    return gulp.src('src/app/**/*.html')
        .pipe(gulp.dest('dist/src/app'));
});

gulp.task('copy-component-css', function () {
    return gulp.src('src/app/**/*.css')
        .pipe(gulp.dest('dist/src/app'));
});


// Default task *************************************************************************************

gulp.task('build-prod', function (done) {
    runSequence('clean', 'vendor-js', 'vendor-css', 'tsc', 'build-js', 'build-css', 'copy-html', 'copy-component-html', 'copy-component-css','remove-jscode', done);
});