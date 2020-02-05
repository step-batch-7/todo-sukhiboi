const { readFileSync, existsSync, statSync } = require('fs');
const { Todo } = require('./../lib/todo.js');
const { TodoList } = require('./../lib/todoList');
const { TodoApp } = require('./../lib/todoApp');
const mimeTypes = require('./mimeTypes');

const todoApp = new TodoApp();

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
  const { todoListId, id, title } = req.body;
  const todo = new Todo(id, title, new Date());
  const list = todoApp.findList(todoListId);
  list.addTodo(todo);
  res.writeHead(200);
  res.end('OK');
};

const toggleTodo = function(req, res) {
  const { todoListId, id } = req.body;
  const list = todoApp.findList(todoListId);
  const todo = list.findTodo(id);
  todo.toggle();
  res.writeHead(200);
  res.end('TOGGLED');
};

const deleteTodo = function(req, res) {
  const { todoListId, id } = req.body;
  const list = todoApp.findList(todoListId);
  list.deleteTodo(id);
  res.end('DELETED');
};

const createList = function(req, res) {
  todoApp.createList(new TodoList(req.body.listName));
  res.end('CREATED');
};

const deleteList = function(req, res) {
  todoApp.deleteList(req.body.listName);
  res.end('DELETED');
};

const sendTodos = function(req, res) {
  res.end(todoApp.toJSON());
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
  toggleTodo,
  deleteTodo,
  sendTodos,
  createList,
  deleteList
};
