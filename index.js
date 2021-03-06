var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-middleware');

var webpackconfig = {
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'src/app.js'),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  }
};

var app = express();
var compiler = webpack(webpackconfig);

app.use(express.static('dist'));
app.use(webpackMiddleware(compiler));
app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000);
