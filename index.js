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

var values = {};

// app.use();

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
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/display/submit', bodyParser.raw({
    type: 'image/jpeg',
    inflate: true,
    limit: '100mb'
}), (req, res) => {
  var windowName = req.get('window-name');
  // if (!(windowName in windows)) {
  //   windows[windowName] = new cv.NamedWindow(windowName, 0);
  // }
  console.log('[' + new Date().toISOString() + '] Received image to ' + windowName);
  showPic(windowName, req.body);
  res.sendStatus(200);
});

app.post('/values/submit', bodyParser.json(), (req, res) => {
        values[req.body.key] = req.body.value;
        console.log(req.body);
        res.sendStatus(200);
});

app.get('/values', (req, res) => {
    console.log('Request: ' + req.query.key, 'Response: ' + values[req.query.key]);
    res.status(200).send(values[req.query.key]);
    res.end();
});

app.use('/display/viewer', express.static(path.join(__dirname, 'web', 'displayviewer')));
app.use('/values/viewer', express.static(path.join(__dirname, 'web', 'valuesviewer')));

http.listen(3000, () => console.log('Listening on port 3000!'));
