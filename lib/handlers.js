const { readFileSync, existsSync, statSync } = require('fs');
const { Todo } = require('./../lib/todo.js');
const { TodoList } = require('./../lib/todoList');
const mimeTypes = require('./mimeTypes');

const todoList = new TodoList('myList');

const createFilePath = function(req) {
  let url = req.url;
  if (url === '/') url = '/index.html';
  return `${__dirname}/../templates${url}`;
};

const fileExists = function(filename) {
  const stat = existsSync(filename) && statSync(filename);
  return stat && stat.isFile();
};

const addTodo = function(req, res) {
  const todo = new Todo(req.body.id, req.body.title, new Date());
  todoList.addTodo(todo);
  res.writeHead(200);
  res.end('OK');
};

const toggleTodo = function(req, res) {
  const todo = todoList.findTodo(req.body.id);
  todo.toggle();
  res.writeHead(200);
  res.end('TOGGLED');
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
  serveStaticPage,
  addTodo,
  toggleTodo
};
