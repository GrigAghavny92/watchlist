const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const path = require('path');


gulp.task('sass', function() {
  return gulp.src('src/app/**/*.scss') // Source folder for SCSS files in components
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(function(file) {
      return file.base; // Output CSS file in the same folder as the SCSS file
    }));
});

// Default task
gulp.task('default', gulp.series('sass'));
