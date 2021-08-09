var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const sequelize = require('./models/index').sequelize;

sequelize.sync();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.get("/",(req,res)=>{
//   res.render('layout');
// })



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  const error = new Error ('Page not found');
  error.status=404;
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if (err.status== 404){
    err.message = 'Error occured , page not found.';
    console.log('Error 404 page-not-found');
    res.render('page_not_found',{err});
}
else{
    err.message = 'Error , return to main page ';
    err.status=500;
    res.render('error',{err});
}
});

module.exports = app;
