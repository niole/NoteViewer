var React = require('react');

var PDF = React.createClass({
  displayName: 'PDF',

  propTypes: {
    textContent: React.PropTypes.string.isRequired,
  },

  render: function() {
    return (
      React.createElement('div', { className: "pdf-text" }, this.props.textContent)
    );
  }
});

module.exports = PDF;
