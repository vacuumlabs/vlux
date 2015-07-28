/* eslint-env node */
'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var jest = require('jest-cli');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');
var makeWebpackConfig = require('./example/webpack/makeconfig');
var webpackDevServer = require('./example/webpack/devserver');

require('harmonize')();

gulp.task('build', function() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({stage: 0}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('jest', function(done) {
  var rootDir = './src';
  jest.runCLI({config: {
    'rootDir': rootDir,
    'scriptPreprocessor': '../node_modules/babel-jest',
    'testFileExtensions': ['es6', 'js'],
    'moduleFileExtensions': ['js', 'json', 'es6']
  }}, rootDir, function(success) {
    /* eslint no-process-exit:0 */
    done(success ? null : 'jest failed');
    process.on('exit', function() {
      process.exit(success ? 0 : 1);
    });
  });
});

gulp.task('eslint', function() {
  return gulp.src([
      'gulpfile.js',
      'src/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function(done) {
  // Run test tasks serially, because it doesn't make sense to build when tests
  // are not passing, and it doesn't make sense to run tests, if lint has failed.
  // Gulp deps aren't helpful, because we want to run tasks without deps as well.
  runSequence('eslint', 'jest', done);
});

gulp.task('run-example', webpackDevServer(makeWebpackConfig(true)));

gulp.task('default', ['build']);
