const { TodoList } = require('./todoList');
const { Todo } = require('./todo');

class TodoStore {
  constructor() {
    this.lists = [];
  }
  toJSON() {
    const listsAsJSON = this.lists.map(list => list.toJSON());
    return JSON.stringify(listsAsJSON);
  }
  createList(listData) {
    const { listname } = listData;
    this.lists.push(new TodoList(listname));
    return 'CREATED';
  }
  findList(todoListId) {
    return this.lists.find(list => list.name == todoListId);
  }
  deleteList(listData) {
    const { listname } = listData;
    const foundedList = this.findList(listname);
    const index = this.lists.indexOf(foundedList);
    if (index > -1) this.lists.splice(index, 1);
    return 'DELETED';
  }
  updateTodoListname(listData) {
    const { todoListId, newName } = listData;
    const list = this.findList(todoListId);
    list.updateName(newName);
    return 'UPDATED';
  }
  addTodo(todoData) {
    const { todoListId, id, title } = todoData;
    const todo = new Todo(id, title);
    const list = this.findList(todoListId);
    list.addTodo(todo);
    return JSON.stringify(todo.toJSON());
  }
  toggleTodo(todoData) {
    const { todoListId, id } = todoData;
    const list = this.findList(todoListId);
    const todo = list.findTodo(id);
    todo.toggle();
    return 'TOGGLED';
  }
  deleteTodo(todoData) {
    const { todoListId, id } = todoData;
    const list = this.findList(todoListId);
    list.deleteTodo(id);
    return 'DELETED';
  }
  updateTodoTitle(todoData) {
    const { todoListId, id, newTitle } = todoData;
    const list = this.findList(todoListId);
    const todo = list.findTodo(id);
    todo.updateTitle(newTitle);
    return 'UPDATED';
  }
  static restore(oldAppData) {
    const app = new TodoStore();
    oldAppData.forEach(list => {
      const todoList = new TodoList(list.name);
      list.todos.forEach(todo => {
        todoList.addTodo(new Todo(todo.id, todo.title, todo.isCompleted));
      });
      app.createList(todoList);
    });
    return app;
  }
}

module.exports = {
  TodoStore
};
