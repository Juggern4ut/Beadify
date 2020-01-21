/* Base Module */
const gulp = require("gulp");

/* Babel - Used for converting ES6 to ES5 */
const babel = require("gulp-babel");

/* SASS - Used for converting SASS to CSS */
const sass = require("gulp-sass");

/* CSSO - Used to minify CSS */
const minifyCSS = require("gulp-csso");

/* Concat - Used to merge multiple files together */
const concat = require("gulp-concat");

/* Sourcemaps - Used to generate sourcemaps*/
const sourcemaps = require("gulp-sourcemaps");

/* PostCSS - Used to use certain modules on the CSS after converting from SASS to CSS */
const postcss = require("gulp-postcss");

/* Autoprefixer - Used with PostCSS to apply vendor-prefixes to CSS */
const autoprefixer = require("autoprefixer");

/* Uglify - Used to minify JavaScript */
const minifyJS = require("gulp-uglify");

/**
 * 1. Set the source
 * 2. Initialize sourcemaps
 * 3. Convert to CSS
 * 4. Add vendor-prefixes
 * 5. Minify the CSS
 * 6. Write the sourcemap
 * 7. Write the file
 */
function css() {
  var plugins = [autoprefixer()];
  return gulp
    .src(["./sass/main.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("./dist/css"));
}

/**
 * 1. Set the source
 * 2. Initialize sourcemaps
 * 3. Convert to ES5 using Babel
 * 4. Merge everything into a single file.
 * 5. Minify the code
 * 6. Write the sourcemap
 * 7. Write the file
 */
function js() {
  return gulp
    .src(["./js/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: [["@babel/env", { modules: false }]]
      })
    )
    .pipe(concat("app.min.js"))
    .pipe(minifyJS())
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("./dist/js"));
}

/**
 * This export will start the process of watching the 
 * files and running the coresponding function
 */
exports.default = function() {
  gulp.watch("sass/**/*.scss", css);
  gulp.watch("js/**/*.js", js);
};
