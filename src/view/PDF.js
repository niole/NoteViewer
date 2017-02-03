var React = require('react');

var PDF = React.createClass({
  displayName: 'PDF',

  propTypes: {
    fileName: React.PropTypes.string,
    textContent: React.PropTypes.string.isRequired,
  },

  shouldComponentUpdate: function(newProps, newState) {
    return newProps.textContent !== this.props.textContent;
  },

  getFormattedText: function() {
    var withHTMLLineBreaks = this.props.textContent.replace("\n", "<br/>");
    return React.createElement('div', { dangerouslySetInnerHTML: { __html: withHTMLLineBreaks } });
  },

  getPDFIFrame: function() {
    var pathToPDF = fileName.replace("_","/");
    return false;
  //  return React.createElement("object",
  //                      { data: pathToPDF
  //                        type: "application/pdf"},
  //    React.createElement("embed",
  //                      { src: pathToPDF
  //                        type: "application/pdf"}));
  },

  render: function() {
    return (
      React.createElement('div', { className: "pdf-text" }, this.props.fileName ? this.getPDFIFrame() : this.getFormattedText())
    );
  }
});

module.exports = PDF;
