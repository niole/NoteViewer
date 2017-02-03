var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-middleware');

var webpackconfig = {
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'app.js'),
  output: {
    path: path.join(__dirname, '.'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      exclude: /node_modules|index.html/
    }]
  }
};

var app = express();
var compiler = webpack(webpackconfig);

app.use(express.static(__dirname + 'bundle.js'));
app.use(webpackMiddleware(compiler));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000);
