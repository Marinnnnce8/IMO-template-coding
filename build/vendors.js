var concat = require('concat');
var fse = require('fs-extra');
var path = require('path');

var source = [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/popper.js/dist/umd/popper.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/headroom.js/dist/headroom.min.js",
    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js"
];

var outputFile = "dist/js/vendors.js";

var filename = "";
source.forEach(item => {
    fse.copy(item, "dist/js/vendors/" + path.basename(item))
    .then(() => console.log("File copied: " + path.basename(item)))
.catch(err => console.error(err));
});


concat(source, outputFile)
    .then(result => console.log("JS scripts concatenated"))
.catch(err => console.error(err));