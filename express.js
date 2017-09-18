var http = require('http');
var server = http.createServer();

server.on('request', function(req, resp){
  console.log('got a request');
});

server.listen(1337, function(){
  console.log('listening on port 1337');
});
