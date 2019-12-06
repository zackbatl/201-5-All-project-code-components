var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

var pg = require('pg-promise')();

const dbConfig = {
    user: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
};

var db = pg(dbConfig);

console.log("HEY HEY HEY!")


// const Client = require('pg').Client  //same as const const {Client} = require('pg')
// const client = new Client({
//     user: 'postgres',
//     password: '',
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres'
// })

// client.connect()
// .then(() => console.log("Connected successfully"))
// .then(() => console.log("Posts"))
// .then(() => client.query("SELECT * FROM posts"))
// .then(results => console.table(results.rows))
// .then(() => client.query("INSERT INTO users (username, pwd, email) VALUES('bowlinglawd8','yee-haw', 'johnnybegood@aol.com');"))
// .then(() => console.log("Users"))
// .then(() => client.query("SELECT * FROM users"))
// .then(results => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => client.end())



// var query1 = "SELECT * FROM posts;";
// db.any(query1)
//     .then(function(rows){
//         for(i=0; i < rows.length; i++){
//             console.log(rows[i])
//         }
//     })
//     .catch(function(err){
//         console.log("Error: ", err);
//     })

// var query2 = "UPDATE posts SET"


// app.get('/login', function(res, req)
// {
// 	var em = req.body.email;
// 	var pw =  req.body.password;
    
// });

// app.post('/signup.html', function(res, req){
//     console.log("In the post request")
//     var user = req.body.uname;
//     var pword = req.body.passwrd;
//     // console.log(user)
//     // console.log(pword)
//     var insert_data = "INSERT INTO users(username, pwd, email) VALUES(" + user + ", " +  pword + ", 'fakeEmail@gmail.com');"
//     db.any(insert_data)
//     .then(function(res, req)
//     {
//         alert("Query Success!")
//         //return res.end();
//     })
//     .catch(function(err){
//         console.log("Error: ", err);
//     })


//     // var insert_statement = "INSERT INTO favorite_colors(hex_value, name, color_msg) VALUES('" + color_hex + "','" + 
// 	// 						color_name + "','" + color_message +"');";

// 	// var color_select = 'select * from favorite_colors;';
// 	// db.task('get-everything', task => {
//     //     return task.batch([
//     //         task.any(insert_statement),
//     //         task.any(color_select)
//     //     ]);
//     // })
//     // .then(info => {
//     // 	res.render('pages/home',{
// 	// 			my_title: "Home Page",
// 	// 			data: info[1],
// 	// 			color: color_hex,
// 	// 			color_msg: color_message
// 	// 		})
//     // })
//     // .catch(error => {
//     //     // display error message in case an error
//     //         request.flash('error', err);
//     //         response.render('pages/home', {
//     //             title: 'Home Page',
//     //             data: '',
//     //             color: '',
//     //             color_msg: ''
//     //         })
//     // });
// })


app.get('/search', function(res, req){
    var query = "SELECT * FROM users;"
    db.any(query)
    .then(function(rows){
        for(i=)
    })
})


