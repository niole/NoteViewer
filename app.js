var React = require('react');
var ReactDOM = require('react-dom');

var propTypes  = {
  foo: React.PropTypes.oneOfType([
       React.PropTypes.string,
       React.PropTypes.shape({
        bar: React.PropTypes.shape({
          car: React.PropTypes.number
        })
      })
    ])
};

var rootElement = React.createElement('div', {}, "Contacts");

var MyComponent = React.createClass({
  displayName: "MyComponent",
  render: function() {
    return rootElement;
  }
});

MyComponent.propTypes = propTypes;

ReactDOM.render(React.createElement(MyComponent, { foo: { bar: "x" } }), document.getElementById('app'));
