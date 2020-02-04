class TodoList {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
  toJSON() {
    const todos = this.todos.map(todo => todo.toJSON());
    const info = { name: this.name, todos };
    return info;
  }
  addTodo(todo) {
    this.todos.push(todo);
  }
  findTodo(todoId) {
    const result = this.todos.filter(todo => todo.id == todoId);
    return result[0];
  }
  deleteTodo(todoId) {
    let todoIndex;
    let todoDeleteCount = 0;
    this.todos.forEach((todo, index) => {
      if (todo.id == todoId) {
        todoIndex = index;
        todoDeleteCount = 1;
      }
    });
    this.todos.splice(todoIndex, todoDeleteCount);
  }
}

module.exports = {
  TodoList
};
