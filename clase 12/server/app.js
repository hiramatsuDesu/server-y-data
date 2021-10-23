var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const handlebars = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tvshowsRouter = require('./routes/tvshows');
var tvshowsApiRouter = require('./routes/api/tvshowsapi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false, limit: '5mb' }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tvshows', tvshowsRouter);
app.use('/api/tvshows', tvshowsApiRouter);

//Metodo de manejo de opciones con handlebars helpers.
handlebars.registerHelper('selected', function(genre, valor) {
  if (genre == valor) {
    return 'selected';
  } else {
    return '';
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect("mongodb://localhost:27017/tvshows", (error) => {
  if (error) {
    console.log("Error al conectarse con base de datos... " + error.message);
  } else {
    console.log("Conectado con la base de datos en: mongodb://localhost:27017/tvshows" );
  }
});

module.exports = app;