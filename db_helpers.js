var http = require('http');
var fs = require('fs');
var url = ('url');
var pg = require('pg-promise');
var express = require('express');

let app = express();

const dbConfig = {
  //idunno
};

var db = pg(dbConfig);

//takes in image id returns amount of likes
pop_likes(id){
  var query = 'SELECT dankScore FROM user_memes WHERE img_id =' + id +';';
  var btID = id + 'changeNumberBounded';

  db.any(query)
    .then(function(rows){
      var result = rows[0];
      document.getElementById(btID).innerHTML = result; // WRONG?
    })
    .catch(function(err){
      console.log('error runnning pop query', err);
    })
    return result;
}

inc_likes(id){ // uses incoming image id to increment likes in data base
  var current = pop_likes(id); // grabs current value out of database
  current++;

  var btID = id + 'changeNumberBounded';
  var query = 'UPDATE user_memes SET dankScore =' + current + ' WHERE img_id =' + id + ';'

  db.any(query)
    .then(function(rows){
      document.getElementById(btID).innerHTML = current;// do we need to update the HTML here aswell or its that already handled?
    })
    .catch(function(err){
      console.log("error inc likes", err);
    })
}

find_popular(){ // returns array of image_ids of top ten in like count
  var img_ids = [];
  var query = 'SELECT img_id FROM user_memes ORDER BY dankScore DESC LIMIT 10' // SLOW AND BAD
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

print_popular(){
  var img_ids = find_popular();
  var cards = [];
  var i;
  var k;
  for (i = 0; i<10; i++){ // load card array
    k = img_ids[i];
    card[i] = create_card(k, get_title(k), get_src(k);
  }

  //print card array to the page
  for (i = 0; i<10; i++){
    document.getElementById('popBody').innerHTML += card[i];
  }
}

get_title(id){
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


get_src(id){
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

create_card(id, title, src){ // generates defult cards for all img_ids
  var count = pop_likes(id);

  var card = '<div class="card bg-dark text-white" style="width:400px" id = '+ id '>\n';
  card += '<center>\n';
  card += '<h4 class="card-title">' + title + '</h4>\n';
  card += '</center>\n';
  card += '<img src=' + src + ' width="400" height="400" class = "center">\n';
  card += '<div class="card-body">\n';
  card += '<center>\n';
  card += '<button class="btn btn-primary" onclick="inc_likes(' + id + ')">D A N K</button>\n';
  card += '<span id = "' + id + 'changeNumberBounded">'+ count +'</span>\n';
  card += '</center>\n';
  card += '</div>\n';
  card += '</div>\n';
  card += '</center>';

  return card;
}

search(input){ // returns array of image ids from images with matching tabs

  var query = 'SELECT img_id FROM user_memes WHERE tags <@' + input + ';';
  var i;
  var img_ids = [];

  db.any(query)
    .then(function(rows){
      for(i = 0; i<rows.length; i++){
        img_ids[i] = rows[i];
      }
      return img_ids;
    })
    .catch(function(err){
      console.log('error in search query', err);
    })

}

pop_users(){ // returns array of to ten user_ids of users with the most liked post
  var users = [];
  var query = 'SELECT ';
}

sum_likes(p_ids){ // returns total count of likes over users posts
  var count = 0;
  var i;

  for (i = 0; i<p_ids.length; i++){
    var query = 'SELECT dankScore FROM user_memes WHERE id =' + p_id[0] + ';';

    db.any(query)
      .then(function(rows){
        count += rows[0];
      })
      .catch(function(err){
        console.log('error in sum_likes query', errr);
      })
  }

  return count;
}
