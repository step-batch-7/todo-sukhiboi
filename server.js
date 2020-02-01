const http = require('http');
const { app } = require('./lib/app');

const PORT = 8000;
const server = http.Server(app);
server.listen(PORT);

console.log(`Server online, using port ${PORT}\n`);
