const assert = require('assert');
const { Todo } = require('./../lib/todo.js');
const { TodoList } = require('./../lib/todoList');
const { TodoApp } = require('./../lib/todoApp');

describe('TodoApp()', () => {
  let todoApp;

  beforeEach(function() {
    todoApp = new TodoApp();
  });

  describe('createList()', () => {
    it('should create a new TodoList in the App', () => {
      todoApp.createList(new TodoList('myList'));
      assert.deepStrictEqual(
        todoApp.toJSON(),
        '[{"name":"myList","todos":[]}]'
      );
    });
  });

  describe('findList()', () => {
    it('should find a list with its name when it have some todos', () => {
      todoApp.createList(new TodoList('myNewList'));
      const list = new TodoList('myNewList2');
      list.addTodo(new Todo(23, 'something'));
      todoApp.createList(list);
      const foundedTodoList = todoApp.findList('myNewList2');
      assert.deepStrictEqual(foundedTodoList.toJSON(), {
        name: 'myNewList2',
        todos: [
          {
            id: 23,
            isCompleted: false,
            title: 'something'
          }
        ]
      });
    });
  });

  describe('toJSON()', () => {
    it('should return the HTML representaion of the lists', () => {
      const list2 = new TodoList('mynewList');
      list2.addTodo(new Todo(233, 'something big'));
      todoApp.createList(list2);
      assert.deepStrictEqual(
        todoApp.toJSON(),
        '[{"name":"mynewList","todos":[{"title":"something big","isCompleted":false,"id":233}]}]'
      );
    });
  });

  describe('deleteList()', () => {
    it('should return the HTML representaion of the lists', () => {
      const list = new TodoList('myNewList2');
      list.addTodo(new Todo(23, 'something'));
      const list2 = new TodoList('mynewList');
      list2.addTodo(new Todo(233, 'something big'));
      todoApp.createList(list2);
      todoApp.createList(list);
      todoApp.deleteList('myNewList2');
      assert.deepStrictEqual(
        todoApp.toJSON(),
        '[{"name":"mynewList","todos":[{"title":"something big","isCompleted":false,"id":233}]}]'
      );
    });
  });
});
