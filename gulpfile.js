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
gulp.task('clean', function() {
    return gulp.src(['dist', 'build', 'css/main.min.css', 'scripts'], { read: false })
        .pipe(clean());
});

gulp.task('vendor', () => {
    return gulp.src([
            'node_modules/core-js/client/shim.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/systemjs/dist/system.src.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('scripts/'))
});

gulp.task('tsc', () => {
    return gulp.src('app/**/*.ts')
        .pipe(tscProject())
        .pipe(gulp.dest('build/'));
});

// loads all the required files based on systemjs.config.js
// bundles them into bundle.js then minifying into bundle.min.js
gulp.task('build-systemconfig', ['tsc'], () => {
    var builder = new SystemBuilder();

    return builder.loadConfig('systemjs.config.js')
        .then(() => builder.buildStatic('app', 'scripts/bundle.js', {
            production: true,
            rollup: true
        }))
        .then(() => gulp.src('scripts/bundle.js')
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('scripts/'))
            .pipe(uglify())
            .pipe(gulp.dest('scripts/')))
        .then(() =>
            gulp.src('build', { read: false })
            .pipe(clean()));
});

gulp.task('minify-js', ['build-systemconfig'], function() {
    return gulp.src('scripts/bundle.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
});

gulp.task('minify-css', function() {
    return gulp.src('css/main.css')
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssMinify())
        .pipe(gulp.dest('css/'));
});

gulp.task('copy-html', function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-component-html', function() {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist/app'));
});

gulp.task('copy-css', ['minify-css'], function() {
    return gulp.src('css/main.min.css')
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('copy-js', ['minify-js'], function() {
    return gulp.src('scripts/**/*')
        .pipe(gulp.dest('dist/scripts'));
});

// This task will call all the other task in sequence
// Production build will be created in dist folder
gulp.task('build', function(done) {
    runSequence('clean', ['vendor', 'copy-html', 'copy-component-html', 'copy-css', 'copy-js', ], done);
});