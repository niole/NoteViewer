var React = require('react');

var PDF = React.createClass({
  displayName: 'PDF',

  propTypes: {
    textContent: React.PropTypes.string.isRequired,
  },

  shouldComponentUpdate: function(newProps, newState) {
    return newProps.textContent !== this.props.textContent;
  },

  getFormattedText: function() {
    var withHTMLLineBreaks = this.props.textContent.replace("\n", "<br/>");
    return React.createElement('div', { dangerouslySetInnerHTML: { __html: withHTMLLineBreaks } });
  },

  render: function() {
    return (
      React.createElement('div', { className: "pdf-text" }, this.getFormattedText())
    );
  }
});

module.exports = PDF;
