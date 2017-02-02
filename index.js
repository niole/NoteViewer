var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(__dirname + 'bundle.js'));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000);
