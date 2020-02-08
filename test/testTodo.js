const assert = require('assert');
const { Todo } = require('./../lib/todo.js');

describe('Todo()', () => {
  let isCompleted;
  let ID;

  beforeEach(function() {
    isCompleted = false;
    ID = Todo.generateTodoId();
  });

  describe('toJSON()', () => {
    it('should return todo in HTML format', () => {
      const todo = new Todo(ID, 'firstTodo', isCompleted);
      assert.deepStrictEqual(todo.toJSON(), {
        id: ID,
        isCompleted: false,
        title: 'firstTodo'
      });
    });
  });

  describe('toggle()', () => {
    it('should toggle the state of todo', () => {
      const todo = new Todo(ID, 'firstTodo', isCompleted);
      todo.toggle();
      assert.ok(todo.isCompleted);
    });
  });

  describe('updateTitle()', () => {
    it('should update the title of todo', () => {
      const todo = new Todo(ID, 'firstTodo', isCompleted);
      todo.updateTitle('new One title');
      assert.strictEqual(todo.title, 'new One title');
    });
  });
});
