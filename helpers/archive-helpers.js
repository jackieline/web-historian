var fs = require('fs');
var path = require('path');
var _ = require('underscore');


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
      callback(null, err);
    } else {
      callback(data.split('\n'), null);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  var siteList = [];
  exports.readListOfUrls((data) => {
    console.log('look here', data);
    for (var i = 0; i < data.length; i++) {
      siteList.push(data[i]);
    }
    console.log('thisssssssssssssssssssss', siteList);
    return siteList;
  });
  console.log('####', siteList);
};

exports.addUrlToList = function(url, callback) {
};

exports.isUrlArchived = function(url, callback) {

};

exports.downloadUrls = function(urls) {
};
