var React = require('react');

var LectureNote = React.createClass({
  displayName: 'LectureNote',

  propTypes: {
    fileName: React.PropTypes.string.isRequired,
  },

  render: function() {
    return (
      React.createElement('div', { className: "lecture-note" }, "showing pdf")
    );
  }
});

module.exports = LectureNote;
