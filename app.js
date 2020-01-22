const http = require('http');
const userOperations = require('./userOperation');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  let body;
  res.setHeader('Content-Type', 'text/JSON');
  switch (req.url, req.method) {
    case ('/add', 'POST'):
      body = '';
      req.on('data', function (data) {
        body = data;
      });
      req.on('end', function () {
        res.end(userOperations.addUser(body));
      });
      break;
    case ('/delete', 'DELETE'):
      body = '';
      req.on('data', function (data) {
        body = data;
      });
      req.on('end', function () {
        res.end(userOperations.deleteUser(body));
      });
      break;
    case ('/get', 'PUT'):
      body = '';
      req.on('data', function (data) {
        body = data;
      });
      req.on('end', function () {
        res.end(userOperations.getUser(body));
      });
      break;
    case ('/update', 'GET'):
      body = '';
      req.on('data', function (data) {
        body = data;
      });
      req.on('end', function () {
        res.end(userOperations.updateUser(body));
      });
      break;
    default:
      return 'Invalid Input..!';
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});