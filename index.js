/* jshint node: true */
'use strict';

var cv = require('opencv');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


// try {
//   var vid = new cv.VideoCapture(0);
//   var win = new cv.NamedWindow('Video', 0);
//   vid.read(function (err, im) {
//     if (err) throw err;
//     win.show(im);
//   });
// } catch (e) {
//   console.err('Couldn\'t start camera', e);
// }
var vid = new cv.VideoCapture(0);
var window = new cv.NamedWindow('Image', 0);
var windowObj = {};

app.use(bodyParser.text());

function takePic(win) {
  vid.read(function (err, im) {
    if (err) throw err;
    console.log(im);
    win.show(im);
    win.blockingWaitKey(10, 10);
  });
}

app.post('/', (req, res) => {
  console.log(req.body);
  takePic(window);
  res.sendStatus(200);
});
takePic(window);
// console.log(window.keys);
app.listen(8080, () => console.log('Listening on port 8080!'));
// window.blockingWaitKey(1000, 0);
// console.log('meme');
