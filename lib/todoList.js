class TodoList {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
  toHTML() {
    const todos = this.todos.map(todo => todo.toHTML()).join('\n');
    return `<div class="todoList"> <div class="header flex"> <div> <span class="title">${this.name}</span> <span class="month" >Febraray, <span class="bold">Sunday</span>, 02</span > </div><div> <span class="todo-count">${this.todos.length} Tasks</span> </div></div><div class="todos" id="todos">${todos}</div><div class="addTodo" onclick="showAddNewTodoBox()"> <div class="sign center">+</div></div><div class="filter hidden" id="addNewTodoBox"> <div class="center newTodo"> <div class="closeBtn" id="closebtn" onclick="hideAddNewTodoBox()"> <span>X</span> </div><input class="textbox" id="newTodoInput" placeholder="Title..." autofocus required/> <div class="addTodoBtn" id="addNewTodoBtn" onclick="addTodo()"> Add </div></div></div></div>`;
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
