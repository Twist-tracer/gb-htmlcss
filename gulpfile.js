const {src, dest, series, watch} = require('gulp');
const gulpClean = require('gulp-clean');
const gulpSass = require('gulp-sass');
const gulpCssMin = require('gulp-cssmin');
const gulpRename = require('gulp-rename');
const gulpSourceMaps = require('gulp-sourcemaps');

function clean() {
    return src('./assets/*')
        .pipe(gulpClean());
}

function copy(cb) {
    src(['./src/*.html'])
        .pipe(dest('./assets'));

    src(['./src/img/*'])
        .pipe(dest('./assets/img'));

    return cb();
}

function sass() {
    return src('./src/css/**/*.scss')
        .pipe(gulpSourceMaps.init())
        .pipe(gulpSass({outputStyle: 'expanded'}))
        .pipe(gulpSourceMaps.write('.'))
        .pipe(dest('./assets/css'));
}

function cssMin() {
    return src('./assets/css/**/*.css')
        .pipe(gulpCssMin())
        .pipe(gulpRename({suffix: '.min'}))
        .pipe(dest('./assets/css'))
}

function build() {
    return series(clean, copy, sass, cssMin);
}

exports.watch = function() {
    return watch('./src/**/*', build());
};

exports.default = exports.build = build();
