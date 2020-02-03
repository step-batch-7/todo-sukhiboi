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
      const list2 = new TodoList('mynewList');
      list2.addTodo(new Todo(233, 'something big', date));
      todoApp.createList(list2);
      assert.deepStrictEqual(
        todoApp.toHTML(),
        `<div class="todoList"> <div class="header flex"> <div> <span class="title">mynewList</span> <span class="month" >Febraray, <span class="bold">Sunday</span>, 02</span > </div><div> <span class="todo-count">1 Tasks</span> </div></div><div class="todos" id="todos"><div class='todo flex ' id="233"><div class="checkBox"><div class="box" onclick="toggleTodo()"></div><div class="check center hidden" onclick="toggleTodo()"></div></div><span class='content'>something big</span><div class="bin" onclick="deleteTodo()"><img src="./images/bin.png" /></div></div></div><div class="addTodo" onclick="showAddNewTodoBox()"> <div class="sign center">+</div></div><div class="filter hidden" id="addNewTodoBox"> <div class="center newTodo"> <div class="closeBtn" id="closebtn" onclick="hideAddNewTodoBox()"> <span>X</span> </div><input class="textbox" id="newTodoInput" placeholder="Title..." autofocus required/> <div class="addTodoBtn" id="addNewTodoBtn" onclick="addTodo()"> Add </div></div></div></div>`
      );
    });
  });

  describe('deleteList()', () => {
    it('should return the HTML representaion of the lists', () => {
      const list = new TodoList('myNewList2');
      list.addTodo(new Todo(23, 'something', date));
      const list2 = new TodoList('mynewList');
      list2.addTodo(new Todo(233, 'something big', date));
      todoApp.createList(list2);
      todoApp.createList(list);
      todoApp.deleteList('myNewList2');
      assert.deepStrictEqual(
        todoApp.toJSON(),
        `[[{"title":"something big","date":"${date.toJSON()}","isCompleted":false,"id":233}]]`
      );
    });
  });
});
