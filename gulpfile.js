var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	webserver = require('gulp-webserver'),
	del = require('del');

var paths = {
	scripts: ['App/*.js', 'App/**/*.js', 'App/**/**/*.js', 'App/**/**/**/*.js', 'App/**/**/**/**/*.js', 'App/**/**/**/**/**/*.js'],
	styles: ['Content/css/*.css', 'Content/css/**/*.css'],
	fonts: 'Content/fonts/*.*'
}

gulp.task('cleanWatcher', function (cb) {
    del(['build/css', 'build/js'], cb);
});

gulp.task('cleanAll', function (cb) {
    del('build', cb);
});

// Конкатенация и минификация JS
gulp.task('minifyJs', function(){
    return gulp.src(paths.scripts)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Конкатенация и минификация CSS
gulp.task('minifyCss', function() {
  return gulp.src(paths.styles)
  			.pipe(concat('all.css'))
		    .pipe(gulp.dest('build/css'));
});

// Перекладывание шрифтов в папочку с билдом
gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
		    .pipe(gulp.dest('build/fonts'));
});

//Server start
gulp.task('connect', function() {
	gulp
		.src('')
	    .pipe(webserver({
	    }));
});

gulp.task('watch', ['cleanWatcher'], function() {
	gulp.watch(paths.scripts, ['minifyJs']);
	gulp.watch(paths.styles, ['minifyCss']);
});

// Скомбайнить js и css - gulp combine
gulp.task('combine', ['minifyJs', 'minifyCss']);

// Дефолтный запуск гулпа - gulp
gulp.task('default', ['watch', 'minifyJs', 'minifyCss', 'fonts', 'connect']);

// Старт локального серверка со сборкой css
gulp.task('startServer', ['minifyCss', 'fonts', 'connect']);
