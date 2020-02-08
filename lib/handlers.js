const { readFileSync, writeFile, existsSync, statSync } = require('fs');
const { Todo } = require('./../lib/todo.js');
const { TodoList } = require('./../lib/todoList');
const { TodoStore } = require('./todoStore');
const mimeTypes = require('./mimeTypes');

const todoStore = new TodoStore(`${__dirname}/../database.json`);

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
  res.statusCode = 200;
  res.end(todoStore.addTodo(todoListId, id, title));
};

const toggleTodo = function(req, res) {
  const { todoListId, id } = req.body;
  res.statusCode = 200;
  res.end(todoStore.toggleTodo(todoListId, id));
};

const deleteTodo = function(req, res) {
  const { todoListId, id } = req.body;
  res.statusCode = 200;
  res.end(todoStore.deleteTodo(todoListId, id));
};

const updateTodoTitle = function(req, res) {
  const { todoListId, id, newTitle } = req.body;
  res.statusCode = 200;
  res.end(todoStore.updateTodoTitle(todoListId, id, newTitle));
};

const createList = function(req, res) {
  const { listname } = req.body;
  res.statusCode = 200;
  res.end(todoStore.createList(listname));
};

const deleteList = function(req, res) {
  const { listname } = req.body;
  res.statusCode = 200;
  res.end(todoStore.deleteList(listname));
};

const updateTodoListname = function(req, res) {
  const { todoListId, newName } = req.body;
  res.statusCode = 200;
  res.end(todoStore.updateTodoListname(todoListId, newName));
};

const sendTodos = function(req, res) {
  res.end(todoStore.toJSON());
};

const err404 = (req, res) => {
  (res.statusCode = 404), 'Not Found';
  res.end();
};

const serveStaticPage = function(req, res, next) {
  const filename = createFilePath(req);
  if (!fileExists(filename)) {
    next();
    return;
  }
  const content = readFileSync(filename);
  const [, type] = filename.match(/.+\.(.*)/);
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
  deleteList,
  updateTodoTitle,
  updateTodoListname
};
