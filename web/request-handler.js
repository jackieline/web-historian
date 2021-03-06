var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
var worker = require('../workers/htmlfetcher');
// require more modules/folders here!

exports.handleRequest = function (req, res) {


  if (req.method === 'GET') {
  
    if (req.url === '/') {
      httpHelpers.serveAssets(archive.paths.siteAssets, res, '/index.html');
    } else {
      archive.isUrlArchived(req.url, (err, exists) => {
        if (exists) {
          httpHelpers.serveAssets(archive.paths.archivedSites, res, req.url);
        } else {
          httpHelpers.serve404(res);
        }
      });
    }
    
  //res.end(archive.paths.list);
  }
  
  if (req.method === 'POST') {
    var urldata = '';
    var url = '';
    req.on('data', (chunk) => {
      urldata += chunk;
      var url = urldata.split('=')[1].replace('http://', '');
      
      archive.isUrlInList(url, (err, exists) => {
        if (exists) {
          archive.isUrlArchived(url, (err, exists) => {
            if (exists) {
              httpHelpers.serveAssetsPosts(archive.paths.archivedSites, res, '/' + url);
            } else {
              httpHelpers.serveAssetsPosts(archive.paths.siteAssets, res, '/loading.html');
              //worker.work([url]);
              httpHelpers.serveAssetsPosts(archive.paths.archivedSites, res, '/' + url);
            }
          });
        } else {
          console.log('bl kvksl vls');
          archive.addUrlToList(url, (err, data) => {
            console.log('------------>data', url);
            httpHelpers.serveAssetsPosts(archive.paths.siteAssets, res, '/loading.html');
            //worker.work([url]);
            httpHelpers.serveAssetsPosts(archive.paths.archivedSites, res, '/' + url);
          });
        }
      });
    });
    req.on('end', function () {
      console.log('help');
    });
  }
};
