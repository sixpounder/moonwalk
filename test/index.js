var Moonwalker = require('../index');

module.exports = function() {

  var m = new Moonwalker(__dirname);

  m.on("file", function(path) {
    console.log("File path: " + path);
  });

  m.on("directory", function(path) {
    console.log("Directory path: " + path);
  });

  m.on("end", function() {
    console.log("Done");
  });
  

  m.walk();
};