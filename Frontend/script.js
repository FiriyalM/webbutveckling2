var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');


let myObj = JSON.parse(myJSON);

fetch('http://localhost:8080/Witter/resources/User')
.then((Response) => {
    return Response.json();

})
.then((myJSON) =>{
    console.log(myJSON);
})


let form = document.querySelector("form");
form.addEventListener("submit", event => {
    console.log("Saving value", form.elements.value.value);
    event.preventDefault();
});

var connection = mysql.createConnection({
    host  : 'localhost',
    user  : 'root',
    password : '',
    database  : 'nodelogin'
});

var app = express();
app.use(session({
    secret  : 'secret',
    resave  : true,
    saveUninitialized : true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, Response){
    var username = request.body.username
    var password = request.body.password
    if (username && password) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			}else{
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	}else{
		response.send('Please enter Username and Password!');
		response.end();
	}
});

if (username && password) {
    connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        if (results.length > 0) {
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/home');
        } else {
            response.send('Incorrect Username and/or Password!');
        }			
        response.end();
    });
} else {
    response.send('Please enter Username and Password!');
    response.end();
}