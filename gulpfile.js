var gulp = require('gulp');
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var RevAll = require('gulp-rev-all');
var revReplace = require('gulp-rev-replace');
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var s3 = require('gulp-s3-upload')({useIAM:true});

var sourcePaths = {
    styles: ['scss/*.scss'],
    img: ['img/*.*'],
    css: ['css/*.css'],
    js: ['js/*.js'],
    html: ['*.html']
}

destPaths = {
    css: 'css/'
}

var buildPath = 'dist' 

gulp.task('sass', function() {
    gulp.src(sourcePaths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(
                {
                    browsers: [
                        '> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'
                    ],
                    cascade: false
                }
            ))
        .pipe(gulp.dest(destPaths.css))
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      open: true,
      fallback: 'index.html',
      port: 8080
    }));
});

gulp.task("build", ['sass'], function() {
    var revAll = new RevAll({ dontRenameFile: ['.html'] });
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});

    return gulp.src(sourcePaths.html)
        .pipe(useref({ searchPath: '.' }))     // Concatenate with gulp-useref
        .pipe(jsFilter)                 // Filter for JS files only
        .pipe(uglify())                 // Minify any JS sources
        .pipe(jsFilter.restore)         
        .pipe(cssFilter)                // Filter for CSS files only
        .pipe(nano())                   // Minify any CSS sources
        .pipe(cssFilter.restore)
        .pipe(revAll.revision())        // Rename the concatenated files
        // .pipe(revReplace())              // Substitute in new filenames
        .pipe(gulp.dest(buildPath))     // Write out all files
        .pipe(revAll.manifestFile())        // Create the manifest
        // .pipe(revDel({dest: buildPath}))// Delete all old files from old manifest
        .pipe(gulp.dest(buildPath));    // Write out manifest
}); 

var expires = new Date();
expires.setDate(expires.getDate() + 90);

function upload_imgs(bucket) {
    gulp.src(sourcePaths.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(s3({
            // Bucket: 'godistributed.com', //  PRODUCTION
            Bucket: bucket, //  STAGING
            ACL:    'public-read',       //  Needs to be user-defined 
            Expires: expires,
            uploadNewFilesOnly: false,
            keyTransform: function(relative_filename) {
                    return 'img/'+relative_filename;
                    
                }
            }
        ));
}

function upload_css(bucket) {
    gulp.src(['dist/css/*.css'])
        .pipe(s3({
            // Bucket: 'godistributed.com', //  PRODUCTION
            Bucket: bucket, //  STAGING
            ACL:    'public-read',       //  Needs to be user-defined 
            Expires: expires,
            uploadNewFilesOnly: false,
            keyTransform: function(relative_filename) {
                    return 'css/'+relative_filename;
                    
                }
            }
        ));
}

function upload_js(bucket) {
    gulp.src(sourcePaths.js)
        .pipe(s3({
            // Bucket: 'godistributed.com', //  PRODUCTION
            Bucket: bucket, //  STAGING
            ACL:    'public-read',       //  Needs to be user-defined 
            Expires: expires,
            uploadNewFilesOnly: false,
            keyTransform: function(relative_filename) {
                    return 'js/'+relative_filename;
                    
                }
            }
        ));
}

function upload_html(bucket) {
    gulp.src('dist/*.html')
        .pipe(s3({
            Bucket: bucket, //  STAGING
            ACL:    'public-read',      //  Needs to be user-defined 
             maps: {
                Expires: function(keyname) {
                    if (/^.*\.(html)$/.test(keyname)) {
                        var expires = new Date();
                        expires.setMinutes(expires.getMinutes() + 5);
                        return expires;
                    }
                    else {
                        var expires = new Date();
                        expires.setUTCFullYear(2020);
                        return expires;
                    }
                },
                CacheControl: function(keyname) {
                    if (/^.*\.(html)$/.test(keyname)) {
                        return '600';
                    }
                }
            }
        }));
}

gulp.task("uploadeverythingtoproduction", ['build'], function() {
    var bucket = 'www.btcmedia.org'
    upload_imgs(bucket)
    upload_css(bucket)
    upload_js(bucket)
    upload_html(bucket)
});

gulp.task('watch', function(){
  gulp.watch(sourcePaths.styles, ['sass']);
});

gulp.task('default', ['webserver','watch','sass']);
