var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var spread2json = require('spread2json');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes.setup(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  var isXHR = req.headers['x-requested-with'] === 'XMLHttpRequest';
  if (err.status === 401) {
    var authUrl = spread2json.generateAuthUrl({ access_type: 'offline' });
    return isXHR ? res.send(302, { redirect: authUrl }) : res.redirect(authUrl);
  }

  res.status(err.status || 500);
  spread2json.logger.error(err.status, err.stack || err);
  return isXHR ? res.send({ message: err.message }) : res.render('error', { message: err.message, error: err });
});


module.exports = app;
