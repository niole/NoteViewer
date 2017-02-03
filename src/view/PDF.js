var React = require('react');


var allUnderscores = /_/g;
var rootDistDir = /^dist/;
var txtEnding = /\.txt$/;

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

  getPDFFilePath: function() {
    return this.props.fileName.replace(allUnderscores,"/").replace(rootDistDir, "").replace(txtEnding, "");
  },

  getPDFIFrame: function() {
    var pathToPDF = this.getPDFFilePath();

    return React.createElement("object",
                        { data: pathToPDF,
                          type: "application/pdf"},
      React.createElement("embed",
                        { src: pathToPDF,
                          type: "application/pdf"}));
  },

  render: function() {
    return (
      React.createElement('div', { className: "pdf-text" }, this.props.fileName ? this.getPDFIFrame() : this.getFormattedText())
    );
  }
});

module.exports = PDF;
