const assert = require('assert');
const { Todo } = require('./../lib/todo.js');
const { TodoList } = require('./../lib/todoList');
const { TodoApp } = require('./../lib/todoApp');

describe('TodoApp()', () => {
  let todoApp;
  let date;

  beforeEach(function() {
    todoApp = new TodoApp();
    date = new Date();
  });

  describe('createList()', () => {
    it('should create a new TodoList in the App', () => {
      todoApp.createList(new TodoList('myList'));
      assert.deepStrictEqual(todoApp.toJSON(), '[[]]');
    });
  });

  describe('toJSON()', () => {
    it('should return the JSON representaion of the lists', () => {
      todoApp.createList(new TodoList('myNewList'));
      const list = new TodoList('myNewList2');
      list.addTodo(new Todo(23, 'something', date));
      todoApp.createList(list);
      const foundedTodoList = todoApp.findList('myNewList2');
      assert.deepStrictEqual(
        foundedTodoList.toJSON(),
        `[{"title":"something","date":"${date.toJSON()}","isCompleted":false,"id":23}]`
      );
    });
  });

  describe('findList()', () => {
    it('should find a list with its name when it have some todos', () => {
      todoApp.createList(new TodoList('myNewList'));
      const list = new TodoList('myNewList2');
      list.addTodo(new Todo(23, 'something', date));
      todoApp.createList(list);
      const foundedTodoList = todoApp.findList('myNewList2');
      assert.deepStrictEqual(
        foundedTodoList.toJSON(),
        `[{"title":"something","date":"${date.toJSON()}","isCompleted":false,"id":23}]`
      );
    });
  });
});
