var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      callback(err, null); 
    } else {
      callback(null, data.split('\n')); // either true or false
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function findUrlInList(err, data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i] === url) {
        return callback(err, true);
      }
    }
    return callback(err, false);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, '\n' + url, function(err, data) {
    if (err) {
      callback(err, null);   
    } else {
      callback(null, data);
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  if (fs.existsSync(exports.paths.archivedSites + '/' + url)) {
    console.log(exports.paths.archivedSites + '/' + url);
    return callback(null, true);
  } else {
    return callback(null, false);
  }
};

exports.downloadUrls = function(urls) {
  var storage = [];
  for (var i = 0; i < urls.length; i++) {
    var file = fs.createWriteStream(urls[i]);
    console.log('hello!', urls[i]);
    var options = {
      host: urls[i],
      port: 80,
      path: '/'
    };
    http.get(options, function(response) {
      response.pipe(file);
    });
  }
  
};
