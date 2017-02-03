var fs = require('fs');

function textGetter() {
  /**
   * always transforms all files
   * as they may have been updated by the user
   *
   * return [{ fileName: string, content: string }]
   */
  var DIRPATH = './text';

  return fs.readdirSync(DIRPATH).map(function(fileName) {
      var filePath = "a/b".replace("a", DIRPATH).replace("b", fileName);
      var text = fs.readFileSync(filePath, "utf8");
      return { fileName: fileName, content: text };
  });
}

var text = textGetter();
var json = JSON.stringify(text);
fs.writeFile('allPdfs.json', json, 'utf8', function() {
  console.log('successfully wrote allPdfs.json');
});
