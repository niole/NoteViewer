var React = require('react');
var MinimizedNote = require('./MinimizedNote.js');

var ClassTile = React.createClass({
  displayName: 'ClassTile',

  propTypes: {
    className: React.PropTypes.string.isRequired,
    notes: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        fileName: React.PropTypes.string.isRequired,
        date: React.PropTypes.number.isRequired,
        lectureNumber: React.PropTypes.number.isRequired,
        className: React.PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    addNoteToViewing: React.PropTypes.func.isRequired,
    removeNoteFromViewing: React.PropTypes.func.isRequired,
    removeAllViewing: React.PropTypes.func.isRequired,
  },

  showNotes: function() {
    var self = this;
    return (
      React.createElement('ul', {},
        this.props.notes.map(function(note, index) {
          return React.createElement(
            MinimizedNote,
            {
              key: "%-min-note".replace("%", note.fileName),
              fileName: note.fileName,
              fileLabel: note.fileLabel,
              date: note.date,
              lectureNumber: note.lectureNumber,
              className: note.className,
              content: note.content,
              addNoteToViewing: self.props.addNoteToViewing,
              removeNoteFromViewing: self.props.removeNoteFromViewing,
            }
          );
        })
      )
    );
  },

  render: function() {
    return (
      React.createElement(
        'div',
        {
          className: "class-tile",
        },
        React.createElement(
          'div',
          {
            className: "class-name",
          },
          this.props.className),
          React.createElement(
            'div',
            {
              className: "note-titles",
            },
            this.showNotes()
          )
       )
    );
  }
});

module.exports = ClassTile;
