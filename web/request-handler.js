var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  req.method = 'GET';
  // var url = 'http://127.0.0.1:8080/';
  // https.get(url, res => {
  //   res.setEncoding('utf8');
  //   let body = "";
  //   res.on("data", data => {
  //     body += data;

  //   });
  fs.readFile('./web/public/index.html', function(err, html) {
    if (err) {
      throw err;
    }
    res.writeHead(200, {'Content-Type': 'text/html', Location: './index.html'});
    //res.write(html);
    res.end(html);
  //   });
  });
  //res.end(archive.paths.list);
};
