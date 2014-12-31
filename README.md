# Moonwalk

A simple event driven directory tree walker.

Example usage:

```javascript
// This program walks all files and directories under /home/sixpounder

var m = new Moonwalker("/home/sixpounder");

m.on("file", function(path) {
    console.log("Found file: " + path);
});

m.on("directory", function(path) {
    console.log("Found directory: " + path);
});

m.on("end", function() {
    console.log("Done");
});

m.walk();
```