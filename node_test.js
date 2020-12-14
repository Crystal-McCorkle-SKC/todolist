//first comments were for the node.js to run, the actual running code is for 
//express 
//imports the http module (aka this is including the http library)
// this is node library const http = require("http");

//now making a new app using express (taking out all of the node stuff)
//this loads in the express module 
const express = require("express");

//this creates a new express application 
const app = express();

//this string is defining an IP address for the hostname 
//const hostname = "127.0.0.1";

//declare the port we want to connect to 
const port = 3000;

//define the port to connect to 
//const port = 8000;

//create a server 
//const server = http.createServer(function(request, response) {
    //sets up the headers (metadata) for the http request, response is 200 (ok), content type === text 
    //aka set the response headers as 200 ok and the content type as text/plain 
    //response.writeHead(200, {"Content-Type": "text"} );

    //body-- say hello world and then \n === a new line 
    //aka send the respond body "Hello world!" response.end ===I'm done talking w/ this person, wrap up the connection and can say something 
    //response.end("Hello world\n");
//});

//opening up our server to listen on a specific ip address and port
//ip addresses are also known as hostnames 
app.listen(port, function(){
    console.log("The server is running at port " + port);
});

//opening up our server, listen on a specific IP address and p ort 
//ip addresses are also known as hostnames 
//server.listen(port, hostname, function() {
    //console.log("The server is running at " + hostname + ":" + port)
//});

//to test => run node node_test.js (aka node + whatever you call the file.js) in terminal 

//baby steps! FIRST API CALL!
// "/" means the root path (very first page we would connect to)
//path is http://127.0.0.1:3000/
app.get("/", function(request, response){
    //if you console.log--refresh the browser and it sends a request to server
    //and express then logs the request in terminal and responds to the client w/ hello world 
    //console.log(request);
    //response.send("Hello World!!!!!");
    Item.find(function (err, items) {
        if (err) return console.error(err);
        response.send(items)
    });
});

//path for this is http://127.0.0.1:3000/name 
app.get("/name", function(request, response){
    response.send("Crystal");
});



//can do the above w/ all http requests
//app.get("/list", function (request, response){
//});
//app.post
//app.put
//app.delete("/some/path",function (request, response) {
//});

//now use nodemon and then file name.js (nodemon node_test.js) nodemon runs the server for you 