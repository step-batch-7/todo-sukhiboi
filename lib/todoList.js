class TodoList {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
  toJSON() {
    const todos = this.todos.map(todo => todo.toJSON());
    return { name: this.name, todos };
  }
  addTodo(todo) {
    this.todos.push(todo);
  }
  findTodo(todoId) {
    return this.todos.find(todo => todo.id == todoId);
  }
  deleteTodo(todoId) {
    const foundedTodo = this.findTodo(todoId);
    const index = this.todos.indexOf(foundedTodo);
    if (index > -1) this.todos.splice(index, 1);
  }
  updateName(newName) {
    this.name = newName;
  }
}

module.exports = {
  TodoList
};
