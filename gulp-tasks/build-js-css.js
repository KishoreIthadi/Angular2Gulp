var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var cssMinify = require('gulp-cssnano');

var SystemBuilder = require('systemjs-builder');

// Bundle jS and CSS *************************************************************************************

// loads all the required files based on systemjs.config.js
// bundles them into bundle.js then minifying into bundle.min.js
gulp.task('build-js', () => {
    var builder = new SystemBuilder();

    return builder.loadConfig('systemjs.config.js')
        .then(() => builder.buildStatic('app', 'dist/src/scripts/bundle.js', {
            minify: false, sourceMaps: false, encodeNames:false
        }))
        .then(() => gulp.src('dist/src/scripts/bundle.js')
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('dist/src/scripts/'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/src/scripts/')))
        .then(() => gulp.src(['dist/src/scripts/bundle.js'], {
                read: false
            })
            .pipe(clean()));

});

gulp.task('build-css', function () {
    return gulp.src([
            'src/css/main.css'
        ])
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssMinify())
        .pipe(gulp.dest('dist/src/css/'))
});
