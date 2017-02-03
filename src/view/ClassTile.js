var React = require('react');
var MinimizedNote = require('./MinimizedNote.js');

var ClassTile = React.createClass({
  displayName: 'ClassTile',

  propTypes: {
    className: React.PropTypes.string.isRequired,
    notes: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        fileName: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        lectureNumber: React.PropTypes.string.isRequired,
        className: React.PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    addNoteToViewing: React.PropTypes.func.isRequired,
    removeNoteFromViewing: React.PropTypes.func.isRequired,
    removeAllViewing: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      shouldShowNotes: false,
    };
  },

  showNotes: function() {
    var self = this;
    return (
      React.createElement('ul', {},
        this.props.notes.map(function(note, index) {
          return React.createElement(MinimizedNote,
            {
              key: "%-min-note".replace("%", index),
              fileName: note.fileName,
              date: note.date,
              lectureNumber: note.lectureNumber,
              className: note.className,
              content: note.content,
              shouldMinimize: !self.state.shouldShowNotes,
              addNoteToViewing: self.props.addNoteToViewing,
              removeNoteFromViewing: self.props.removeNoteFromViewing,
            }
          );
        })
      )
    );
  },

  toggleNotes: function(event) {
    event.preventDefault();

    //TODO be able to remove all of a className when tile is closed
    //addNoteToViewing: React.PropTypes.func.isRequired,
    //removeNoteFromViewing: React.PropTypes.func.isRequired,
    if (this.state.shouldShowNotes) {
      this.props.removeAllViewing(this.props.className);
    }

    this.setState({ shouldShowNotes: !this.state.shouldShowNotes });
  },

  render: function() {
    return (
      React.createElement(
        'div',
        {
          onClick: this.toggleNotes,
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
            this.state.shouldShowNotes && this.showNotes()
          )
       )
    );
  }
});

module.exports = ClassTile;
