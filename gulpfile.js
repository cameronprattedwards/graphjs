var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat");

gulp.task("build", function () {
	gulp.src("./src/*.js")
		.pipe(concat("Graph.js"))
		.pipe(uglify())
		.pipe(gulp.dest("./dist"));
});