var createError         = require('http-errors');
var express             = require('express');
var path                = require('path');
var cookieParser        = require('cookie-parser');
var logger              = require('morgan');
var sassMiddleware      = require('node-sass-middleware');
var cron = require('node-cron');
// var { cronJob } = require('./components/cron');


var indexRouter = require('./routes/index');
var playersRouter = require('./routes/players');
var apiInstagram = require('./routes/api/instagram');
const { cronJob } = require('./components/cron');

var app = express();


var cronSchedule = cron.schedule('*/10 * * * * *', () => {
cronJob()
console.log('PM2 IS WORKING EVERY 10 SECONDS')
})

cronSchedule.start()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, '/node_modules/bulma')));

app.use('/', indexRouter);
app.use('/players', playersRouter);
app.use('/api/instagram', apiInstagram);

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
