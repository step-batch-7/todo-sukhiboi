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
      todoStore.createList({ listname: 'myList' });
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"myList","todos":[]}]'
      );
    });
  });

  describe('findList()', () => {
    it('should find a list with its name when it have some todos', () => {
      todoStore.createList({ listname: 'myList' });
      todoStore.addTodo({ todoListId: 'myList', id: 23, title: 'something' });
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
      todoStore.createList({ listname: 'newList' });
      todoStore.addTodo({
        todoListId: 'newList',
        title: 'something big',
        id: 233
      });
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"newList","todos":[{"title":"something big","isCompleted":false,"id":233}]}]'
      );
    });
  });

  describe('deleteList()', () => {
    it('should delete the list', () => {
      todoStore.createList({
        listname: 'myNewList2'
      });
      todoStore.createList({
        listname: 'mynewList'
      });
      todoStore.deleteList({ listname: 'myNewList2' });
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"mynewList","todos":[]}]'
      );
    });
  });

  describe('addTodo()', () => {
    it('should add the given todo to the right list', () => {
      todoStore.createList({ listname: 'myNewList2' });
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

  describe('toggleTodo()', () => {
    it('should toggle the given todo to the right list', () => {
      todoStore.createList({ listname: 'myNewList2' });
      todoStore.addTodo({
        todoListId: 'myNewList2',
        id: '90',
        title: 'some title'
      });
      todoStore.toggleTodo({ todoListId: 'myNewList2', id: '90' });
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"myNewList2","todos":[{"title":"some title","isCompleted":true,"id":"90"}]}]'
      );
    });
  });

  describe('deleteTodo()', () => {
    it('should delete the given todo to the right list', () => {
      todoStore.createList({ listname: 'myNewList2' });
      todoStore.addTodo({
        todoListId: 'myNewList2',
        id: '90',
        title: 'some title'
      });
      todoStore.deleteTodo({ todoListId: 'myNewList2', id: '90' });
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"myNewList2","todos":[]}]'
      );
    });
  });

  describe('updateTodoTitle()', () => {
    it('should update the title of given todo to the right list', () => {
      todoStore.createList({ listname: 'myNewList2' });
      todoStore.addTodo({
        todoListId: 'myNewList2',
        id: '90',
        title: 'some title'
      });
      todoStore.updateTodoTitle({
        todoListId: 'myNewList2',
        id: '90',
        newTitle: 'great'
      });
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"myNewList2","todos":[{"title":"great","isCompleted":false,"id":"90"}]}]'
      );
    });
  });

  describe('updateTodoListname()', () => {
    it('should update the name of given list', () => {
      todoStore.createList({ listname: 'myNewList2' });
      todoStore.updateTodoListname({
        todoListId: 'myNewList2',
        newName: 'something'
      });
      assert.deepStrictEqual(
        todoStore.toJSON(),
        '[{"name":"something","todos":[]}]'
      );
    });
  });
});
