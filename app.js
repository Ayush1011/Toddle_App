var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var sessions = require('express-session');
var cred = require('./config/config')

var mongoConnect = require('./config/mongoConnect');

var indexRouter = require('./routes/index');
var tutorRouter = require('./routes/Tutor');
var assignmentRouter = require('./routes/Assigment');
var submissionRouter = require('./routes/Submission');
var loginRouter = require('./routes/Login');
var studentRouter = require('./routes/Student');

var app = express();
app.use(cors());
mongoConnect.connect;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions({
  secret: cred.secret,
  saveUninitialized:true,
  cookie: { maxAge: 3600*5 },
  resave: false
}));

app.use('/', indexRouter);
app.use('/tutor', tutorRouter);
app.use('/assignment', assignmentRouter);
app.use('/submission', submissionRouter);
app.use('/login', loginRouter);
app.use('/student', studentRouter);

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

module.exports = app;
