var gulp = require("gulp");
var ts = require('gulp-typescript');

var tscProject = ts.createProject('tsconfig.json');

gulp.task('tsc', () => {
    return gulp.src('src/app/**/*.ts')
        .pipe(tscProject())
        .pipe(gulp.dest('src/jscode'));
});