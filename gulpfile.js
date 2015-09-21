'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload,
    harp        = require('harp'),
    sass        = require('gulp-sass'),
    babel       = require('gulp-babel'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    uglify      = require('gulp-uglify');

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
  })
});

gulp.task('compile-styles', function() {
    return gulp.src('src/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'))
});

gulp.task('compile-scripts', function() {
    var b = browserify();
	b.add('src/scripts/main.js');

	return b.bundle()
		.on('error', function(err) { console.log(err); this.emit('end'); })
		.pipe(source('main.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch("src/scripts/*.js", ['compile-scripts']);
    gulp.watch("src/styles/*.scss", ['compile-styles']);
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
