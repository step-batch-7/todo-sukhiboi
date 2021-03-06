const fs = require('fs');
const { TodoList } = require('./todoList');
const { Todo } = require('./todo');

class TodoStore {
  constructor(path) {
    this.path = path;
    this.lists = [];
  }
  save() {
    fs.writeFile(this.path, this.toJSON(), () => {});
  }
  toJSON() {
    const listsAsJSON = this.lists.map(list => list.toJSON());
    return JSON.stringify(listsAsJSON);
  }
  createList(listname) {
    this.lists.push(new TodoList(listname));
    this.save();
    return 'CREATED';
  }
  findList(todoListId) {
    return this.lists.find(list => list.name == todoListId);
  }
  deleteList(listname) {
    const foundedList = this.findList(listname);
    const index = this.lists.indexOf(foundedList);
    if (index > -1) this.lists.splice(index, 1);
    this.save();
    return 'DELETED';
  }
  updateTodoListname(todoListId, newName) {
    const list = this.findList(todoListId);
    list.updateName(newName);
    this.save();
    return 'UPDATED';
  }
  addTodo(todoListId, id, title) {
    const todo = new Todo(id, title);
    const list = this.findList(todoListId);
    list.addTodo(todo);
    this.save();
    return JSON.stringify(todo.toJSON());
  }
  toggleTodo(todoListId, id) {
    const list = this.findList(todoListId);
    const todo = list.findTodo(id);
    todo.toggle();
    this.save();
    return 'TOGGLED';
  }
  deleteTodo(todoListId, id) {
    const list = this.findList(todoListId);
    list.deleteTodo(id);
    this.save();
    return 'DELETED';
  }
  updateTodoTitle(todoListId, id, newTitle) {
    const list = this.findList(todoListId);
    const todo = list.findTodo(id);
    todo.updateTitle(newTitle);
    this.save();
    return 'UPDATED';
  }
  restore() {
    const rawTodoData = fs.readFileSync(this.path, 'utf8');
    const todoData = JSON.parse(rawTodoData);
    todoData.forEach(list => {
      this.createList(list.name);
      list.todos.forEach(todo => {
        this.addTodo(list.name, todo.id, todo.title);
      });
    });
    console.log(`App restored`);
  }
}

module.exports = {
  TodoStore
};
