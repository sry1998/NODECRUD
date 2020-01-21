const http = require('http');
const userOperations = require('./userOperation');
const hostname = '127.0.0.1';
const port = 3000;
let body = '';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/JSON');
  if (req.url == '/add' && req.method == 'POST') {
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
	 	  res.end(userOperations.addUser(body));
    });    
  }
  else if (req.url === '/delete' && req.method == 'POST') {
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      res.end(userOperations.deleteUser(body));
    });  
  }
  else if (req.url == '/get' && req.method == 'POST') {
    req.on('data', function (data) {
      body += data;
      console.log(body + "body..")
    });
    req.on('end', function () {
      res.end(userOperations.getUser(body));
    });  
  }
  else if (req.url == '/update' && req.method == 'POST') {
    req.on('data', function (data) {
      body += data;
      console.log(body + "body..")
    });
    req.on('end', function () {
      res.end(userOperations.updateUser(body));
    });  
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});