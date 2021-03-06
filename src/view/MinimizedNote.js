var React = require('react');


var MinimizedNote = React.createClass({
  displayName: 'MinimizedNote',

  getInitialState: function() {
    return {
      shouldExpandNote: false,
    };
  },

  propTypes: {
    fileName: React.PropTypes.string.isRequired,
    fileLabel: React.PropTypes.string.isRequired,
    date: React.PropTypes.number.isRequired,
    lectureNumber: React.PropTypes.number.isRequired,
    className: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    addNoteToViewing: React.PropTypes.func.isRequired,
    removeNoteFromViewing: React.PropTypes.func.isRequired,
  },

  getNoteData: function() {
    return {
      fileName: this.props.fileName,
      date: this.props.date,
      lectureNumber: this.props.lectureNumber,
      className: this.props.className,
      content: this.props.content,
    };
  },

  toggleNote: function(event) {
    event.stopPropagation();

    var shouldExpandNote = this.state.shouldExpandNote;
    var noteData = this.getNoteData();

    if (!shouldExpandNote) {
      //add note to viewing
      this.props.addNoteToViewing(noteData);
    } else {
      //remove note from viewing
      this.props.removeNoteFromViewing(noteData);
    }

    this.setState({ shouldExpandNote: !shouldExpandNote });
  },

  render: function() {
    return (
      React.createElement(
        'div',
        {
          className: this.state.shouldExpandNote ? "note showing" : "note hiding",
          onClick: this.toggleNote,
        },
        this.props.fileLabel
      )
    );
  }
});

module.exports = MinimizedNote;
