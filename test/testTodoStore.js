const assert = require('assert');
const { Todo } = require('../lib/todo.js');
const { TodoList } = require('../lib/todoList');
const { TodoStore } = require('../lib/todoStore');

describe('TodoStore()', () => {
  let todoStore;

  beforeEach(function() {
    todoStore = new TodoStore();
  });

  describe('createList()', () => {
    it('should create a new TodoList in the App', () => {
      todoStore.createList(new TodoList('myList'));
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"myList","todos":[]}]'
      );
    });
  });

  describe('findList()', () => {
    it('should find a list with its name when it have some todos', () => {
      todoStore.createList(new TodoList('myNewList'));
      const list = new TodoList('myNewList2');
      list.addTodo(new Todo(23, 'something'));
      todoStore.createList(list);
      const foundedTodoList = todoStore.findList('myNewList2');
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
      todoStore.createList(list2);
      assert.deepStrictEqual(
        todoStore.toJSON(),
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
      todoStore.createList(list2);
      todoStore.createList(list);
      todoStore.deleteList('myNewList2');
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"mynewList","todos":[{"title":"something big","isCompleted":false,"id":233}]}]'
      );
    });
  });

  describe('addTodo()', () => {
    it('should add the given todo to the right list', () => {
      const list = new TodoList('myNewList2');
      todoStore.createList(list);
      todoStore.addTodo({
        todoListId: 'myNewList2',
        id: '90',
        title: 'some title'
      });
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"myNewList2","todos":[{"title":"some title","isCompleted":false,"id":"90"}]}]'
      );
    });
  });
});
