var React = require('react');

var LectureNote = React.createClass({
  displayName: 'LectureNote',

  propTypes: {
    fileName: React.PropTypes.string.isRequired,
  },

  render: function() {
    return (
      React.createElement('div', { className: "lecture-note" })/*will show pdf*/
    );
  }
});

module.exports = LectureNote;
