var gulp = require('gulp');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

gulp.task('browserify', function() {
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('app/dist'));
});

gulp.task('test', function() {
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('app/dist'));
});

gulp.task('default', ['browserify']);
