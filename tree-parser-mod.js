'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dirContent = require('./dir-content');

var _dirContent2 = _interopRequireDefault(_dirContent);

var _parseJson = require('./parse-json');

var _parseJson2 = _interopRequireDefault(_parseJson);

var _includes = require('./helpers/includes');

var _includes2 = _interopRequireDefault(_includes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a directory path and optional names for internal JSON files to include
 * them inside the returned object
 * @param {string} rootPath Absolute or relative path for a directory to parsed
 * @param {Object} filesToParse Comma separated list of JSON file names to be
 * included in the resulting object
 * @returns {Object} A JavaScript object representing a directory tree and its
 * content
 */
var parseTree = function parseTree(rootPath) {
  for (var _len = arguments.length, filesToParse = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    filesToParse[_key - 1] = arguments[_key];
  }

  var dirStructure = {};
  dirStructure._images = [];
  dirStructure._desc = [];

  (0, _dirContent2.default)(rootPath).forEach(function (filePath) {
    var target = _fs2.default.statSync(filePath);
    var fileName = _path2.default.basename(filePath);
    var rawFileName = _path2.default.basename(filePath, '.json');

    if (target.isDirectory()) {
      dirStructure[fileName] = parseTree.apply(undefined, [filePath].concat(filesToParse));
    } else {
      if ((0, _includes2.default)(filesToParse, rawFileName)) {
        dirStructure[rawFileName] = (0, _parseJson2.default)(filePath);
      } else {
        if(fileName == "desc.txt") {
          var test = rootPath;
          var descContent = fs.readFileSync(test + "/" + fileName);
          dirStructure._desc = descContent.toString();
        }
        else {
          dirStructure._images.push(fileName);
        }
      }
    }
  });

  return dirStructure;
};

exports.default = parseTree;
module.exports = exports['default'];
