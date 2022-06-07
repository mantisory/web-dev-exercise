const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const del = require("del");

gulp.task("styles", () => {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./src/css/"));
});

gulp.task("clean", () => {
  return del(["css/main.css"]);
});

gulp.task("default", gulp.series(["clean", "styles"]));

gulp.task("watch", () => {
  gulp.watch("src/scss/**/*.scss", (done) => {
    gulp.series(["clean", "styles"])(done);
  });
});
