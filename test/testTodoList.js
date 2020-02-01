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
        `<div>firstTodo\n${date.toJSON()}false\n${todoId}</div>`
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
        `<div>firstTodo\n${date.toJSON()}false\n${todoId}</div>`
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
  });
});
