require("dotenv").config();
var express = require('express');
var path = require('path');
const port = 1993;
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UserRoutes');
var animeRouter = require('./routes/AnimeRoutes');
var kategoriRouter = require('./routes/KategoriRoutes');

var app = express();
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/anime', animeRouter);
app.use('/kategori', kategoriRouter);


app.listen(port, console.log("Server is running on port " + port));

module.exports = app;
