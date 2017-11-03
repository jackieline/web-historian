// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
// var cron = require('node-cron');

// exports.work = function(url) {
//   archive.downloadUrls(url);
// };

archive.readListOfUrls(archive.downloadUrls);