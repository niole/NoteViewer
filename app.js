var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./view/App.js');

//[{ className: string, notes: [{fileName: string, date: string, lectureNumber: string, className: string}]}]

ReactDOM.render(
  React.createElement(App, {
    classNotes
  }),
  document.getElementById('app')
);
