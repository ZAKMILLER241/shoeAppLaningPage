//------------------------------------------
// Dependencies
//------------------------------------------

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    del = require('del'),
    minifycss = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    images = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();


//Paths
var styleSrc = 'source/sass/**/*.sass',
    styleDest = 'build/assets/css/',
    htmlSrc = 'source/',
    htmlDest = 'build/',
    vendorSrc = 'source/js/vencdors/',
    vendorDest = 'build/assests/js/',
    scriptSrc = 'source/js/*.js',
    scriptDest = 'build/assets/js/';


//------------------------------------------
// Stand Alone Tasks
//------------------------------------------

//Compiles all sass files
gulp.task('sass', function() {
  gulp.src('source/sass/**/*.sass')
  .pipe(plumber())
  .pipe(sass({
    style: 'compressed'
  }))
  .pipe(rename({
    basename: 'main',
    suffix: 'min'
  }))

  .pipe(gulp.dest('build/assets/css'));
});

gulp.tast('images', function() {
  gulp.src('source/img/*')
    .pipe(images())
    .pipe(gulp.dest('build/assets/img'));
});

//Uglify js files
gulp.tast('scripts', function() {
  gulp.src('source/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'));
});


//concat and compress vendor .js files
gulp.tast('vendors', function() {
  gulp.src(
          'source/js/vendors/jquery.min.js',
          'source/js/vendors/*js'
          )
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'));
});





//Watch for changes
gulp.task('watch', function(){

    // Serve files from the root of this project
    browserSync.init({
    server: {
      baseDir: "./build"
    },
    notify: false
  });

  gulp.watch(styleSrc,['sass']);
  gulp.watch(scriptSrc,['scripts']);
  gulp.watch(vendorSrc,['vendors']);
  gulp.watch(['build/*.html', 'build/assets/css/*.css',
      'build/assets/js/*.js', 'build/assets/js/vendor/*.js']).on('change',
      browserSync.reload);
});


//Use default tasks to launch browsersync and watch JS files
gulp.task('default',['sass', 'scripts', 'vendors', 'watch', ], function() {});
