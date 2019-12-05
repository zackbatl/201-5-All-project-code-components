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

//takes in image id retruns amount of likes
pop_likes(id){
  var query = 'SELECT dankScore FROM user_memes WHERE img_id =' + id +';';

  db.any(query)
    .then(function(rows){
      var result = rows[0];
      // UPDATE HTML OF PAGE
    })
    .catch(function(err){
      console.log('error runnning pop query', err);
    })
    return result;
}

inc_likes(id){
  var current = pop_likes(id);
  current++;
  var query = 'UPDATE user_memes SET dankScore =' + current + ' WHERE img_id =' + id + ';'
  db.any(query)
    .then(function(rows){
      // UPDATE HTML OF THE PAGE
    })
    .catch(function(err){
      console.log("error inc likes", err);
    })
}

find_trending(){ // returns array of image_ids of top ten in like count
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

print_cards(img_ids) // generates defult cards for all img_ids

search(input){ // returns array of matching image ids

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

pop_users(){ // returns array of user_ids of users with the most liked post
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
