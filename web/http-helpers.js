var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(paths, res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile(paths + asset, 'utf8', function(err, html) {
    if (err) {
      throw err;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write(html);
    res.end(html);
  });
};

exports.serveAssetsPosts = function(paths, res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile(paths + asset, 'utf8', function(err, html) {
    if (err) {
      throw err;
    }
    res.writeHead(302, {'Content-Type': 'text/html'});
    //res.write(html);
    res.end(html);
  });
};

exports.serve404 = function(res) {
  res.writeHead(404, {Location: '404: Page not found'});
  res.end();
};



// As you progress, keep thinking about what helper functions you can put here!
