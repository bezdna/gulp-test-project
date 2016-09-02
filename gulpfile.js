'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');
const del = require('del');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


gulp.task('sass', function() {
    return gulp.src('frontend/scss/**/*.scss')
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('public/css'));
});

gulp.task('clean', function() {
    return del('public');
});

gulp.task('assets', function() {
    return gulp.src('frontend/assets/**')
        .pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('sass', 'assets')
));

gulp.task('hello', function(callback) {
    console.log('Hello!');
    callback();
});