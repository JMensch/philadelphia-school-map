'use strict';
var gulp		= require('gulp');
var browserSync = require('browser-sync');
var reload	  = browserSync.reload,
	harp		= require('harp'),
	sass		= require('gulp-sass'),
	babel	   = require('babelify'),
	browserify  = require('browserify'),
	source	  = require('vinyl-source-stream'),
	uglify	  = require('gulp-uglify'),
	ghPages	 = require('gulp-gh-pages'),
	shell	   = require('gulp-shell');
/**
 * Serve the Harp Site from the dist directory
 */
gulp.task('serve', function () {
    harp.server(__dirname + '/dist', {
	    port: 9000
    }, function () {
	    browserSync({
	        proxy: "localhost:9000",
	        open: false,
	        /* Hide the notification. It gets annoying */
	        notify: {
	    	    styles: ['opacity: 0', 'position: absolute']
	        }
	    });
    });
});

//compiles files to harp
gulp.task('compile', function() {
	return gulp
		.src('')
		.pipe(shell([
			'harp compile dist _harp'
		]));
});

// deploys the contents of harp to github pages
gulp.task('deploy-ghpages', function() {
  return gulp
		.src('./_harp/**/*')
		.pipe(ghPages());
});

// move our ejs files to dist
gulp.task('compile-markup', function() {
	return gulp.src('src/*.ejs')
		// .pipe(ejs())
		.pipe(gulp.dest('dist'));
});

// compile scss to css
gulp.task('compile-styles', function() {
	return gulp.src('src/styles/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist'));
});

// compiles our js to dist
gulp.task('compile-scripts', function() {
	return browserify({ entries: 'src/scripts/main.js', debug: true, extensions: ['.js'] })
		.transform(babel)
		.bundle()
		.on('error', function(err) { console.log(err); this.emit('end'); })
		.pipe(source('main.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch("src/scripts/*.js", ['compile-scripts']);
	gulp.watch("src/styles/*.scss", ['compile-styles']);
	gulp.watch("src/*.ejs", ['compile-markup']);

	/**
	 * Watch for scss changes, tell BrowserSync to refresh main.css
	 */
	gulp.watch("dist/main.css", function () {
	  reload("dist/main.css", {stream: true});
	});
	/**
	 * Watch for all other changes, reload the whole page
	 */
	gulp.watch(["*.ejs"], function () {
	  reload();
	});
});
/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['serve', 'watch']);
gulp.task('deploy', ['compile', 'deploy-ghpages']);
