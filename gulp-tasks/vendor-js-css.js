var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var cssMinify = require('gulp-cssnano');

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