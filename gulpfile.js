const { src, watch, dest, parallel } = require("gulp");
const less = require("gulp-less");
const if_ = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");

const with_sourcemaps = () => !!process.env.DEBUG;
const renamer = (path) => {
  const variant = process.argv[3];
  if (variant) {
    // convert main/main-rtl into green/green-rtl
    path.basename = path.basename.replace("main", variant.slice(2));
  }
  return path;
};

const assets_dir = __dirname + "/ckanext/ehaportal/assets";

const build = () =>
  src([
    assets_dir + "/less/ehaportal.less",
  ])
    .pipe(if_(with_sourcemaps(), sourcemaps.init()))
    .pipe(less({ math: "always" }))
    .pipe(if_(with_sourcemaps(), sourcemaps.write()))
    .pipe(rename(renamer))
    .pipe(dest(assets_dir + "/css/"));

const watchSource = () =>
  watch(
    assets_dir + "/less/**/*.less",
    { ignoreInitial: false },
    build
  );

const jquery = () =>
  src(__dirname + "/node_modules/jquery/dist/jquery.js").pipe(
    dest(assets_dir + "/vendor")
  );

const bootstrap = () =>
  src(__dirname + "/node_modules/bootstrap/dist/**/*").pipe(
    dest(assets_dir + "/ckan/public/base/vendor/bootstrap")
  );

const bootstrapLess = () =>
  src(__dirname + "/node_modules/bootstrap/less/**/*").pipe(
    dest(assets_dir + "/ckan/public/base/vendor/bootstrap/less")
  );

const moment = () =>
  src(__dirname + "/node_modules/moment/min/moment-with-locales.js").pipe(
    dest(assets_dir + "/vendor")
  );

const fontAwesomeCss = () =>
  src(__dirname + "/node_modules/font-awesome/css/font-awesome.css").pipe(
    dest(assets_dir + "/vendor/font-awesome/css")
  );

const fontAwesomeFonts = () =>
  src(__dirname + "/node_modules/font-awesome/fonts/*").pipe(
    dest(assets_dir + "/vendor/font-awesome/fonts")
  );

const fontAwesomeLess = () =>
  src(__dirname + "/node_modules/font-awesome/less/*").pipe(
    dest(assets_dir + "/vendor/font-awesome/less")
  );

const jQueryFileUpload = () =>
  src(__dirname + "/node_modules/blueimp-file-upload/js/*.js").pipe(
    dest(assets_dir + "/ckan/public/base/vendor/jquery-fileupload/")
  );

const qs = () =>
  src(__dirname + "/node_modules/qs/dist/qs.js").pipe(
    dest(assets_dir + "/vendor/")
  )

exports.build = build;
exports.watch = watchSource;
exports.updateVendorLibs = parallel(
  moment,
  qs
);

