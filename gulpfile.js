var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var sass = require('gulp-ruby-sass');

gulp.task('process-js', function() {
    gulp.src(['data/*.js', 'js/**/*.*'])
    	.pipe(concat('dist.js'))
    	.pipe(uglify())
    	.pipe(gulp.dest('public'));
});

gulp.task('compile-sass', function() {
    return sass('sass/', {style: 'expanded'})
	      .pipe(gulp.dest('css/'));
});

gulp.task('process-styles', function() {
 	gulp.src('css/**/*.*')
 	   .pipe(concat('styles.css')) 
 	   .pipe(uglifycss())
 	   .pipe(gulp.dest('public'));
});

gulp.task('copy', function() {
    gulp.src('public/**/*.*')
    .pipe(gulp.dest('../../Vocabulary_dist/'));
});

gulp.task('watch', function() {
	gulp.watch(['js/**/*.*', './public/index.html', './sass/**/*.*'], ['default']);
});

gulp.task('default', ['process-js', 'compile-sass', 'process-styles']);
