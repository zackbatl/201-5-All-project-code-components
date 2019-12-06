var http = require('http');
var url = require('url');
var fs = require('fs');
const express = require('express');
const pug = require('pug');
var app = express();

app.set("view engine", "pug");

app.get('/homePage', function(req, res){
  res.render('homePage', {
    title: 'home page',
  });
});

app.get('/videoPage', function(req, res){
  res.render('videoPage', {
    title: 'video page',
  });
});

app.get('/popMemes', function(req, res){
  //print_popular();
  res.render('popMemes', {
    src1: 'https://knowpathology.com.au/app/uploads/2018/07/Happy-Test-Screen-01-825x510.png',
    alt1: 'pleasegod',
    title1: "aaa"
  });
});

app.get('/uploadPage', function(req, res){
  res.render('uploadPage', {
    title: 'upload page',
  });
});

app.get('/signup', function(req,res){
  res.render('signup', {
    title: 'signup page',
  });
});

app.listen(3000);
