var NA = "n/a";
var getDatePattern = /([0-9]+\/[0-9]+\/[0-9]+)/
var getLectureNumberPattern = /Lecture[\s]+#([0-9]+)/
var getClassPattern = /[\s]*Feynman[\s]+Liang[\s]*\n[\s]*([A-Z]+[\s]+[0-9]+[A-Z])/
var noteHeaderPattern = /[\s]*Feynman[\s]+Liang[\s]*\n[\s]*[A-Z]+[\s]+[0-9]+[A-Z][\s]*\n[\s]*Lecture[\s]+#[0-9]+[\s]*\n[\s]*[0-9]+\/[0-9]+\/[0-9]+[\s]*\n/

function getLectureNumber(text) {
  var number = text.match(getLectureNumberPattern);
  if (number) {
    return number[1];
  }
}

function getClass(text) {
  var clss = text.match(getClassPattern);

  if (clss) {
    return clss[1];
  }
}

function isNoteHeader(text) {
  return noteHeaderPattern.test(text);
}

function getDate(text) {
  var date = text.match(getDatePattern);
  if (date) {
    return date[1];
  }
}

function getHeaderData(fileContent) {
  /**
   * returns date, lecture number, and class name
   */
  var lectureDate = getDate(fileContent);
  var lectureNumber = getLectureNumber(fileContent);
  var className = getClass(fileContent);

  return {
    date: lectureDate || NA,
    lectureNumber: lectureNumber || NA,
    className: className || NA,
  };
}

module.exports = getHeaderData;

