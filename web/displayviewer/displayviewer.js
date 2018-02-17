var socket = io();
socket.on('update', function(update) {
	var windowName = update.title;
	var imageData = update.data;
	var elem = document.getElementById(windowName);
	if (elem == null) {
		createWindow(windowName);
	}
	updateWindow(windowName, imageData);
});

function createWindow(windowName) {
	var newWindow = document.createElement('div');
	newWindow.id = windowName;
	var title = document.createElement('h1');
	title.appendChild(document.createTextNode(windowName));
	newWindow.appendChild(title);
	newWindow.appendChild(document.createElement('img'));
	document.body.appendChild(newWindow);
}

function updateWindow(windowName, data) {
	document.getElementById(windowName).querySelector('img').src = b64transform(data);
}

var b64transform = function(b64) {
	return 'data:image/jpeg;base64, ' + b64;
}