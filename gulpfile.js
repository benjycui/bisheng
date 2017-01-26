var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel')
var changed = require('gulp-changed');
var debug= require('gulp-debug')
var runSequence = require('run-sequence')
var chalk = require('chalk')

var source_dir = 'src/**/*.js';
var output_dir, dest_dir;
var argvIndex = process.argv.indexOf('--output')
output_dir = path.normalize(argvIndex !== -1 ? process.argv[argvIndex + 1] : './lib')
argvIndex = process.argv.indexOf('--dest')
//  dest_dir = '../ant-design/node_modules/bisheng/lib'
dest_dir = path.normalize(`${process.argv[argvIndex + 1]}/node_modules/bisheng/lib`)

gulp.task('build', function (cb) {
    gulp.src(source_dir)
        .pipe(changed(dest_dir, { hasChanged: changed.compareSha1Digest }))
        //.pipe(debug())
        .pipe(babel({
            "presets": [
                "es2015",
                "react"
            ]
        }))
        .pipe(gulp.dest(output_dir))
        .on('end',()=>{
           //console.log(chalk.green('---------- build done'))
           cb()
        })
   
})
gulp.task('copy', ['build'],function () {
    if (argvIndex === -1) {
       console.log(chalk.red('--dest parameter is required'))
       process.exit(1);
    }
    gulp.src(`${output_dir}/**/*.js`)
        .pipe(changed(dest_dir, { hasChanged: changed.compareSha1Digest }))
        //.pipe(debug())
        .pipe(gulp.dest(dest_dir))
        // .on('end',function(){
        //     console.log(chalk.green('---------- copy done'))
        // });

})

gulp.task('default', ['copy'], function () {
    gulp.watch(source_dir, ['copy']);
})
