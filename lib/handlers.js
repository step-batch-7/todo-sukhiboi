const { readFileSync, writeFile, existsSync, statSync } = require('fs');
const { Todo } = require('./../lib/todo.js');
const { TodoList } = require('./../lib/todoList');
const { TodoStore } = require('./todoStore');
const mimeTypes = require('./mimeTypes');

const todoStore = TodoStore.restore(require('./../database.json'));

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
  res.writeHead(200);
  res.end(todoStore.addTodo(req.body));
  writeFile('./database.json', todoStore.toJSON(), () => {});
};

const toggleTodo = function(req, res) {
  res.writeHead(200);
  res.end(todoStore.toggleTodo(req.body));
  writeFile('./database.json', todoStore.toJSON(), () => {});
};

const deleteTodo = function(req, res) {
  res.writeHead(200);
  res.end(todoStore.deleteTodo(req.body));
  writeFile('./database.json', todoStore.toJSON(), () => {});
};

const updateTodoTitle = function(req, res) {
  res.writeHead(200);
  res.end(todoStore.updateTodoTitle(req.body));
  writeFile('./database.json', todoStore.toJSON(), () => {});
};

const createList = function(req, res) {
  todoStore.createList(new TodoList(req.body.listName));
  res.end('CREATED');
  writeFile('./database.json', todoStore.toJSON(), () => {});
};

const deleteList = function(req, res) {
  todoStore.deleteList(req.body.listName);
  res.end('DELETED');
  writeFile('./database.json', todoStore.toJSON(), () => {});
};

const updateTodoListname = function(req, res) {
  const { todoListId, newName } = req.body;
  const list = todoStore.findList(todoListId);
  list.updateName(newName);
  res.end('UPDATED');
  writeFile('./database.json', todoStore.toJSON(), () => {});
};

const sendTodos = function(req, res) {
  res.end(todoStore.toJSON());
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
