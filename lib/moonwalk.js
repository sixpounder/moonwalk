'use strict';

var nodePath = require('path');
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Moonwalk = function Moonwalk(path) {
  var $this = this;

  $this.setMaxListeners(0);

  $this.path = path || './';
};

util.inherits(Moonwalk, EventEmitter);

Moonwalk.prototype.walk = function walk(path) {

  var $this = this;

  path = path || $this.path;

  var fail = function(err) {
    dead = true;
    $this.emit("error", err);
  };

  var onDirectory = function(path) {
    $this.emit("directory", path);
  };

  var onFile = function(path) {
    $this.emit("file", path);
  };

  var complete = function() {
    $this.emit("end");
  };

  var end = function() {
    if(!dead && pending == 0) {
      return true;
    } else {
      return false;
    }
  };

  var dead = false;
  var pending = 0;

  var walkImpl = function(path) {
    pending++;

    fs.readdir(path, function(err, list) {
      if (! dead) {
        if (err) {
          fail(err);
        } else {
          
          list.forEach(function(file) {
            
            if(!dead) {
                          
              var newPath = nodePath.resolve(path, file);

              pending++;
            
              fs.stat(newPath, function(err, stat) {
                if(!dead) {
                  if (err) {
                    fail(err);
                  }
                  else {
                    if (stat && stat.isDirectory()) {
                      onDirectory(newPath);
                      walkImpl(newPath);
                    }
                    else {
                      onFile(newPath);
                    }
                    pending--;
                    if(end()) {
                      complete();
                    }
                  }
                }
              });
            }

          });

          pending--;
          if(end()) {
            complete();
          }
        }
      }
    });
  };

  walkImpl(path);
  
};

module.exports = Moonwalk;