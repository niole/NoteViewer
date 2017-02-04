var getHeaderData = require('./getHeaderData.js');
var constants = require('./constants.js');

var SORT_DATE = constants.SORT_DATE;
var SORT_LECTURE_NUMBER = constants.SORT_LECTURE_NUMBER;
var FILTER_RANGE = constants.FILTER_RANGE;
var ASC = constants.ASC;


var fileLabelPattern = /_(lec[0-9]+)\.pdf\.txt$/;


function PDFController(noteJSON) {
  this.classIndex = {};
  this.data = [];
  this.operators = [];

  this.setData(noteJSON);
}

PDFController.prototype.constructor = PDFController;

PDFController.prototype.setData = function(json) {
  this.data = this.JSONtoData(json);
};

PDFController.prototype.removeOperator = function(op) {
  //controls removal of all operators

  var id = op.id();
  var type = op.type();

  this.operators = this.operators.filter(function(operator) {
    return operator.id() !== id;
  });

  //update data
  switch(type) {
    case FILTER_RANGE:
      this.removeFilterOnRange(op);
      break;
    default:
      break;
  }
};

PDFController.prototype.removeFilterOnRange = function(op) {
  var self = this;
  var classNames = op.classNames();
  var index;
  var lb = op.args()[0];
  var ub = op.args()[1];

  classNames.forEach(function(className) {
    index = self.classIndex[className];
    this.data[index].notes = this.data[index].notes.map(function(note) {
      if (note.date >= lb && note.date <= ub) {
        note.show = true;
      }
      return note;
    });
  });
};

PDFController.prototype.removeAllOperators = function() {
  this.operators = [];
  this.data = this.data.map(function(clss) {
    clss.notes = clss.notes.map(function(note) {
      note.show = true;
      return note;
    });
    return clss;
  });
};

PDFController.prototype.addOperator = function(op) {
  var type = op.type();
  this.operators.push(op);

  switch(type) {
    case SORT_DATE:
      this.sortClassByDate(op.classNames(), op.args() === ASC);
      break;
    case SORT_LECTURE_NUMBER:
      this.sortClassByLectureNumber(op.classNames(), op.args() === ASC);
      break;
    case FILTER_RANGE:
      this.filterOnRange(op.classNames(), op.args()[0], op.args()[1]);
      break;
    default:
      break;
  }

};

PDFController.prototype.sortBy = function(index, key, ascending) {
  this.data[index].notes = this.data[index].notes.sort(function(a, b) {
    return ascending ? a[key] - b[key] : b[key] - a[key];
  });
};

PDFController.prototype.filterOnRange = function(classNames, startDate, endDate) {
  //assumes ms representation for dates
  var self = this;
  var index;
  classNames.forEach(function(className) {
    index = self.classIndex[className];
    self.data[index].notes = self.data[index].notes.map(function(note) {
      if (note.date >= startDate && note.date <= endDate) {
        note.show = true;
      } else {
        note.show = false;
      }
      return note;
    });
  });
};

PDFController.prototype.sortClassByLectureNumber = function(classNames, ascending) {
  //mutates data
  var self = this;

  classNames.forEach(function(className) {
    self.sortBy(self.classIndex[className], 'lectureNumber', ascending);
  });
};

PDFController.prototype.sortClassByDate = function(classNames, ascending) {
  //mutates data
  var self = this;

  classNames.forEach(function(className) {
    self.sortBy(self.classIndex[className], 'date', ascending);
  });

};

PDFController.prototype.JSONtoData = function(json) {
  var allFormattedNoteData = json.map(function(nameAndContent) {
    var headerData = getHeaderData(nameAndContent.content);
    var fileLabel = nameAndContent.fileName;
    var label = nameAndContent.fileName.match(fileLabelPattern);

    if (label) {
      fileLabel = label[1];
    }

    return {
      fileName: nameAndContent.fileName,
      fileLabel: fileLabel,
      date: new Date(headerData.date).getTime(),
      lectureNumber: parseInt(headerData.lectureNumber),
      className: headerData.className,
      content: nameAndContent.content,
      show: true,
    };
  });

  //group notes by className
  var totalClasses = 0;
  var groupedNotes = allFormattedNoteData.reduce(function(groups, noteData) {
    if (groups[noteData.className]) {
      groups[noteData.className].push(noteData);
    } else {
      totalClasses += 1;
      groups[noteData.className] = [noteData];
    }
    return groups;
  }, {});

  var arrayOfNoteGroups = new Array(totalClasses);
  var className;
  var indexClassName = 0;
  for (className in groupedNotes) {
    this.classIndex[className] = indexClassName;
    arrayOfNoteGroups[indexClassName] = {
      className: className,
      notes: groupedNotes[className],
    };
    indexClassName += 1;
  }

  return arrayOfNoteGroups;
};

module.exports = PDFController;
