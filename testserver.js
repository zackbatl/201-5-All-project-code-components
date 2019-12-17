var http = require('http');
var url = require('url');
var fs = require('fs');
const express = require('express');
const pug = require('pug');
const pgp = require('pg-promise);
var app = express();

const PORT = process.env.PORT || 3000;

const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: ''
}

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


/*var card = {
    title0: ,
    alt0: ,
    src0: ,

  };*/

app.get('/popMemes', function(req, res){
  //print_popular();
  var card = create_json_card(find_popular());
  const card2 = JSON.stringify(card);
  res.render('popMemes', card2); // pug file need landing zone https://stackoverflow.com/questions/8293363/passing-an-array-to-a-json-object-for-jade-rendering
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

app.get('/search' , function(req, res){
  
  
  
}
  

function find_popular(){ // returns array of image_ids of top ten in like count
  var img_ids = [];
  var query = 'SELECT id FROM user_memes ORDER BY dankScore DESC LIMIT 10' // SLOW AND BAD
  var i;

  db.any(query)
    .then(function(rows){
      for(i=0;i<10;i++){
        img_ids[i] = rows[i];
      }
      return img_ids;
    })
    .catch(function(err){
      console.log('error in find_trending', err);
    })
}

function get_title(id){
  var query = 'SELECT title FROM user_memes WHERE id = ' + id + ';';

  db.any(query)
    .then(function(rows){
      var title = rows[0];
      return title;
    })
    .catch(function(err){
      console.log('error in get_title', err);
    })
}


function get_src(id){
  var query = 'SELECT src FROM user_memes WHERE id = ' + id + ';';

  db.any(query)
    .then(function(rows){
      var src = rows[0];
      return src;
    })
    .catch(function(err){
      console.log('error in get_src', err);
    })
}

function create_json_card(var img_ids){ // returns array of json card objects 
  var cardarray = [];
  var i;
  
  if (img_ids.length == 0){
    console.log('no images found!');
    return;
  }
  
  for (i = 0; i<img_ids.length; i++){
    var id = img_id[i];
    var card = {
      'title' : get_title(id),
      'src' : get_src(id),
    }
   cardarray.push(card);
  }

  return cardarray;
}

app.listen(PORT);
