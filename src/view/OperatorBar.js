var React = require('react');
var Operator = require('../Operator.js');
var FilterTypeDropDown = require('./FilterTypeDropDown.js');
var constants = require('../constants.js');

var SORT_DATE = constants.SORT_DATE;
var SORT_LECTURE_NUMBER = constants.SORT_LECTURE_NUMBER;
var FILTER_RANGE = constants.FILTER_RANGE;

var FILTER_TYPES = [SORT_DATE, SORT_LECTURE_NUMBER/*, FILTER_RANGE TODO this doesn't work*/];

var CREATE_NEW_OP_TITLE = "Create New Operator";

var OperatorBar = React.createClass({
  displayName: 'OperatorBar',

  propTypes: {
    allClassNames: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
    applyNewFilter: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      operators: [],
      operatorInProgress: this.getDefaultInProgressOp(),
    };
  },

  applyAll: function() {
    var ops = this.state.operators;
    ops.push(this.state.operatorInProgress);

    this.props.applyNewFilter(this.state.operatorInProgress);

    this.setState({
      operators: ops,
      operatorInProgress: new Operator(),
    });
  },

  getDefaultInProgressOp: function() {
    return new Operator();
  },

  updateFilterTypes: function(filterType) {
    var op = this.state.operatorInProgress;
    op.setType(filterType);

    this.setState({ operatorInProgress: op });
  },

  removeClassFromInProgressOp: function(name) {
    var op = this.state.operatorInProgress;
    op.removeClassName(name);
    this.setState({ operatorInProgress: op });
  },

  addClassToInProgressOp: function(name) {
    var op = this.state.operatorInProgress;
    if (op.classNames().indexOf(name) === -1) {
      op.addClassName(name);
      this.setState({ operatorInProgress: op });
    } else {
      this.removeClassFromInProgressOp(name);
    }
  },

  getClassNameCheckBoxes: function() {
    var self = this;

    return (
      React.createElement(
        'div',
         {
           className: "class-name-checkboxes filter-controls",
         },
          this.props.allClassNames.map(function(name) {
            return (
              React.createElement(
                'div',
                {
                  key: name+"-check-label",
                  className: "class-name-check-label filter-controls",
                },
                name,
                React.createElement(
                  'input',
                  {
                    type: "checkbox",
                    key: name+"-checkbox",
                    onChange: self.addClassToInProgressOp.bind(self, name),
                  }
                )
              )
            );
          })
      )
    );
  },

  setFilterValue: function(value) {
    var op = this.state.operatorInProgress;

    if (!value) {
      value = [new Date(this.refs.lb.value).getTime(), new Date(this.refs.ub.value).getTime()];
    }

    op.setArgs(value);
    this.setState({ operatorInProgress: op });
  },

  getFilterRadioButtons: function(filterType) {
    //always for sorting
    return (
      React.createElement(
        'div',
        {
          className: "sort-type-checkboxes",
        },
        "ascending",
        React.createElement(
          'input',
          {
            type: "checkbox",
            key: "asc-checkbox",
            onChange: this.setFilterValue.bind(this, "asc"),
          }
        ),
        "descending",
        React.createElement(
          'input',
          {
            type: "checkbox",
            key: "desc-checkbox",
            onChange: this.setFilterValue.bind(this, "desc"),
          }
        )
      )
    );
  },

  getFilterRangeInputs: function() {
    //TODO this is not working
    return (
      React.createElement(
        'div',
        {
          className: "filter-range-container",
        },
        React.createElement(
          'input',
          {
            className: "filter-range-input",
            type: "date",
            ref: "lb",
          }
        ),
        React.createElement(
          'input',
          {
            className: "filter-range-input",
            type: "date",
            ref: "ub",
          }
        ),
        React.createElement(
          'button',
          {
            className: "filter-range-submit",
            onClick: this.setFilterValue,
          }
        )
      )
    );
  },

  showValueInput: function(filterType) {
    switch(filterType) {
      case SORT_DATE:
        return this.getFilterRadioButtons(SORT_DATE);
      case SORT_LECTURE_NUMBER:
        return this.getFilterRadioButtons(SORT_LECTURE_NUMBER);
      case FILTER_RANGE:
        return this.getFilterRangeInputs();
      default:
        break;
    }

  },

  showFilterType: function() {
    return this.state.operatorInProgress.type();
  },

  showInprogressOp: function() {
    var filterType = this.showFilterType();

    return (
      React.createElement(
        'div',
        {
          className: "inprgress-op",
        },
        this.state.operatorInProgress.classNames().join(" "),
        filterType,
        this.showValueInput(filterType)
      )
    );
  },

  render: function() {
    return (
      React.createElement(
        'div',
        {
          className: "operator-bar",
        },
        React.createElement(
          'div',
          {
            className: "create-new-operator",
          },
          React.createElement(
            'div',
            {
              className: "create-new-title",
            },
            CREATE_NEW_OP_TITLE
          ),
          this.getClassNameCheckBoxes(),
          React.createElement(
            FilterTypeDropDown,
            {
              filterTypes: FILTER_TYPES,
              selectedTypeCallback: this.updateFilterTypes,
            }
          ),
          React.createElement(
            'button',
            {
              className: "apply-btn",
              onClick: this.applyAll,
            },
            "Apply Filter"
          ),
          this.showInprogressOp()
        )
      )
    );
  }
});

module.exports = OperatorBar;
