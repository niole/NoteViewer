var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./view/App.js');
var getHeaderData = require('./getHeaderData.js');
var textGetter = require('./textGetter.js');


//[{ className: string, notes: [{fileName: string, date: string, lectureNumber: string, className: string}]}]

function getFormattedClassNotes() {
  var noteData = textGetter();
  var allFormattedNoteData = noteData.map(function(nameAndContent) {
    var headerData = getHeaderData(nameAndContent.content);

    return {
      fileName: nameAndContent.fileName,
      date: headerData.date,
      lectureNumber: headerData.lectureNumber,
      className: headerData.className
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
    arrayOfNoteGroups[indexClassName] = {
      className: className,
      notes: groupedNotes[className],
    };
    indexClassName += 1;
  }

  return arrayOfNoteGroups;
}

ReactDOM.render(
  React.createElement(App, {
    classNotes: getFormattedClassNotes(),
  }),
  document.getElementById('app')
);
