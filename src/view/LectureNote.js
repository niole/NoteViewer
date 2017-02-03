var React = require('react');

var SHOWING_PDF_TEXT = "showing pdf";

var LectureNote = React.createClass({
  displayName: 'LectureNote',

  propTypes: {
    fileName: React.PropTypes.string.isRequired,
  },

  render: function() {
    return (
      React.createElement('div', { className: "lecture-note" }, SHOWING_PDF_TEXT)
    );
  }
});

module.exports = LectureNote;
