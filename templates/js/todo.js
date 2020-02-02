const addNewTodoBox = document.getElementById('addNewTodoBox');
const newTodoInput = document.getElementById('newTodoInput');
const addNewTodoBtn = document.getElementById('addNewTodoBtn');
const closebtn = document.getElementById('closebtn');

const showAddNewTodoBox = function() {
  addNewTodoBox.classList.remove('hidden');
};

const hideAddNewTodoBox = function() {
  addNewTodoBox.classList.add('hidden');
};

const addTodo = function() {
  const todoContent = newTodoInput.value;
  console.log(todoContent);
  hideAddNewTodoBox();
};
