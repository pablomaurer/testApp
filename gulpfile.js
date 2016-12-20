var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');

gulp.task('default', ['sass']);

gulp.task('watch', function() {
    gulp.watch('./node_modules/**/*.js', ['libs']);
});

gulp.task('libs', function() {
    // fonts
    gulp.src('./node_modules/ionic-angular/release/fonts/**/*.{ttf,woff,eof,eot,svg}').pipe(gulp.dest('./www/fonts/'));

    // js
    gulp.src([
        './node_modules/ionic-angular/release/js/ionic.bundle.min.js',
        './node_modules/pouchdb/dist/pouchdb.min.js',
        './node_modules/pouchdb-adapter-cordova-sqlite/dist/pouchdb.cordova-sqlite.min.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('libs.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./www/js'))
});