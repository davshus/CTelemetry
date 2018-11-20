/* jshint node: true */
'use strict';

// var cv = require('opencv');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var windows = {};

app.use(bodyParser.raw({
  type: 'image/jpeg',
  inflate: true,
  limit: '100mb'
}));

function showPic(windowName, buf) {
  // cv.readImage(buf, function (err, im) {
    // if (err) throw err;
    // win.show(im);
    // win.blockingWaitKey(30, 30);
    io.emit('update', {
      title: windowName,
      data: buf.toString('base64')
    });
  // });
}

app.post('/display/submit', (req, res) => {
  var windowName = req.get('window-name');
  // if (!(windowName in windows)) {
  //   windows[windowName] = new cv.NamedWindow(windowName, 0);
  // }
  showPic(windowName, req.body);
  res.sendStatus(200);
});

app.use('/display/viewer', express.static(path.join(__dirname, 'web', 'displayviewer')));

http.listen(3000, () => console.log('Listening on port 3000!'));
