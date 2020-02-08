const assert = require('assert');
const { Todo } = require('./../lib/todo.js');
const { TodoList } = require('./../lib/todoList');

describe('TodoList()', () => {
  let todoList;
  let date;
  let ID;

  beforeEach(function() {
    todoList = new TodoList('mylist');
    date = new Date();
    ID = Todo.generateTodoId();
  });

  describe('#toJSON()', () => {
    it('should return all todo in HTML format', () => {
      const todo = new Todo(ID, 'firstTodo', date);
      todoList.addTodo(todo);
      assert.deepStrictEqual(todoList.toJSON(), {
        name: 'mylist',
        todos: [
          {
            id: ID,
            isCompleted: false,
            title: 'firstTodo'
          }
        ]
      });
    });
  });

  describe('#addTodo()', () => {
    it('should add a todo in the list', () => {
      const todo = new Todo(ID, 'firstTodo', date);
      todoList.addTodo(todo);
      assert.deepStrictEqual(todoList.toJSON(), {
        name: 'mylist',
        todos: [
          {
            id: ID,
            isCompleted: false,
            title: 'firstTodo'
          }
        ]
      });
    });
  });

  describe('#findTodo()', () => {
    it('should find todo in the list with the given id', () => {
      const todo = new Todo(ID, 'firstTodo', date);
      const todoId = todo.id;
      todoList.addTodo(todo);
      const foundedTodo = todoList.findTodo(todoId);
      assert.deepStrictEqual(todo.toJSON(), foundedTodo.toJSON());
    });
  });

  describe('#updateName()', () => {
    it('should update the name of the list', () => {
      const list = new TodoList('new List');
      list.updateName('second list');
      assert.deepStrictEqual(list.name, 'second list');
    });
  });

  describe('#deleteTodo()', () => {
    it('should delete todo in the list with the given id', () => {
      const todo = new Todo(ID, 'firstTodo', date);
      const todoId = todo.id;
      todoList.addTodo(todo);
      todoList.deleteTodo(todoId);
      assert.deepStrictEqual(todoList.toJSON(), {
        name: 'mylist',
        todos: []
      });
    });

    it('should delete todo in the list which have more than 1 todo', () => {
      todoList.addTodo(new Todo(89, 'firstTodo', date));
      todoList.addTodo(new Todo(12, 'firstTodo', date));
      todoList.addTodo(new Todo(34, 'firstTodo', date));
      todoList.deleteTodo(12);
      assert.deepStrictEqual(todoList.toJSON(), {
        name: 'mylist',
        todos: [
          {
            id: 89,
            isCompleted: false,
            title: 'firstTodo'
          },
          {
            id: 34,
            isCompleted: false,
            title: 'firstTodo'
          }
        ]
      });
    });

    it('should not delete any other todo if the requested todo not found', () => {
      const todo = new Todo(34, 'firstTodo', date);
      todoList.addTodo(todo);
      todoList.deleteTodo(7);
      assert.deepStrictEqual(todoList.toJSON(), {
        name: 'mylist',
        todos: [
          {
            id: 34,
            isCompleted: false,
            title: 'firstTodo'
          }
        ]
      });
    });
  });
});
