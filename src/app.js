var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./view/App.js');
var noteData = require('../allPdfs.json');
var PDFController = require('./PDFController.js');


//allPdfs.json --> [{ className: string, notes: [{fileName: string, date: string, lectureNumber: string, className: string}]}]

var pc = new PDFController(noteData);

ReactDOM.render(
  React.createElement(App, {
    PDFController: pc,
    classNotes: pc.data,
  }),
  document.getElementById('app')
);
