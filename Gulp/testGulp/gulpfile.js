var path = require('path')

var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var minicss = require('gulp-minify-css')
var connect = require('gulp-connect')
var rev = require('gulp-rev')
var revCollector = require('gulp-rev-collector')
var minihtml = require('gulp-minify-html')


// 开发刷新模式

gulp.task('connect', function () {
	connect.server({
		root: path.resolve(__dirname),
		livereload: true
	})
})

gulp.task('scripts', function () {
	return gulp.src(['./src/js/**/*.js', '!./src/js/test/*.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./src/js/test'))
		.pipe(connect.reload())
})

gulp.task('css', function () {
	return gulp.src(['./src/css/**/*.css', '!./src/css/test/*.css'])
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./src/css/test'))
		.pipe(connect.reload())
})

gulp.task('html', function () {
	return gulp.src('./index.html')
		.pipe(connect.reload())
})

gulp.task('watch', function () {
	gulp.watch(['./src/css/**/*.css', '!./src/css/test/*.css'], ['css'])
	gulp.watch(['./src/js/**/*.js', '!./src/js/test/*.js'], ['scripts'])
	gulp.watch(['./index.html'], ['html'])
})

gulp.task('default', ['connect', 'scripts', 'css', 'watch'])

gulp.task('dev', ['connect', 'scripts', 'css', 'watch'])


// 线上打包

gulp.task('buildScripts', function () {
	return gulp.src(['./src/js/**/*.js', '!./src/js/test/*.js'])
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(rev())
		.pipe(gulp.dest('./dist/js'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./rev/js'))
})

gulp.task('buildCss', function () {
	return gulp.src(['./src/css/**/*.css', '!./src/css/test/*.css'])
		.pipe(concat('all.css'))
		.pipe(minicss())
		.pipe(rev())
		.pipe(gulp.dest('./dist/css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./rev/css'))
})

gulp.task('buildHtml', function () {
	return gulp.src(['./rev/**/*.json', './index.html'])
		.pipe(revCollector({
			replaceReved: true,
			dirReplacements: {
				'src/css/test': 'css',
				'src/js/test': 'js'
			}
		}))
		.pipe(minihtml({
			empty: true,
			space: true
		}))
		.pipe(gulp.dest('./dist'))
})

gulp.task('build', ['buildScripts', 'buildCss', 'buildHtml'])

gulp.task('show', function () {
	return gulp.src(['./src/js/**/*.js', '!./src/js/test/*.js'])
		.pipe(gulp.dest('./show'))
})
gulp.task('cp', ['show'])
