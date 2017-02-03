var React = require('react');
var ClassTile = require('./ClassTile.js');


var App = React.createClass({
  displayName: 'App',

  propTypes: {
    classNotes: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        className: React.PropTypes.string.isRequired,
        notes: React.PropTypes.arrayOf(
          React.PropTypes.shape({
            fileName: React.PropTypes.string.isRequired,
            date: React.PropTypes.string.isRequired,
            lectureNumber: React.PropTypes.string.isRequired,
            className: React.PropTypes.string.isRequired,
          }).isRequired
        ).isRequired
      }).isRequired
    ).isRequired,
  },

  render: function() {
    return (
      React.createElement('div', { className: "all-classes" },
        this.props.classNotes.map(function(classNotes, index) {
          return React.createElement(ClassTile, {
            key: "%-class-tile".replace("%", index),
            className: classNotes.className,
            notes: classNotes.notes,
          });
        })
      )
    );
  }
});

module.exports = App;
