const { readFileSync, existsSync, statSync } = require('fs');
const mimeTypes = require('./mimeTypes');

const createFilePath = function(req) {
  let url = req.url;
  if (url === '/') url = '/index.html';
  return `${__dirname}/../templates${url}`;
};

const fileExists = function(filename) {
  const stat = existsSync(filename) && statSync(filename);
  return stat && stat.isFile();
};

const err404 = (req, res) => {
  res.writeHead(404, 'Not Found');
  res.end();
};

const serveStaticPage = function(req, res, next) {
  const filename = createFilePath(req);
  if (!fileExists(filename)) {
    next();
    return;
  }
  const content = readFileSync(filename);
  const type = filename.match(/.+\.(.*)/)[1];
  res.setHeader('Content-Type', mimeTypes[type]);
  res.end(content);
};

module.exports = {
  err404,
  serveStaticPage
};
