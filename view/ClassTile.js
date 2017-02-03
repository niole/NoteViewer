var React = require('react');
var MinimizedNote = require('./MinimizedNote.js');

var ClassTile = React.createClass({
  displayName: 'ClassTile',

  getInitialState: function() {
    return {
      shouldShowNotes: false,
    };
  },

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
  },

  showNotes: function() {
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
              shouldMinimize: !this.state.shouldShowNotes,
            }
          );
        })
      )
    );
  },

  render: function() {
    return (
      React.createElement('div',
        { className: "class-tile" },
        React.createElement('div', { className: "class-name" }, this.props.className),
        this.state.shouldShowNotes && this.showNotes()
       )
    );
  }
});

module.exports = ClassTile;
