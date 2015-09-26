//Gulpfile.js
'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback'),
    stylus = require('gulp-stylus'),
    nib =  require('nib'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream;


gulp.task('css', function() {
  gulp.src('./app/stylesheets/main.styl')
    .pipe(stylus({use: nib()} ))
    .pipe(gulp.dest('./app/stylesheets'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});


gulp.task('jshint', function() {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


gulp.task('inject', function() {
  var sources = gulp.src(['./app/scripts/**/*.js', './app/stylesheets/**/*.css']);
  return gulp.src('index.html',  {cwd: './app'})
    .pipe(inject(sources, {
      read: false,
      ignorePath: '/app'
    }))
    .pipe(gulp.dest('./app'));
});


gulp.task('wiredep', function() {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: './app/lib'
    }))
    .pipe(gulp.dest('./app'));
});


gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/stylesheets/**/*.styl'], ['css', 'inject']);
  gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'], ['jshint, inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task('webserver', function() {
  connect.server({
    root: './app',
    livereload: true
  });
});

gulp.task('default', ['webserver', 'inject', 'wiredep', 'watch']);
