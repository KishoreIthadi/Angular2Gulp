var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var cssMinify = require('gulp-cssnano');
var runSequence = require('run-sequence');

var tscProject = ts.createProject('tsconfig.json');

var SystemBuilder = require('systemjs-builder');

// cleans the previous builds
gulp.task('clean', function () {
    return gulp.src(['dist', 'src/jscode'], {
            read: false
        })
        .pipe(clean())
});

// Vendor jS and CSS *************************************************************************************
gulp.task('vendor-js', () => {
    return gulp.src([
            'node_modules/core-js/client/shim.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(concat('vendorjs.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/src/scripts/'))
});

gulp.task('vendor-css', () => {
    return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ])
        .pipe(concat('vendorcss.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssMinify())
        .pipe(gulp.dest('dist/src/css/'))
});

// Bundle jS and CSS *************************************************************************************

gulp.task('tsc', () => {
    return gulp.src('src/app/**/*.ts')
        .pipe(tscProject())
        .pipe(gulp.dest('src/jscode'));
});

// loads all the required files based on systemjs.config.js
// bundles them into bundle.js then minifying into bundle.min.js
gulp.task('build-js', ['tsc'], () => {
    var builder = new SystemBuilder();

    return builder.loadConfig('systemjs.config.js')
        .then(() => builder.buildStatic('app', 'dist/src/scripts/bundle.js', {
            minify: false, sourceMaps: true, encodeNames:false
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


// Copy jS and CSS *************************************************************************************

gulp.task('copy-html', function () {
    return gulp.src('productionfiles/index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-component-html', function () {
    return gulp.src('src/app/**/*.html')
        .pipe(gulp.dest('dist/src/app'));
});

// Default task *************************************************************************************

gulp.task('build-prod', function (done) {
    runSequence(['vendor-js', 'vendor-css', 'build-js', 'build-css', 'copy-html', 'copy-component-html'], done);
});