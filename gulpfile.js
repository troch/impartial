var jshint = require('gulp-jshint'),
    gulp = require('gulp');

gulp.task('default', function () {
    return gulp.src('./lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
