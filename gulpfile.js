let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({}))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});