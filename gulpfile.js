var gulp = require("gulp");
var less = require("gulp-less");
var path = require("path");
var fs = require("fs");

gulp.task("less", function (done) {
    fs.stat("./src/css/less/app.less", function (err, stat) {
        if (err != null) {
            console.log("Error:" + err.code);
        }
    });
    gulp.src("./src/css/less/app.less")
        .pipe(
            less({
                paths: [path.join(__dirname, "less", "includes")]
            })
        )
        .pipe(gulp.dest("./src/css/"));
    done();
});

gulp.task("default", function (done) {
    gulp.watch(
        ["./src/css/less/*.less", "./src/css/less/_*.less"],
        gulp.series(["less"])
    );
    done();
});
