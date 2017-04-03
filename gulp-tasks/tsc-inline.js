var gulp = require("gulp");
var ts = require('gulp-typescript');

var tscProject = ts.createProject('tsconfig.json');

var inlineTemplate = require('gulp-inline-ng2-template');
var inlineStyles = require('gulp-inline-ng2-styles');


// build the html and css into the js files
gulp.task('tsc-inline', () => {
    return gulp.src('src/app/**/*.ts')
        .pipe(inlineTemplate({
            base: '/src/app',
            useRelativePaths: true
        }))
        .pipe(inlineStyles({
            base: '/src/app',
            useRelativePaths: true
        }))
        .pipe(tscProject())
        .pipe(gulp.dest('src/jscode'));
});