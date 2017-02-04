var React = require('react');


var SELECT_FILTER_TYPE_BTN_LABEL = "Select Filter Type";

var FilterTypeDropDown = React.createClass({
  displayName: 'FilterTypeDropDown',

  propTypes: {
    filterTypes: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
    selectedTypeCallback: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      selected: "",
      showDropDown: false,
    };
  },

  toggle: function(event) {
    event.stopPropagation();
    this.setState({ showDropDown: !this.state.showDropDown });
  },

  select: function(filterType, event) {
    event.stopPropagation();
    var nextState = this.state.selected;
    if (this.state.selected[filterType]) {
      //deselect
      nextState = "";
    } else {
      nextState = filterType;
    }

    this.props.selectedTypeCallback(nextState);

    this.setState({
      selected: nextState,
      showDropDown: false,
    });
  },

  render: function() {
    var self = this;

    return (
      React.createElement(
        'div',
        {
          className: "dropdown-container filter-controls",
        },
        React.createElement(
          'button',
          {
            className: "dropdown-btn",
            onClick: self.toggle,
          },
          SELECT_FILTER_TYPE_BTN_LABEL
        ),
        this.state.showDropDown &&
          React.createElement(
            'ul',
            {},
            this.props.filterTypes.map(function(type) {
              return (
                React.createElement(
                  'li',
                  {
                    key: type+"-option",
                    className: "filter-option%".replace("%", self.state.selected === type ? "-selected" : ""),
                    onClick: self.select.bind(self, type),
                  },
                  type
                )
              );
            })
          )
      )
    );
  }
});

module.exports = FilterTypeDropDown;
