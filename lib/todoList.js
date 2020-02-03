class TodoList {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
  toHTML() {
    return this.todos.map(todo => todo.toHTML()).join('\n');
  }
  toJSON() {
    const list = this.todos.map(todo => todo.toJSON()).join(',');
    return `[${list}]`;
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
