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
              shouldMinimize: !self.state.shouldShowNotes,
            }
          );
        })
      )
    );
  },

  toggleNotes: function(event) {
    event.preventDefault();
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
