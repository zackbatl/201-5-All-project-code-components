var http = require('http');
var url = require('url');
var fs = require('fs');
const express = require('express');
const pug = require('pug');
var app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());              
app.use(bodyParser.urlencoded({ extended: true })); 

const PORT = process.env.PORT || 3000;

const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'postgres',
	user: 'postgres',
	password: ''
};

let db = pgp(dbConfig);

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
	res.render('popMemes' , {
		title: 'pop memes',
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


app.post('/signup', function(req, res)
{
  var user = req.body.uname;
  var pword = req.body.passwrd;
  // console.log(user, pword)
  // console.log("INSERT INTO users(username, pwd) VALUES('" + user + "', '" +  pword + ");")
  var insert_data = "INSERT INTO users(username, pwd) VALUES('" + user + "', '" +  pword + "');";
  console.log(user, pword)
  //var query2 = "SELECT COUNT(*) FROM users WHERE user = username;";

  db.any(insert_data)
    .then(info =>
    {
      //console.log(info)
      res.render('signup', {
        title: 'signup page',
        data: info
      })
      // res.render('homePage', {
      //   title: 'home page'
      // })
    })
    // .then(() => res.render('homePage'))
    .catch(function(err){
        console.log("Error: ", err);
    })
});


app.post('/homePage/login', function(req, res)
{
  var usser = req.body.username;
  var pass = req.body.paswerd;
  var query1 = "SELECT * FROM users WHERE username = '" + usser + "' AND pwd = '" + pass + "';";
  db.any(query1)
  .then(info => {
    res.render('homepage', {
      title: "homePage",
      data: info,
      // command: 'alert("Success")',
      username: usser
    })
    console.log(info)
  })
  .catch(function(err)
  {
    console.log("Error: ", err);
  })

});

app.listen(PORT);
