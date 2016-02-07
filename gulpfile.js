var browserify = require('browserify');
var del = require('del');
var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

gulp.task('scripts', function() {
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('app/dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('app/dist'));
});

gulp.task('clean', function() {
  return del(['app/dist/*.*']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('scripts');
});

gulp.task('watch', function() {
  gulp.watch(['app/**/*.js', '!app/dist/**/*.js'], ['scripts']);
});
