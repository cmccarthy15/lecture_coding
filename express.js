// WITHOUT EXPRESS

const http = require('http');
const server = http.createServer();


server.on('request', function(req, resp){
  console.log('got a request', req.url);

  if (req.url === '/example' && req.method === "GET"){
    resp.writeHead(200, {"Content-Type": "text/plain"});
    resp.end("here's a response for /example");
  } else if (req.rul === '/' && req.method === "POST") {
    resp.writeHead(200, {"Content-Type": "text/html"});
    resp.end("<h1>Here's a response</h1>");
  }
});



server.listen(1337, function(){
  console.log('listening on port 1337...');
});




// WITH EXPRESS
