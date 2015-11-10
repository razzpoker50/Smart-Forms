// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Style Dependencies
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// Development Dependencies
var jshint = require('gulp-jshint');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');

gulp.task('browserify-client', function() {
  return gulp.src('js/main.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('smart-forms.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['browserify-client']);
});

gulp.task('styles', function() {
  return gulp.src('styles/less/index.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('smart-forms.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('build/smart-forms.css')
    .pipe(minifyCSS())
    .pipe(rename('smart-forms.min.css'));
});

gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('build/smart-forms.js')
    .pipe(uglify())
    .pipe(rename('smart-forms.min.js'));
});

gulp.task('build', ['uglify', 'minify']);
