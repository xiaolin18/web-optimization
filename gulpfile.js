var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    minifyCSS = require('gulp-minify-css');

gulp.task('minifyjs', function() {
    gulp.src(['js/*.js', 'views/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('js-min'));
});

gulp.task('minifycss', function () {
    // 1. 找到文件
    gulp.src(['css/*.css', 'views/css/*.css'])
    // 2. 压缩文件
        .pipe(minifyCSS())
    // 3. 另存为压缩文件
        .pipe(gulp.dest('css-min'));
});

gulp.task('images', function() {
     return gulp.src(['views/images/*.*', 'img/*.*'])
        .pipe(cache(imagemin({
             optimizationLevel: 3,
             progressive: true,
             interlaced: true
         })))
         .pipe(gulp.dest('img-min'))
         .pipe(notify({
            message: 'Images task complete'
         }));
 });

gulp.task('minihtml', function() {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true//删除<style>和<link>的type="text/css"
        // minifyJs: true,//压缩页面JS
        // minifyCSS: true//压缩页面CSS
    };
    gulp.src(['html/*.html', 'views/*.html'])
        .pipe(htmlmin(options))
        .pipe(gulp.dest('html-min'));
});

gulp.task('default', function() {
    gulp.start('minifyjs', 'minifycss', 'minihtml', 'images');
});
