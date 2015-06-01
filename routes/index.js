var express = require('express');
var router = express.Router();

var api = require('../lib/api');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/partials/:name', function(req, res) {
  res.render('partials/' + req.params.name);
});

router.get('/oauth2callback', function(req, res, next) {
  api.token(req.query.code, function(err) {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
});

router.get('/_/spread', function(req, res) {
  var result = api.getSpreadsheets();
  res.send({ spreadList: result });
});

router.get('/_/spreadInfo', function(req, res, next) {
  api.getSpreadsheetsInfo(function(err, result) {
    if (err) {
      return next(err);
    }

    res.send(result);
  });
});

router.post('/_/spread', function(req, res, next) {
  api.setSpreadsheet(req.body.id, function(err) {
    if (err) {
      return next(err);
    }

    res.end();
  });
});

router.post('/_/convert', function(req, res, next) {
  api.convert(req.body.id, req.body.sheets, function(err, result) {
    if (err) {
      return next(err);
    }

    res.send(result);
  });
});

module.exports.setup = function(app) {
  api.setup();
  app.use('/', router);
  app.use('/partials/:name', router);
  app.use('/oauth2callback', router);
  app.use('/_/spread', router);
  app.use('/_/convert', router);
};
