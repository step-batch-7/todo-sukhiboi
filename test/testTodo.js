const assert = require('assert');
const { Todo } = require('./../lib/todo.js');

describe('Todo()', () => {
  let date;

  beforeEach(function() {
    date = new Date();
  });

  describe('#toHTML()', () => {
    it('should return todo in HTML format', () => {
      const todo = new Todo('firstTodo', date);
      const todoId = todo.id;
      assert.deepStrictEqual(
        todo.toHTML(),
        `<div>firstTodo\n${date.toJSON()}false\n${todoId}</div>`
      );
    });
  });

  describe('#toJSON()', () => {
    it('should return todo in JSON format', () => {
      const todo = new Todo('firstTodo', date);
      const todoId = todo.id;
      assert.deepStrictEqual(
        todo.toJSON(),
        `{"title":"firstTodo","date":"${date.toJSON()}","isCompleted":false,"id":${todoId}}`
      );
    });
  });

  describe('#toogle()', () => {
    it('should toggle the state of todo', () => {
      const todo = new Todo('firstTodo', date);
      todo.toggle();
      assert.ok(todo.isCompleted);
    });
  });
});
