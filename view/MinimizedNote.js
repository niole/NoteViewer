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
    shouldMinimize: React.PropTypes.bool.isRequired,
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

  toggleNote: function() {
    this.setState({ shouldExpandNote: !this.state.shouldExpandNote });
  },

  render: function() {
    return (
      React.createElement(
        'li',
        {
          onClick: this.toggleNote,
        },
        this.state.shouldExpandNote ?
        React.createElement(LectureNote, {
          fileName: this.props.fileName,
        }) :
        this.props.fileName
      )
    );
  }
});

module.exports = MinimizedNote;
