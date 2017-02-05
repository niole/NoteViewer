var React = require('react');
var Operator = require('../Operator.js');
var constants = require('../constants.js');

var SORT_DATE = constants.SORT_DATE;
var SORT_LECTURE_NUMBER = constants.SORT_LECTURE_NUMBER;
var FILTER_RANGE = constants.FILTER_RANGE;
var ASC = constants.ASC;
var DESC = constants.DESC;
var FILTER_TYPES = [SORT_DATE, SORT_LECTURE_NUMBER/*, FILTER_RANGE TODO this doesn't work*/];
var APPLY_FILTER_BTN_LABEL = "Apply Filter";
var CREATE_NEW_OP_TITLE = "Pick a Class";

var OperatorBar = React.createClass({
  displayName: 'OperatorBar',

  propTypes: {
    allClassNames: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
    applyNewFilter: React.PropTypes.func.isRequired,
    toggleClassNotes: React.PropTypes.func.isRequired,
  },

  componentWillMount: function() {
    this.operatorInProgress = new Operator();
  },

  applyAll: function() {
    this.props.applyNewFilter(this.operatorInProgress);
  },

  updateFilterTypes: function(filterType) {
    this.operatorInProgress.setType(filterType);

    if (this.operatorInProgress.complete()) {
      this.applyAll();
    }

    this.forceUpdate();
  },

  toggleActiveClass: function(name) {
    this.props.toggleClassNotes(name);

    this.operatorInProgress.setClassName(name);

    if (this.operatorInProgress.complete()) {
      this.applyAll();
    }
  },

  getClassNameCheckBoxes: function() {
    var self = this;

    return this.props.allClassNames.map(function(name) {
        var uniqueKey = name+"-checkbox";
        return (
          React.createElement(
            'div',
            {
              key: name+"-check-label",
              className: "class-name-check-label filter-controls",
            },
            React.createElement(
              'input',
              {
                type: "radio",
                id: name,
                name: "class-name-radio",
                ref: uniqueKey,
                key: uniqueKey,
                onChange: self.toggleActiveClass.bind(self, name),
              }
            ),
            React.createElement(
              'label',
              {
                htmlFor: name,
              },
              name
            )
          )
        );
      });
  },

  setFilterValue: function(value) {
    if (!value) {
      value = [new Date(this.refs.lb.value).getTime(), new Date(this.refs.ub.value).getTime()];
    }

    this.operatorInProgress.setArgs(value);
    if (this.operatorInProgress.complete()) {
      this.applyAll();
    }
  },

  getFormattedSortLabel: function(label) {
    return label.replace("_", " by ");
  },

  renderFilterTypeRadioButtons: function() {
    //always for sorting
   var date = this.getFormattedSortLabel(SORT_DATE);
   var lecture = this.getFormattedSortLabel(SORT_LECTURE_NUMBER);

    return [
        React.createElement(
          'input',
          {
            type: "radio",
            id: date,
            name: "group-filter-type",
            key: "%-checkbox".replace("%", SORT_DATE),
            onChange: this.updateFilterTypes.bind(this, SORT_DATE),
          }
        ),
        React.createElement(
          'label',
          {
            key: date,
            htmlFor: date,
          },
          date
        ),
        React.createElement(
          'input',
          {
            type: "radio",
            id: lecture,
            name: "group-filter-type",
            key: "%-checkbox".replace("%", SORT_LECTURE_NUMBER),
            onChange: this.updateFilterTypes.bind(this, SORT_LECTURE_NUMBER),
          }
        ),
        React.createElement(
          'label',
          {
            key: lecture,
            htmlFor: lecture,
          },
          lecture
        )
    ];
  },

  getFilterRadioButtons: function() {
    //always for sorting
    var a = "ascending";
    var d = "descending";

    return [
      React.createElement(
        'input',
        {
          type: "radio",
          id: a,
          name: "group-sort-dir",
          key: "asc-checkbox",
          className: "filter-controls",
          onChange: this.setFilterValue.bind(this, ASC),
        }
      ),
      React.createElement(
        'label',
        {
          key: a,
          htmlFor: a,
        },
        a
      ),
      React.createElement(
        'input',
        {
          type: "radio",
          id: d,
          name: "group-sort-dir",
          key: "desc-checkbox",
          className: "filter-controls",
          onChange: this.setFilterValue.bind(this, DESC),
        }
      ),
      React.createElement(
        'label',
        {
          key: d,
          htmlFor: d,
        },
        d
      )
    ];
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
        return this.getFilterRadioButtons();
      case SORT_LECTURE_NUMBER:
        return this.getFilterRadioButtons();
      case FILTER_RANGE:
        return this.getFilterRangeInputs();
      default:
        break;
    }

  },

  showFilterType: function() {
    return this.operatorInProgress.type();
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
               className: "class-name-checkboxes filter-controls",
             },
            React.createElement(
              'div',
              {
                className: "create-new-title header-one",
              },
              CREATE_NEW_OP_TITLE
            ),
            this.getClassNameCheckBoxes(),
            this.renderFilterTypeRadioButtons(),
            this.showValueInput(this.showFilterType())
          )
        )
      )
    );
  }
});

module.exports = OperatorBar;
