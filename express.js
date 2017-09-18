// WITHOUT EXPRESS

// const http = require('http');
// const server = http.createServer();


// server.on('request', function(req, resp){
//   console.log('got a request', req.url);

//   if (req.url === '/example' && req.method === "GET"){
//     resp.writeHead(200, {"Content-Type": "text/plain"});
//     resp.end("here's a response for /example");
//   } else if (req.rul === '/' && req.method === "POST") {
//     resp.writeHead(200, {"Content-Type": "text/html"});
//     resp.end("<h1>Here's a response</h1>");
//   }
// });


// server.listen(1337, function(){
//   console.log('listening on port 1337...');
// });


// WITH EXPRESS
const express = require('express');
const app = express();

//knows to create server, add callback and have it listen on the correct port
// you could also pass app as the callback to .on above
app.listen(1337, function(){
  console.log('listening on port 1337...');
});

//what we do with express app is we chain methods
// that usually map to an http verb

// app.get('/example', function(req, res){
//   //res.send("<h1 style='background-color: cyan'>Hello</h1>");
//   //sending back string, treated as HTML
//   //send back HTML, it's rendered properly
//   //sending back json
//   //express can tell automatically that you want to send json and not html
//   res.send({
//     name: 'Caryn',
//     favoriteColor: 'turquoise'
//   });
// });

//if you give a URI that doesn't work, it'll automatically send back a 404 response (cannot GET /womp)

// app.post('/example', function(req, res){
//   response.send("You made a POST request");
// });

//when you make request in your browser, it's only a GET request

//sending a file as the response
// app.get('/example.html', function(req, res){
//   res.sendFile(__dirname + '/example.html');
// });

// a simple C/R app (creating and reading)
//post method for actual creation
var cats = [];
app.post('/cats', function(req, res){
  cats.push('lalala');
  res.send(cats + '\n');
});

//to watch post run, run nodemon in one window of terminal
// and in another do curl URL -X POST

//colon tells it to add num as a property on params
//express takes care of parsing
app.get('/times2/:num1/:num2', function(req, res){
  //res.send((req.params.num * 2).toString());
  //need to toString it or send as json b/c
  // express this res as number is a status code
  res.json(req.params.num1 * req.params.num2);
});


//query string /cats?emotion=happy
// then it's on the req.query object {emotion:happy}
// and you can use that to conditionally send back response

//:thing --> params
//?thing --> query

//sending back body
//only add a body as part of our request if we're making a post request
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//requires separate dependency of body parser - middleware
//always just make sure to add body-parser as middleware
app.post('/times2', function(req, res){
  res.json(req.body.num * 2);
});


//our own middleware
//next is secretly always there and would be used by middleware
app.get('/something', function(req, res, next){
  console.log('firstly!');
  next();
  //since there are two gets looking for the same thing
  // we need to call next in order for it to look at
  // the next get request handler for that specific route
});

app.get('/something', function(req, res, next){
  res.send('finally!');
});

// with middleware, request object for the next handler will
// be the same because it passes the same object through


//app.use can take an optional URI or just a callback function
app.use(function(req, res, next){
  console.log('i always run');
  next();
}); // without a specified URI, it'll match on everything

//contrast with app.all which doesn't do partial URL matching
// if you don't specify a URI with all, it'll only match
// all requests of all method types, but just to
app.all('/', function(req, res, next){
  console.log('I run for all requests to /');
  next();
});
//FOLLOW UP ON .ALL IS COMING
// MAY HAVE UPDATED IN THE LAST BUILD
// people don't tend to use .all here anyway
// usually use .use b/c of partial URL matching

//ERROR HANDLING
//if next receives an argument, it assumes it's an error and
// it will log it out for you
// err = new Error('message');
// err.status = 500;
// next(err)
// CAN ALSO write our own error handling middleware

app.use(function(err, req, res, next){
  //if next gets passed an err it'll look for the next call that has four paramters instead of 3
  // then you can customize the output
  console.log('something went wrong', err);
  res.send('something went wrong' + err.message);
});



// as you write larger and larger apps...
// might find you want subapps with their req handlers
// can do that w/ express w/ a router
// essentially a mini app you can connect back into your main app

//bird router!!
var router = express.Router();
router.get('/crow', function(req, res, next){
  res.send('caw');
});
router.get('/chicken', function(req, res, next){
  res.send('bawk');
});
router.get('/turkey', function(req, res, next){
  res.send('gobble');
});

//not connected yet! ^ ^ ^ ^
//without /birds, anything with matching above
//with /birds, needs /birds first
app.use("/birds", router);

