import tinypng from 'gulp-tinypng-compress'
import gulp from 'gulp'

gulp.task('tinypng', function() {
    gulp.src('../src/assets/heroes/feiaona*.{png,jpg,jpeg,gif,ico}')
        .pipe(tinypng({
            key: '7tjtzV7s8RpDM2B3VH4yyYMR1cKFbYLT',
            sigFile: 'gulptest/yes/img/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('gulptest/yes/img'));
})
