// Import the http module to create the server
const http = require('http');
const url = require('url');

// Create the server
const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Route for "/hello"
  if (pathname === '/hello') {
    const name = query.name || 'World'; // Get the "name" query parameter, default to "World"
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello, ${name}!\n`);
  
  // Route for "/add"
  } else if (pathname === '/add') {
    const num1 = parseFloat(query.num1);
    const num2 = parseFloat(query.num2);

    if (!isNaN(num1) && !isNaN(num2)) {
      const sum = num1 + num2;
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`The sum of ${num1} and ${num2} is ${sum}\n`);
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Please provide valid numbers for num1 and num2\n');
    }

  // 404 - Not Found for other routes
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found\n');
  }
});

// Define the port and start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
