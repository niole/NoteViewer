var fs = require('fs');

function textGetter() {
  /**
   * always transforms all files
   * as they may have been updated by the user
   *
   * return [{ fileName: string, content: string }]
   */

  var DIRPATH = './text';
  var allFileText = [];


  fs.readdir(DIRPATH, function(err, fileNames) {
    fileNames.forEach(function(fileName) {
      var filePath = "a/b".replace("a", DIRPATH).replace("b", fileName);
      var text = fs.readFileSync(filePath, "utf8");
      allFileText.push({ fileName: fileName, content: text });
    });
  });

  return allFileText;
}

module.exports = textGetter;
