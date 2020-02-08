const hideAllTodoListsAndTodos = function() {
  const todoLists = Array.from(document.querySelectorAll('.todoList'));
  todoLists.forEach(list => {
    list.classList.add('hidden');
    const todos = Array.from(list.querySelectorAll('.todo'));
    todos.forEach(todo => todo.classList.add('hidden'));
  });
};

const showAllTodoListsAndTodos = function() {
  const todoLists = Array.from(document.querySelectorAll('.todoList'));
  todoLists.forEach(list => {
    list.classList.remove('hidden');
    const todos = Array.from(list.querySelectorAll('.todo'));
    todos.forEach(todo => todo.classList.remove('hidden'));
  });
};

const filterTodos = function(searchString) {
  const searchRegex = new RegExp(`^${searchString}`);
  hideAllTodoListsAndTodos();
  const todoLists = Array.from(document.querySelectorAll('.todoList'));
  todoLists.forEach(list => {
    const todos = Array.from(list.querySelectorAll(`.todo`));
    const filteredTodos = todos.filter(todo => {
      const content = todo.querySelector('.content').value;
      return content.match(searchRegex);
    });
    if (filteredTodos.length) {
      list.classList.remove('hidden');
      filteredTodos.forEach(todo => todo.classList.remove('hidden'));
    }
  });
  if (searchString == '') showAllTodoListsAndTodos();
};
