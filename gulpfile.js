var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var lost = require('lost');
var postcssCustomMedia = require('postcss-custom-media');
var cssnano = require('cssnano');
var browserSync = require('browser-sync').create();

function start(){
 return gulp
   .src('app/src/css/app.css')
   .pipe(
     postcss([cssImport, cssvars, postcssCustomMedia, lost, nested, autoprefixer, cssnano])
   )
   .pipe(gulp.dest('app/dist/css'));
};

function browser_sync() {
  browserSync.init({
    server: {
      baseDir: './app/'
    }
  });
}

function reload(done) {
  browserSync.reload();
  done();
} 

function watch_css(){
  gulp.watch('app/src/css/modules/*.css', gulp.series(start, reload));
};

function watch_html() {
  gulp.watch('app/**.html', gulp.series(start, reload));
};

gulp.task('watch', gulp.parallel(browser_sync, watch_css, watch_html) );

