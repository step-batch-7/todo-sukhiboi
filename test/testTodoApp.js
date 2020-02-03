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

  describe('toHTML()', () => {
    it('should return the HTML representaion of the lists', () => {
      const list = new TodoList('myNewList2');
      list.addTodo(new Todo(23, 'something', date));
      const list2 = new TodoList('mynewList');
      list2.addTodo(new Todo(233, 'something big', date));
      todoApp.createList(list2);
      todoApp.createList(list);
      assert.deepStrictEqual(
        todoApp.toHTML(),
        `<div class='todo flex ' id="233"><div class="checkBox"><div class="box" onclick="toggleTodo()"></div><div class="check center hidden" onclick="toggleTodo()"></div></div><span class='content'>something big</span><div class="bin" onclick="deleteTodo()"><img src="./images/bin.png" /></div></div> <div class='todo flex ' id="23"><div class="checkBox"><div class="box" onclick="toggleTodo()"></div><div class="check center hidden" onclick="toggleTodo()"></div></div><span class='content'>something</span><div class="bin" onclick="deleteTodo()"><img src="./images/bin.png" /></div></div>`
      );
    });
  });
});
