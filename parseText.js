var fs = require('fs');

var path = '../../python/output.txt';
var text = fs.readFileSync(path, "utf8");

var DEF = "Definition";
var EXAMPLE = "Example";
var EXERCISE = "Exercise";
var LEMMA = "Lemma";
var COROLLARY = "Corollary";
var LECTURE = "Lecture";
var FL = "Feynman Liang";

var bigHeaderStart = /^[0-9]+[\s+]$/
var listStartNumber = /^\([0-9]+\)$/
var listStartChr = /^\([a-zA-Z]+\)$/
var isDatePattern = /^[0-9]+\/[0-9]+\/[0-9]+$/
var getDatePattern = /[0-9]+\/[0-9]+\/[0-9]+/
var getLectureNumberPattern = /Lecture[\s]+#([0-9]+)/
var getClassPattern = /[\s]*Feynman[\s]+Liang[\s]*\n[\s]*([A-Z]+[\s]+[0-9]+[A-Z])/
var noteHeaderPattern = /[\s]*Feynman[\s]+Liang[\s]*\n[\s]*[A-Z]+[\s]+[0-9]+[A-Z][\s]*\n[\s]*Lecture[\s]+#[0-9]+[\s]*\n[\s]*[0-9]+\/[0-9]+\/[0-9]+[\s]*\n/

function getLectureDate(text) {
  return text.match(isDatePattern);
}

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

function isFL(text) {
  return text === FL;
}

function getDate(text) {
  var date = text.match(getDatePattern);
  if (date) {
    return new Date(date);
  }
}

function isDate(text) {
  return isDatePattern.test(text);
}

function isListElement(text) {
  return listStartChr.test(text) || listStartNumber.test(text);
}

function getStyleNode(text, type, style) {
  /**
    a style node includes inline style information
    the type of HTML element it will be
   */

  return {
    text: text,
    type: type,
    style: style,
  };
}

function updateStyleNodeText(styleNode, text) {
  styleNode.text += " " + text;
  return styleNode;
}

function updateStyleNodeStyle(styleNode, key, newValue) {
  styleNode[key] = newValue;
  return styleNode;
}

function isBigHeaderStart(text) {
  return bigHeaderStart.test(text);
}

function isLineBreak(text) {
  return text === "\n";
}

function parseText(text) {
  for (var i=0; i < text.length; i++) {
    var t = text[i];
    if (isLineBreak(t)) {
      console.log('linebreak');
    } else {
      console.log('t', t);
    }
  }
}

