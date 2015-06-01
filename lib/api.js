/**
 * @fileOverview
 * @name api.js
 * @author Yuhei Aihara <aihara_yuhei@cyberagent.co.jp>
 */
var fs = require('fs');

var spread2json = require('spread2json');

function Api() {
  this.opts = require('../opts');
  this.spreadsheets = {};
}

module.exports = new Api();

Api.prototype.setup = function() {
  spread2json.setup(this.opts);
  if (fs.existsSync(this.opts.spreadsheets_path)) {
    this.spreadsheets = JSON.parse(fs.readFileSync(this.opts.spreadsheets_path, 'utf8'));
  }
};

Api.prototype.token = function(code, callback) {
  spread2json.getAccessToken(code, callback);
};

Api.prototype.getSpreadsheets = function() {
  var list = [];
  for (var id in this.spreadsheets) {
    list.push({
      id: id,
      worksheets: this.spreadsheets[id]
    });
  }

  return list;
};

Api.prototype.getSpreadsheetsInfo = function(callback) {
  spread2json.getSpreadsheet(callback);
};

Api.prototype.setSpreadsheet = function(key, callback) {
  var self = this;
  spread2json.getWorksheet(key, function(err, result) {
    if (err) {
      return callback(err);
    }

    self.spreadsheets[key] = result;
    fs.writeFile(self.opts.spreadsheets_path, JSON.stringify(self.spreadsheets, null, 2), callback);
  });
};

Api.prototype.convert = function(key, sheets, callback) {
  spread2json.getWorksheetDatas(key, sheets, function(err, result) {
    if (err) {
      return callback(err);
    }

    spread2json.toJson(result, callback);
  });
};
