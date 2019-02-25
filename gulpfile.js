const path			= require('path'),
	gulp        	= require('gulp'),
	watch         	= require('gulp-watch'),
	bs            	= require('browser-sync'),
	reload        	= bs.reload,
	sourcemaps    	= require('gulp-sourcemaps'),
	log         	= require('fancy-log'),
	gulpif        	= require('gulp-if'),
	cache         	= require('gulp-cache'), // for images
	rename        	= require('gulp-rename'),
	del           	= require('del'),
	// css
	sass          	= require('gulp-sass'),
	cssnano        	= require('cssnano'),
	postcss       	= require('gulp-postcss'),
	discardComments	= require('postcss-discard-comments'),
	autoprefixer   	= require('autoprefixer'),
	// images
	imagemin      	= require('gulp-imagemin'),
	pngquant      	= require('imagemin-pngquant'),
	// js
	babel         	= require('gulp-babel'),
	uglify        	= require('gulp-uglify'),
	browserify		= require('browserify'),
	watchify		= require('watchify'),
	assign			= require('lodash.assign'),
	buffer			= require('vinyl-buffer'),
	source			= require('vinyl-source-stream'),
	// html
	nunjucks      	= require('gulp-nunjucks'),
	fileinclude   	= require('gulp-file-include'), // for amp
	// json
	jsonmin       	= require('gulp-jsonminify');

let production 		= false,
	errorMsg		= '[Error] ',
	src     		= './src',
    dist    		= './dist',
    tmp				= './docs',
    srvDir			= tmp,
    node    		= './node_modules',
    pathSrc 		= {
        html:       src + '/*.html',
        amp:       	src + '/amp/*.html',
        scss:       src + '/styles/main.scss',
        jsMain:     src + '/js/main.js',
        jsVendor:   src + '/js/vendor.js',
        fonts:      src + '/fonts/**/*.*',
        img:        src + '/img/**/*.*',
        vendor:     src + '/vendor/**/*.*'
    },
    pathWatch 		= {
        html:   	src + '/**/*.html',
        js:     	src + '/js/app/*.js',
        scss:   	src + '/styles/**/*.scss',
        img:    	src + '/img/**/*.*',
        fonts:  	src + '/fonts/**/*.*'
    },
    pathDest    	= {},
    defaultTask 	= 'watch';

function buildDest(dest) {
    pathDest.html   = dest + '/';
    pathDest.amp	= dest + '/amp/';
    pathDest.css    = dest + '/assets/css/';
    pathDest.js     = dest + '/assets/js/';
    pathDest.fonts  = dest + '/assets/fonts/';
    pathDest.img    = dest + '/assets/img/';
    pathDest.vendor = dest + '/assets/vendor/';
}

if (production) {
    defaultTask = 'build';
	buildDest(dist);
} else {
	buildDest(tmp);
}

/* JS */
let	bf_vendor = watchify( browserify( optionsBrsf(pathSrc.jsVendor) ) );
let	bf_main = watchify( browserify( optionsBrsf(pathSrc.jsMain) ) );

function optionsBrsf(entryFiles) {
	return assign({}, watchify.args, {
		entries: [entryFiles],
		debug: !production
	});
}

function js_vendor() {
	return bf_vendor.bundle()
		.on( 'error', function(err) {
			console.error(errorMsg + err.message + '|' + err.fileName + '|[' + err.lineNumber + ']') 
		})
		.pipe( source('vendor.min.js') )
		.pipe( buffer() )
		.pipe( babel({
			presets: ['env']
		}) )
		.pipe( gulpif(production, uglify()) )
		.pipe( gulp.dest(pathDest.js) )
        .pipe( reload({
			stream: true
		}) );
}

function js_main() {
	return bf_main.bundle()
		.on( 'error', function(err) {
			console.error(errorMsg + err.message + '|' + err.fileName + '|[' + err.lineNumber + ']') 
		})
		.pipe( source('main.min.js') )
		.pipe( buffer() )
		.pipe( sourcemaps.init({loadMaps: !production}) )
		.pipe( babel({
			presets: ['env']
		}) )
		.pipe( gulpif(production, uglify()) )
		.pipe( sourcemaps.write("./") )
		.pipe( gulp.dest(pathDest.js) )
        .pipe( reload({
			stream: true
		}) );
}
bf_main.on('update', js_main);
bf_main.on('log', log);

/* CSS */
function scss() {
	let plugins = [
		discardComments({removeAll: true}),
		autoprefixer("last 2 versions", "> 1%"),
		cssnano()
	];
    return gulp.src( pathSrc.scss )
        .pipe( sourcemaps.init({loadMaps: !production}) )
        .pipe( sass() )
        .on( 'error', function(err) {
			console.error(errorMsg + err.message + '|' + err.fileName + '|[' + err.lineNumber + ']') 
		})
		.pipe( gulpif(production, postcss(plugins)) )
        .pipe( rename('main.min.css') )
        .pipe( sourcemaps.write("./") )
        .pipe( gulp.dest(pathDest.css) )
        .pipe( reload({
			stream: true
		}) )
}

/* HTML */
function html() {
    return gulp.src(pathSrc.html)
        .pipe(nunjucks.compile())
        .pipe(gulp.dest(pathDest.html))
        .pipe(reload({
			stream: true
		}));
}

/*
function amp() {
    return gulp.src(pathSrc.amp)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(pathDest.amp))
        .pipe(reload({
			stream: true
		}));
}*/

/* IMAGES */
function images() {
    return gulp.src(pathSrc.img)
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{
				removeViewBox: false
			}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(pathDest.img))
        .pipe(reload({
			stream: true
		}));
}

/* FONTS */
function fonts() {
    return gulp.src(pathSrc.fonts).pipe(gulp.dest(pathDest.fonts));
}

/* JSON */
function json() {
    return gulp.src(src + '/*.json')
		.pipe(jsonmin())
		.pipe(gulp.dest(pathDest.html));
}

/* VENDOR */
function vendor() {
    return gulp.src(pathSrc.vendor).pipe(gulp.dest(pathDest.vendor))
}


function clean(cb) {
    del.sync(srvDir + '/*');
    cb;
}

function watching() {
    gulp.watch(pathWatch.html, html);
    gulp.watch(pathWatch.scss, scss);
    gulp.watch(pathSrc.jsVendor, js_vendor);
    gulp.watch(pathWatch.js, js_main);
    gulp.watch(src + '/*.json', json);
    gulp.watch(pathSrc.vendor, vendor);
}


function webserver() {
    if (production) {
        srvDir = dist;
    }
    bs({
        server: {
            baseDir: srvDir
        },
        host: 'localhost',
        port: 8080,
    });
}


const builds = gulp.parallel(html, scss, js_vendor, js_main, images, fonts, json, vendor);
const build = gulp.series(clean, builds);
const serve = gulp.series(builds, gulp.parallel(watching, webserver));


exports.clean 	= clean;

exports.default = serve;