var React = require('react');
var ClassTile = require('./ClassTile.js');
var PDF = require('./PDF.js');


var App = React.createClass({
  displayName: 'App',

  propTypes: {
    classNotes: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        className: React.PropTypes.string.isRequired,
        notes: React.PropTypes.arrayOf(
          React.PropTypes.shape({
            content: React.PropTypes.string.isRequired,
            fileName: React.PropTypes.string.isRequired,
            date: React.PropTypes.string.isRequired,
            lectureNumber: React.PropTypes.string.isRequired,
            className: React.PropTypes.string.isRequired,
            content: React.PropTypes.string.isRequired,
          }).isRequired
        ).isRequired
      }).isRequired
    ).isRequired,
  },

  getInitialState: function() {
    return {
      viewing: [], //notes currently being viewed
    };
  },

  removeNoteFromViewing: function(noteToRemove) {
    var nextViewing = this.state.viewing.filter(function(note) {
      return note.fileName !== noteToRemove.fileName;
    });

    this.setState({ viewing: nextViewing});
  },

  addNoteToViewing: function(noteToAdd) {
    var nextViewing = [noteToAdd].concat(this.state.viewing);
    this.setState({ viewing: nextViewing});
  },

  getViewedPdfs: function() {
      return this.state.viewing.map(function(pdfContent, index) {
          return React.createElement(
            PDF,
            {
              key: "%-pdf-text".replace("%", index),
              textContent: pdfContent.content
            }
          );
      });
  },

  removeAllViewing: function(className) {
    var nextViewing = this.state.viewing.filter(function(note) {
      return note.className !== className;
    });

    this.setState({ viewing: nextViewing });
  },

  render: function() {
    var self = this;
    return (
      React.createElement('div', { className: "landing-page" },
        React.createElement('div', { className: "all-classes" },
          this.props.classNotes.map(function(classNotes, index) {
            return React.createElement(
              ClassTile,
              {
                key: "%-class-tile".replace("%", index),
                className: classNotes.className,
                notes: classNotes.notes,
                addNoteToViewing: self.addNoteToViewing,
                removeNoteFromViewing: self.removeNoteFromViewing,
                removeAllViewing: self.removeAllViewing,
              }
            );
          })
        ),
        !!this.state.viewing.length &&
          React.createElement('div', { className: "pdf-viewer-container" }, this.getViewedPdfs())
      )
    );
  }
});

module.exports = App;
