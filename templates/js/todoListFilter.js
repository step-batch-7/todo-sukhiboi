const hideAllTodoLists = function() {
  const todoLists = Array.from(document.querySelectorAll('.todoList'));
  todoLists.forEach(list => list.classList.add('hidden'));
};

const filterTodoList = function(searchString) {
  const searchRegex = new RegExp(`^${searchString}`);
  hideAllTodoLists();
  const todoLists = Array.from(document.querySelectorAll('.todoList'));
  const filteredLists = todoLists.filter(list => {
    const listname = list.querySelector('.title').innerText;
    return listname.match(searchRegex);
  });
  filteredLists.forEach(list => list.classList.remove('hidden'));
};
