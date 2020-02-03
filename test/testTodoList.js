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

  describe('#toHTML()', () => {
    it('should return all todo in HTML format', () => {
      const todo = new Todo(ID, 'firstTodo', date);
      const todoId = todo.id;
      todoList.addTodo(todo);
      assert.deepStrictEqual(
        todoList.toHTML(),
        `<div class='todo'><span class='content'>firstTodo</span></div>`
      );
    });
  });

  describe('#toJSON()', () => {
    it('should return all todo in JSON format', () => {
      const todo = new Todo(ID, 'firstTodo', date);
      const todoId = todo.id;
      todoList.addTodo(todo);
      assert.deepStrictEqual(
        todoList.toJSON(),
        `[{"title":"firstTodo","date":"${date.toJSON()}","isCompleted":false,"id":${todoId}}]`
      );
    });
  });

  describe('#addTodo()', () => {
    it('should add a todo in the list', () => {
      const todo = new Todo(ID, 'firstTodo', date);
      const todoId = todo.id;
      todoList.addTodo(todo);
      assert.deepStrictEqual(
        todoList.toHTML(),
        `<div class='todo'><span class='content'>firstTodo</span></div>`
      );
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

  describe('#deleteTodo()', () => {
    it('should delete todo in the list with the given id', () => {
      const todo = new Todo(ID, 'firstTodo', date);
      const todoId = todo.id;
      todoList.addTodo(todo);
      todoList.deleteTodo(todoId);
      assert.deepStrictEqual(todoList.toJSON(), '[]');
    });

    it('should delete todo in the list which have more than 1 todo', () => {
      todoList.addTodo(new Todo(89, 'firstTodo', date));
      todoList.addTodo(new Todo(12, 'firstTodo', date));
      todoList.addTodo(new Todo(34, 'firstTodo', date));
      todoList.deleteTodo(12);
      assert.deepStrictEqual(
        todoList.toJSON(),
        `[{"title":"firstTodo","date":"${date.toJSON()}","isCompleted":false,"id":89},{"title":"firstTodo","date":"${date.toJSON()}","isCompleted":false,"id":34}]`
      );
    });

    it('should not delete any other todo if the requested todo not found', () => {
      const todo = new Todo(34, 'firstTodo', date);
      todoList.addTodo(todo);
      todoList.deleteTodo(7);
      assert.deepStrictEqual(
        todoList.toJSON(),
        `[{"title":"firstTodo","date":"${date.toJSON()}","isCompleted":false,"id":34}]`
      );
    });
  });
});
