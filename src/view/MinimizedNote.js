var React = require('react');
var LectureNote = require('./LectureNote.js');

var MinimizedNote = React.createClass({
  displayName: 'MinimizedNote',

  getInitialState: function() {
    return {
      shouldExpandNote: false,
    };
  },

  propTypes: {
    fileName: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    lectureNumber: React.PropTypes.string.isRequired,
    className: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    shouldMinimize: React.PropTypes.bool.isRequired,
    addNoteToViewing: React.PropTypes.func.isRequired,
    removeNoteFromViewing: React.PropTypes.func.isRequired,
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.shouldMinimize) {
      //make sure component level state is in sync with parent
      //component TODO does this even matter? might be jumping the gun
      this.setState({
        shouldExpandNote: false,
      });
    }
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
        'li',
        {
          onClick: this.toggleNote,
        },
        this.state.shouldExpandNote ?
        React.createElement(LectureNote, { fileName: this.props.fileName }) :
        this.props.fileName
      )
    );
  }
});

module.exports = MinimizedNote;
