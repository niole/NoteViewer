var React = require('react');
var ClassTile = require('./ClassTile.js');
var PDF = require('./PDF.js');
var OperatorBar = require('./OperatorBar.js');


var App = React.createClass({
  displayName: 'App',

  propTypes: {
    PDFController: React.PropTypes.object,
    classNotes: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        className: React.PropTypes.string.isRequired,
        notes: React.PropTypes.arrayOf(
          React.PropTypes.shape({
            content: React.PropTypes.string.isRequired,
            fileLabel: React.PropTypes.string.isRequired,
            fileName: React.PropTypes.string.isRequired,
            date: React.PropTypes.number.isRequired,
            lectureNumber: React.PropTypes.number.isRequired,
            className: React.PropTypes.string.isRequired,
            content: React.PropTypes.string.isRequired,
          }).isRequired
        ).isRequired
      }).isRequired
    ).isRequired,
  },

  getInitialState: function() {
    return {
      activePDFs: [],
      activeClasses: [],
    };
  },

  removeNoteFromViewing: function(noteToRemove) {
    var nextViewing = this.state.activePDFs.filter(function(note) {
      return note.fileName !== noteToRemove.fileName;
    });

    this.setState({ activePDFs: nextViewing});
  },

  addNoteToViewing: function(noteToAdd) {
    var nextViewing = [noteToAdd].concat(this.state.activePDFs);

    //need to then create iframe with embedded pdf
    this.setState({ activePDFs: nextViewing});
  },

  getViewedPdfs: function() {
      return this.state.activePDFs.map(function(note, index) {
          return React.createElement(
            PDF,
            {
              key: "%-pdf-text".replace("%", note.fileName),
              textContent: note.content,
              fileName: note.fileName,
            }
          );
      });
  },

  removeAllViewing: function(className) {
    var nextViewing = this.state.activePDFs.filter(function(note) {
      return note.className !== className;
    });

    this.setState({ viewing: nextViewing });
  },

  applyFilterToData: function(filter) {
    this.props.PDFController.addOperator(filter);
    this.forceUpdate();
  },

  toggleClassNotes: function(className) {
    this.setState({ activeClasses: { [className]: true } });
  },

  renderClassTiles: function() {
    var self = this;

    return this.props.classNotes.reduce(function(activeClasses, classNotes, index) {
      if (self.state.activeClasses[classNotes.className]) {

        activeClasses.push(
          React.createElement(
          ClassTile,
            {
              key: "%-class-tile".replace("%", index),
              className: classNotes.className,
              notes: classNotes.notes,
              addNoteToViewing: self.addNoteToViewing,
              removeNoteFromViewing: self.removeNoteFromViewing,
              removeAllViewing: self.removeAllViewing,
            }
          )
        );
      }

      return activeClasses;
    }, []);
  },

  render: function() {
    var self = this;

    return (
      React.createElement('div', { className: "landing-page" },
        React.createElement(
          OperatorBar,
          {
            allClassNames: this.props.classNotes.map(function(notes) { return notes.className; }),
            applyNewFilter: this.applyFilterToData,
            toggleClassNotes: this.toggleClassNotes,
          }
        ),
        React.createElement(
          'div',
          {
            className: "all-classes",
            style: this.state.activePDFs.length ? { width: "20%" } : {},
          },
          this.renderClassTiles()
        ),
        !!this.state.activePDFs.length &&
          React.createElement(
            'div',
            {
              className: "pdf-viewer-container"
            },
            this.getViewedPdfs()
          )
      )
    );
  }
});

module.exports = App;
