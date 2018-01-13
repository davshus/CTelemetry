/* jshint node: true */
'use strict';

var cv = require('opencv');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var windows = {};

app.use(bodyParser.raw({
  type: 'image/jpeg',
  inflate: true,
  limit: '100mb'
}));

function showPic(win, buf) {
  cv.readImage(buf, function (err, im) {
    if (err) throw err;
    win.show(im);
    win.blockingWaitKey(10, 10);
  });
}

app.post('/display', (req, res) => {
  var windowName = req.get('window-name');
  if (!(windowName in windows)) {
    windows[windowName] = new cv.NamedWindow(windowName, 0);
  }
  showPic(windows[windowName], req.body);
  res.sendStatus(200);
});

app.listen(8080, () => console.log('Listening on port 8080!'));
