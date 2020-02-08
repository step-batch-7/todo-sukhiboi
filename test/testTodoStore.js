const sinon = require('sinon');
const assert = require('assert');
const fs = require('fs');
const { TodoList } = require('./../lib/todoList');
const { Todo } = require('./../lib/todo');
const { TodoStore } = require('../lib/todoStore');

describe('TodoStore()', () => {
  let todoStore;

  beforeEach(function() {
    todoStore = new TodoStore(`${__dirname}/fakeDatabase.json`);
  });

  describe('createList()', () => {
    it('should create a new TodoList in the App', () => {
      todoStore.createList('myList');
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"myList","todos":[]}]'
      );
    });
  });

  describe('findList()', () => {
    it('should find a list with its name when it have some todos', () => {
      todoStore.createList('myList');
      todoStore.addTodo('myList', 23, 'something');
      const foundedTodoList = todoStore.findList('myList');
      assert.deepStrictEqual(foundedTodoList.toJSON(), {
        name: 'myList',
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
    it('should return the JSON representaion of the lists', () => {
      todoStore.createList('newList');
      todoStore.addTodo('newList', 233, 'something big');
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"newList","todos":[{"title":"something big","isCompleted":false,"id":233}]}]'
      );
    });
  });

  describe('deleteList()', () => {
    it('should delete the list', () => {
      todoStore.createList('myNewList2');
      todoStore.createList('mynewList');
      todoStore.deleteList('myNewList2');
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"mynewList","todos":[]}]'
      );
    });
  });

  describe('addTodo()', () => {
    it('should add the given todo to the right list', () => {
      todoStore.createList('myNewList2');
      todoStore.addTodo('myNewList2', '90', 'some title');
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"myNewList2","todos":[{"title":"some title","isCompleted":false,"id":"90"}]}]'
      );
    });
  });

  describe('toggleTodo()', () => {
    it('should toggle the given todo to the right list', () => {
      todoStore.createList('myNewList2');
      todoStore.addTodo('myNewList2', '90', 'some title');
      todoStore.toggleTodo('myNewList2', '90');
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"myNewList2","todos":[{"title":"some title","isCompleted":true,"id":"90"}]}]'
      );
    });
  });

  describe('deleteTodo()', () => {
    it('should delete the given todo to the right list', () => {
      todoStore.createList('myNewList2');
      todoStore.addTodo('myNewList2', '90', 'some title');
      todoStore.deleteTodo('myNewList2', '90');
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"myNewList2","todos":[]}]'
      );
    });
  });

  describe('updateTodoTitle()', () => {
    it('should update the title of given todo to the right list', () => {
      todoStore.createList('myNewList2');
      todoStore.addTodo('myNewList2', '90', 'some title');
      todoStore.updateTodoTitle('myNewList2', '90', 'great');
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"myNewList2","todos":[{"title":"great","isCompleted":false,"id":"90"}]}]'
      );
    });
  });

  describe('updateTodoListname()', () => {
    it('should update the name of given list', () => {
      todoStore.createList('myNewList2');
      todoStore.updateTodoListname('myNewList2', 'something');
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"something","todos":[]}]'
      );
    });
  });

  describe('load()', () => {
    const store = new TodoStore(`fakefile`);
    it('should parse the previous todo data', () => {
      const samplePreviousData =
        '[{"name":"sdfdf","todos":[{"title":"sdfdf","isCompleted":false,"id":"0"}]}]';
      const fakeRead = sinon.fake.returns(samplePreviousData);
      sinon.replace(fs, 'readFileSync', fakeRead);
      store.restore();
      fakeRead.calledOnceWith(`fakefile`)
      store.lists.forEach(list => {
        assert.ok(list instanceof TodoList);
        list.todos.forEach(todo => {
          assert.ok(todo instanceof Todo);
        });
      });
    });
  });
});
